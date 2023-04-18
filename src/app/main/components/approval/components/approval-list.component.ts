import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';
import * as $ from 'jquery';
@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css'],
})
export class ApprovalListComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public ApprovalTitle: any;
  public ApprovalList: any = [];
  public RejectId: any;
  public RecipientId: any;
  public AlertRecipientDetails: any = [];
  public AlertTypeRecipient: any;

  constructor(private http: HttpService,
    private toastr: ToastrService, private router: Router,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, public fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.SetTopTitleName(`Client Approval`);
    this.GetApprovalList(1);
  }

  dateformat(datas: string) {
    return this.authService.Dateformat(datas);
  }

  Timeformat(time: string) {
    return this.authService.Timeformat(time);
  }

  formApproval = new FormGroup({
    search: new FormControl(''),
  });

  onSearchApproval(formValue: any) {
    this.GetApprovalList(1);
    this.currentPage = 1;
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  GetApprovalList(page: number) {
    this.loading = true;

    const formData = new FormData();
    const formValue = this.formApproval.value;
    const search = formValue.search || '';
    formData.append('search', search);

    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`client_approval/?search=${search}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      if (res.status === true) {
        this.ApprovalList = res.data;
        this.totalItems = responseData.count;
        this.loading = false;
        this.authService.setCurrentUser({ token: res.token });
      } else {
        this.loading = false;
        this.toastr.warning(res.message);
      }
      this.PageTotalNumber = [];
      let Count = responseData.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  currentPage: number = 1;
  totalItems: number | undefined;
  onPageChange(event: any, data: any) {
    if (data === '1') {
      this.currentPage = event;
      this.GetApprovalList(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.GetApprovalList(this.currentPage)
    }
  }

  delete(id: number) {
    if (confirm('Are you sure delete this record?')) {
      this.onDeleteApproval(id);
    }
  }
  onDeleteApproval(id: number) {
    this.loading = true;
    this.http.delete(`alerts_database/${id}/`).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success("Approval Alert Deleted Successfully");
        this.GetApprovalList(this.currentPage);
        this.authService.setCurrentUser({ token: res.token });
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  IsApprovalAlert(id: any) {
    this.loading = true;

    const formData = new FormData();
    this.http.post(`client_approval/${id}/approve/`, formData).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success(res.message);
        this.GetApprovalList(1);
        this.loading = false;
        this.authService.setCurrentUser({ token: res.token });
      } else {
        this.loading = false;
        this.toastr.warning(res.message);
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  formRejected = this.fb.group({
    message: ['', Validators.required],
  })

  // Getter method to access formcontrols
  get myRejectedForm() {
    return this.formRejected.controls;
  }

  IsRejectedAlert(id: any) {
    this.RejectId = id;
  }

  OnRejectSubmit() {
    this.submitted = true;
    this.formRejected.markAllAsTouched();
    if (!this.formRejected.valid) {
      return;
    }
    const dataToSubmit = { ...this.formRejected.value };
    const formData = new FormData();
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post(`client_approval/${this.RejectId}/reject/`, formData).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success(res.message);
        this.GetApprovalList(1);
        this.onDismiss();
        this.loading = false;
        this.authService.setCurrentUser({ token: res.token });
      } else {
        this.loading = false;
        this.toastr.warning(res.message);
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  onDismiss() {
    const target = "#RejectedModal";
    $(target).hide();
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
    $("body").addClass("modal-overflow");
  }

}
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';
import * as $ from 'jquery';

@Component({
  selector: 'app-licence-list',
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.css'],
})
export class LicenceListComponent implements OnInit {
  public loading = false;
  public loadingGraph = false;
  public LicenseList: any = [];
  public clientId: any;
  public licenseId: any;
  public PaymentDetails: any;

  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private router: Router,
    private dtPipe: DatePipe,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.SetTopTitleName(`Licence List`);
    this.clientId = this.activeRoute.snapshot.params['id'] || 0;
    this.GetLicenseList(1);
  }

  ValueChanged(type: any) {
    if (type === 'Client') {
      this.GetLicenseList(1);
      this.onDismiss();
    }
  }

  onDismiss() {
    const target = "#LicenceModal";
    $(target).hide();
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
    $("body").addClass("modal-overflow");
  }

  IsPaymentDetails(data: any) {
    this.licenseId = data.license_id;
    this.GetPaymentDetails();
  }

  dateformat(datas: string) {
    return this.authService.Dateformat(datas);
  }

  Timeformat(time: string) {
    return this.authService.Timeformat(time);
  }

  form = new FormGroup({
    search: new FormControl(''),
  });

  onSearch(formValue: any) {
    this.GetLicenseList(1);
    this.currentPage = 1;
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  GetLicenseList(page: number) {
    this.loading = true;
    const formData = new FormData();
    const formValue = this.form.value;
    const search = formValue.search || '';
    formData.append('search', search);

    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`client/${this.clientId}/client_license_history`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      if (res.status === true) {
        this.LicenseList = res.data;
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
      this.GetLicenseList(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.GetLicenseList(this.currentPage)
    }
  }

  GetPaymentDetails() {
    this.loading = true;
    this.http.get(`client/${this.licenseId}/license_payment_details/`).subscribe(async (res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.PaymentDetails = res.data;
      } else {
        this.toastr.warning(res.message);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  delete(id: number) {
    if (confirm('Are you sure delete this record?')) {
      this.onDeleteAlert(id);
    }
  }
  onDeleteAlert(id: number) {
    this.loading = true;
    this.http.delete(`alerts_database/${id}/`).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success("License Deleted Successfully");
        this.GetLicenseList(this.currentPage)
        this.authService.setCurrentUser({ token: res.token });
      } else {
        this.toastr.error(res.message);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

}
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {

  public loading = false;
  public submitted = false;
  public AlertId: any;
  public AlertType: any;
  public AlertEdit: any;
  public ServerList: any = []
  public TenantList: any = []

  constructor(private http: HttpService,
    public toastr: ToastrService, private router: Router,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, public fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.SetTopTitleName(`Create Client`);
    this.AlertId = this.activeRoute.snapshot.params['id'] || 0;
    this.AlertType = this.activeRoute.snapshot.params['type'] || '';
    this.AlertEdit = this.activeRoute.snapshot.params['edit'] || '';
    this.GetServerList();
  }

  GetServerList() {
    this.loading = true;
    this.http.get(`servers/server_list/`).subscribe(async (res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.ServerList = res.data;
      } else {
        this.toastr.error(res.message);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  IsServerChange(event: any){
    let item = event.target.value;
    this.GetTenantId(item)
  }

  GetTenantId(serverId: any) {
    this.loading = true;
    this.http.get(`tenant_ids/?server_id=${serverId}`).subscribe(async (res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.TenantList = res.data;
      } else {
        this.TenantList = [];
        this.toastr.error(res.message);
        this.loading = false;
      }
    }, error => {
      this.TenantList = [];
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    organization_name: ['', Validators.required],
    phone: ['', Validators.required],
    server: ['', Validators.required],
    tenent_id: ['', Validators.required],
  })

  // Getter method to access formcontrols
  get myForm() {
    return this.userForm.controls;
  }

  OnSubmit() {
    this.submitted = true;
    this.userForm.markAllAsTouched();
    if (!this.userForm.valid) {
      return;
    }
    const dataToSubmit = { ...this.userForm.value };
    const formData = new FormData();
    // formData.append('html', this.ScriptHTML);
   
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
      this.http.post('client/', formData).subscribe((res: any) => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.router.navigate([`/client/list`]);
        
          this.userForm.reset();
          this.loading = false;
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

  // Pop Alert Get By ID 
  IsPopupAlertByIdRes: any = false;
  GetPopupAlertById() {
    this.loading = true;
    this.http.get(`alerts_database/${this.AlertId}/`).subscribe(async (res: any) => {
      this.IsPopupAlertByIdRes = res.status;
      if (res.status === true) {
        this.loading = false;
        this.userForm.setValue({
          title: res.data.popup_alert.title,
          body: res.data.popup_alert.body,
          high_priority: res.data.popup_alert.high_priority,
          acknowledgement_required: res.data.popup_alert.acknowledgement_required,
          self_distructive: res.data.popup_alert.self_distructive,
          auto_close: res.data.popup_alert.auto_close,
          auto_close_time: res.data.popup_alert.auto_close_time,
          allow_manual_close: res.data.popup_alert.allow_manual_close,
          lifetime_given: res.data.popup_alert.lifetime_given,
        
        });
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }
}

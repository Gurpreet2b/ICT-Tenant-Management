import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.css'],
  template: './preview.html'
})
export class CreateAlertComponent implements OnInit {

  public loading = true;
  public submitted = false;

  constructor(private http: HttpService,
    public toastr: ToastrService, private router: Router,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, public fb: FormBuilder,
    private authService: AuthService) {
  }

 
  public AlertId: any;
  public AlertType: any;
  public AlertEdit: any;

  ngOnInit(): void {
    this.authService.SetRestaurantName(`Create Alert`);
    this.AlertId = this.activeRoute.snapshot.params['id'] || 0;
    this.AlertType = this.activeRoute.snapshot.params['type'] || '';
    this.AlertEdit = this.activeRoute.snapshot.params['edit'] || '';
  }

  alertForm = this.fb.group({
    title: [''],
    body: ['', Validators.required],
    high_priority: [false],
    acknowledgement_required: [false],
    // unobtrusive: [''],
    self_distructive: [false],
  })

  // Getter method to access formcontrols
  get myForm() {
    return this.alertForm.controls;
  }



  OnSubmit(val: any) {
    this.submitted = true;
    this.alertForm.markAllAsTouched();
    if (!this.alertForm.valid) {
      return;
    }
    const dataToSubmit = { ...this.alertForm.value };
    const formData = new FormData();
    // formData.append('html', this.ScriptHTML);
   
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    if (this.AlertEdit === '') {
      this.http.post('popupalert/', formData).subscribe((res: any) => {
       
        if (res.status === true) {
          const responseData = res.data;
          this.toastr.success("Alert Added Successfully !!");
          if (val === 'next') {
            this.router.navigate([`/create-alerts/send-user/${responseData.id}/${responseData.alert_type}`]);
          } else if(val === 'template') {
            this.router.navigate([`/message`]);
          } else {
            this.router.navigate([`/create-alerts/draft`]);
          }
          this.alertForm.reset();
          this.loading = false;
          this.authService.setCurrentUser({ token: res.token });
        } else {
          this.toastr.error(res.message);
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        if (error.error.code === 'token_not_valid') {
          this.authService.logout();
          this.router.navigate(['/signin']);
          this.loading = false;
          
        } else if(error.status === 400) {
          this.toastr.error("Server Bad Request");
        } else if(error.status === 403) {
          this.toastr.error("Forbidden Error");
        } else if(error.status === 404) {
          this.toastr.error("Server not Found");
        } else if(error.status === 500) {
          this.toastr.error("Internal Server Error");
        } else {
          this.toastr.error("Server not reachable");
          this.loading = false;
        }
      });
    } else {
      this.http.patch(`popupalert/${this.AlertId}/`, formData).subscribe((res: any) => {
        if (res.status === true) {
          this.loading = false;
          const responseData = res.data;
          this.toastr.success("Alert Updated Successfully !!");
          if (val === 'next') {
            this.router.navigate([`/create-alerts/send-user/${responseData.id}/${responseData.alert_type}`]);
          } else if(val === 'template') {
            this.router.navigate([`/message`]);
          } else {
            this.router.navigate([`/create-alerts/draft`]);
          }
          this.alertForm.reset();
          this.authService.setCurrentUser({ token: res.token });
        } else {
          this.toastr.error(res.message);
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        if (error.error.code === 'token_not_valid') {
          this.authService.logout();
          this.router.navigate(['/signin']);
          this.loading = false;
          
        } else if(error.status === 400) {
          this.toastr.error("Server Bad Request");
        } else if(error.status === 403) {
          this.toastr.error("Forbidden Error");
        } else if(error.status === 404) {
          this.toastr.error("Server not Found");
        } else if(error.status === 500) {
          this.toastr.error("Internal Server Error");
        } else {
          this.toastr.error("Server not reachable");
          this.loading = false;
        }
      });
    }

  }

  // Pop Alert Get By ID 
  IsPopupAlertByIdRes: any = false;
  GetPopupAlertById() {
    this.loading = true;
    this.http.get(`alerts_database/${this.AlertId}/`).subscribe(async (res: any) => {
      this.IsPopupAlertByIdRes = res.status;
      if (res.status === true) {
        this.loading = false;
        this.alertForm.setValue({
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
      if (error.error.code === 'token_not_valid') {
        this.authService.logout();
        this.router.navigate(['/signin']);
        this.loading = false;
        
      } else if(error.status === 400) {
        this.toastr.error("Server Bad Request");
      } else if(error.status === 403) {
        this.toastr.error("Forbidden Error");
      } else if(error.status === 404) {
        this.toastr.error("Server not Found");
      } else if(error.status === 500) {
        this.toastr.error("Internal Server Error");
      } else {
        this.toastr.error("Server not reachable");
        this.loading = false;
      }
    });
  }
}
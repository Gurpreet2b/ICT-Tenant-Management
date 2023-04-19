import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {

  public loading = false;
  public submitted = false;
  public IsAdmin: any = false;
  
  @Output() valueChange = new EventEmitter();
  @Input() userId: any = '';

  constructor(private http: HttpService,
    public toastr: ToastrService, private router: Router,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, public fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.SetTopTitleName(`Create User`);
  }

  ngOnChanges() {
    if (this.userId) {
      console.log('####', this.userId);
      // this.GetDeviceListById();
    } else {
      // this.deviceForm.reset();
    }
  }

  IsAdminChange(event: any){
    this.IsAdmin = event.target.checked;
  }

  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
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

    formData.append('is_admin', this.IsAdmin);
   
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    if (this.userId === '' || this.userId === undefined) {
      this.http.post('dasboard_users/', formData).subscribe((res: any) => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.valueChange.emit('User');
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
    } else {
      this.http.patch(`dasboard_users/${this.userId}/`, formData).subscribe((res: any) => {
        if (res.status === true) {
          this.loading = false;
          const responseData = res.data;
          this.toastr.success(res.message);
          this.valueChange.emit('User');
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

  // Pop Alert Get By ID 
  GetPopupAlertById() {
    this.loading = true;
    this.http.get(`dasboard_users/${this.userId}/`).subscribe(async (res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.userForm.setValue({
          username: res.data.username,
          password: res.data.password,
        });
        this.authService.setCurrentUser({ token: res.token });
      } else {
        this.toastr.error(res.message);
        this.loading = false;
        this.authService.setCurrentUser({ token: res.token });
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }
}

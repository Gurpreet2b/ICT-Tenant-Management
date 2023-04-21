import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.css'],
})
export class CreateServerComponent implements OnInit {

  public loading = false;
  public submitted = false;
  
  @Output() valueChange = new EventEmitter();
  @Input() userId: any = '';

  constructor(private http: HttpService,
    public toastr: ToastrService, private router: Router,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, public fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.SetTopTitleName(`Create User`);
  }

  ngOnChanges() {
    if (this.userId) {
      console.log('####', this.userId);
      // this.GetDeviceListById();
    } else {
      // this.deviceForm.reset();
    }
  }

  serverForm = this.fb.group({
    server_name: ['', Validators.required],
    server_host: ['', Validators.required],
    server_port: ['', Validators.required],
    use_https: ['', Validators.required],
  })

  // Getter method to access formcontrols
  get myForm() {
    return this.serverForm.controls;
  }

  OnSubmit() {
    this.submitted = true;
    this.serverForm.markAllAsTouched();
    if (!this.serverForm.valid) {
      return;
    }
    const dataToSubmit = { ...this.serverForm.value };
    const formData = new FormData();
   
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    if (this.userId === '' || this.userId === undefined) {
      this.http.post('servers/', formData).subscribe((res: any) => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.valueChange.emit('Server');
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
        this.serverForm.setValue({
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

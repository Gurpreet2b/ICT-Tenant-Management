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
  public useHttps: any = false;
  
  @Output() valueChange = new EventEmitter();
  @Input() serverId: any = '';

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
    if (this.serverId) {
      this.GetServerById();
    } else {
      this.serverForm.reset();
    }
  }

  serverForm = this.fb.group({
    server_name: ['', Validators.required],
    server_host: ['', Validators.required],
    server_port: ['', Validators.required],
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

    formData.append('use_https', this.useHttps);
   
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    if (this.serverId === '' || this.serverId === undefined) {
      this.http.post('servers/', formData).subscribe((res: any) => {
        if (res.status === true) {
          this.toastr.success(res.message);
          this.valueChange.emit('Server');
          this.serverForm.reset();
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
      this.http.patch(`servers/${this.serverId}/`, formData).subscribe((res: any) => {
        if (res.status === true) {
          this.loading = false;
          const responseData = res.data;
          this.toastr.success(res.message);
          this.valueChange.emit('Server');
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

  // Server Get By ID 
  GetServerById() {
    this.loading = true;
    this.http.get(`servers/${this.serverId}/`).subscribe(async (res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.serverForm.setValue({
          server_name: res.data.server_name,
          server_host: res.data.server_host,
          server_port: res.data.server_port,
        });
        this.useHttps = res.data.use_https,
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

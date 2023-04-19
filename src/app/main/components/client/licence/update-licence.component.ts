import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-update-licence',
  templateUrl: './update-licence.component.html',
  styleUrls: ['./update-licence.component.css'],
})
export class UpdateLicenceComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  @Input() clientId: any;
  public IsPaidVersion: any = false;

  public loading = false;
  public submitted = false;
  public AlertId: any;
  public AlertType: any;
  public AlertEdit: any;
  public ClientList: any = []
  public InvoiceFile: File | undefined;
  public PaymentRecieptFile: File | undefined;
  public PaymentProofFile: File | undefined;

  constructor(private http: HttpService,
    public toastr: ToastrService, private router: Router,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, public fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.SetTopTitleName(`Update Licence`);
    this.GetClientList();
  }

  ngOnChanges() {
    if (this.clientId) {
      console.log('####', this.clientId);
      // this.GetDeviceListById();
    } else {
      // this.deviceForm.reset();
    }
  }

  OnPaidVersion(event: any) {
    if (event.target.value === 'paid') {
      this.IsPaidVersion = true;
    } else {
      this.IsPaidVersion = false;
    }
  }

  GetClientList() {
    this.loading = true;
    this.http.get(`client_approval/get_clients_list/`).subscribe(async (res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.ClientList = res.data;
      } else {
        this.toastr.error(res.message);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      this.authService.GetErrorCode(error);
    });
  }

  onFileChangeInvoice(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file.size > '5242880') {
      this.toastr.warning("File size cannot be larger than 5MB!");
      return;
    } else {
      this.InvoiceFile = file;
    }
  }

  onFileChangePaymentReciept(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file.size > '5242880') {
      this.toastr.warning("File size cannot be larger than 5MB!");
      return;
    } else {
      this.PaymentRecieptFile = file;
    }
  }

  onFileChangePaymentProof(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file.size > '5242880') {
      this.toastr.warning("File size cannot be larger than 5MB!");
      return;
    } else {
      this.PaymentProofFile = file;
    }
  }

  licenceUpdateForm = this.fb.group({
    new_license_date: ['', Validators.required],
    license_type: ['', Validators.required]
  })

  // Getter method to access formcontrols
  get myForm() {
    return this.licenceUpdateForm.controls;
  }

  OnSubmit() {
    this.submitted = true;
    this.licenceUpdateForm.markAllAsTouched();
    if (!this.licenceUpdateForm.valid) {
      return;
    }
    const dataToSubmit = { ...this.licenceUpdateForm.value };
    const formData = new FormData();
    formData.append('client_id', this.clientId);
    formData.append('invoice', this.InvoiceFile);
    formData.append('payment_reciept', this.PaymentRecieptFile);
    formData.append('payment_proof', this.PaymentProofFile);

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('client_approval/', formData).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success(res.message);
        // this.router.navigate([`/users/sent`]);
        this.valueChange.emit('Client');

        this.licenceUpdateForm.reset();
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

}

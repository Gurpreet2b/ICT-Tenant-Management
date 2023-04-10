import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private router: Router,
    private dtPipe: DatePipe,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.SetRestaurantName(`Users List`);
  }

}
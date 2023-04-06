import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';
// import { AuthService } from '@core/services';
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  name: string | null | undefined;
  // public sidebarMinimized = false;
  public Permission: any = [];
  public RoleName: any;
  public RoleAssign: any = [];

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    // let UserName = this.authService.getUserName();
    this.Permission = this.authService.getPermission();
    this.RoleAssign = JSON.parse(this.Permission.access_control_list);
    this.RoleName = this.Permission.role;
    // console.log(this.RoleAssign)
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#mainClass').toggleClass('active');
      });
    });
  }
}

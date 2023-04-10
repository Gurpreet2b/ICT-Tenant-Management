import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-freeTrail',
  templateUrl: './freeTrail.component.html',
  styleUrls: ['./freeTrail.component.css'],
})
export class FreeTrailComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.SetRestaurantName(`Subscription`);
  }

 
}
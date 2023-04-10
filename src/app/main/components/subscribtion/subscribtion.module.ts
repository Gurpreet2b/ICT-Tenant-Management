import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribtionRoutingModule } from './subscribtion-routing.module';
import { FreeTrailComponent } from './components/freeTrail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [FreeTrailComponent],
  imports: [
    CommonModule,
    SubscribtionRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
})
export class SubscribtionModule { }

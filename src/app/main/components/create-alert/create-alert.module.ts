import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAlertRoutingModule } from './create-alert-routing.module';
import { CreateAlertComponent } from './components/create-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SentAlertComponent } from './sent-alert/sent-alert.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [CreateAlertComponent, SentAlertComponent],
  imports: [
    CommonModule,
    CreateAlertRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
})
export class CreateAlertModule { }

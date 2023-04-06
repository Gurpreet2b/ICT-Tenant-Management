import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalListComponent } from './components/approval-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [ApprovalListComponent],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
})
export class ApprovalModule { }

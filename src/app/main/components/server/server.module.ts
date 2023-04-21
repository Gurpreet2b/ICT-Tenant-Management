import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerRoutingModule } from './server-routing.module';
import { CreateServerComponent } from './components/create-server.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerListComponent } from './server-list/server-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [CreateServerComponent, ServerListComponent],
  imports: [
    CommonModule,
    ServerRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
})
export class ServerModule { }

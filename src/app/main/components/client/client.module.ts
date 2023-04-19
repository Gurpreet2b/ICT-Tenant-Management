import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { CreateClientComponent } from './components/create-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientListComponent } from './client-list/client-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UpdateLicenceComponent } from './licence/update-licence.component';
import { LicenceListComponent } from './licence-list/licence-list.component';

@NgModule({
  declarations: [CreateClientComponent, ClientListComponent, UpdateLicenceComponent, LicenceListComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
})
export class ClientModule { }

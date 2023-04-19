import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './components/create-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { UpdateLicenceComponent } from './licence/update-licence.component';
import { LicenceListComponent } from './licence-list/licence-list.component';

const routes: Routes = [
  { path: '', component: CreateClientComponent },
  { path: 'list', component: ClientListComponent },
  { path: 'update-licence', component: UpdateLicenceComponent },
  { path: 'licence-list', component: LicenceListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

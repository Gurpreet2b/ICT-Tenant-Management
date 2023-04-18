import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './components/create-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { UpdateLicenceComponent } from './licence/update-licence.component';

const routes: Routes = [
  { path: '', component: CreateClientComponent },
  { path: 'list', component: ClientListComponent },
  { path: 'update-licence', component: UpdateLicenceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

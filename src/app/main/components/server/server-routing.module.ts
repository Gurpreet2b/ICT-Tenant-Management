import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServerComponent } from './components/create-server.component';
import { ServerListComponent } from './server-list/server-list.component';

const routes: Routes = [
  { path: '', component: ServerListComponent },
  { path: 'create', component: CreateServerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule { }

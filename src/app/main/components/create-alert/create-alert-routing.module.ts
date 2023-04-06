import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAlertComponent } from './components/create-alert.component';
import { SentAlertComponent } from './sent-alert/sent-alert.component';

const routes: Routes = [
  { path: '', component: CreateAlertComponent },
  { path: 'sent', component: SentAlertComponent },
  { path: ':id/:type', component: CreateAlertComponent },
  { path: ':id/:type/Alert/:edit', component: CreateAlertComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAlertRoutingModule { }

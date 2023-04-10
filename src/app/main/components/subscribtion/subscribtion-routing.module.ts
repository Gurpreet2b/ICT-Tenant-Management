import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreeTrailComponent } from './components/freeTrail.component';

const routes: Routes = [
  { path: '', component: FreeTrailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribtionRoutingModule { }

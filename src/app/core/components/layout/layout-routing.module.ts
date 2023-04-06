import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { LayoutComponent } from './components/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('../../../main/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'create-alerts', loadChildren: () => import('../../../main/components/create-alert/create-alert.module').then(m => m.CreateAlertModule) },
      { path: 'approval', loadChildren: () => import('../../../main/components/approval/approval.module').then(m => m.ApprovalModule) },
    ],
    // canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

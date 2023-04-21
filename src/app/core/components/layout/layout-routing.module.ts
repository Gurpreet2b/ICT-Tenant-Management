import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { LayoutComponent } from './components/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('../../../main/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('../../../main/components/user/user.module').then(m => m.UserModule) },
      { path: 'client', loadChildren: () => import('../../../main/components/client/client.module').then(m => m.ClientModule) },
      { path: 'approval', loadChildren: () => import('../../../main/components/approval/approval.module').then(m => m.ApprovalModule) },
      { path: 'server', loadChildren: () => import('../../../main/components/server/server.module').then(m => m.ServerModule) },
    ],
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: CreateUserComponent },
  { path: 'sent', component: UserListComponent },
  { path: ':id/:type', component: CreateUserComponent },
  { path: ':id/:type/Alert/:edit', component: CreateUserComponent },
  { path: 'detail', component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

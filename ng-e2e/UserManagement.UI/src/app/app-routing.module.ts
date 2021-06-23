import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NswagUserListComponent } from './users/nswag-user-list/nswag-user-list.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'nswag-users', component: NswagUserListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

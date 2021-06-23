import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { PiratesComponent } from './pirates/pirates.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: 'pirates', component: PiratesComponent },
  { path: 'todo', component: TodoListComponent },
  {
    path: 'customers/:id',
    component: CustomerComponent,
    children: [
      { path: 'orders', component: OrderComponent }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'pirates' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

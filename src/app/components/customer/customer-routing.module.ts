import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerResolver } from 'src/app/guard/customer.guard';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  { path: '', component: CustomerFormComponent },
  { path: 'view/:id', component: CustomerViewComponent },
  {
    path: 'edit/:id', component: CustomerFormComponent,
    resolve: {
      customer: CustomerResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

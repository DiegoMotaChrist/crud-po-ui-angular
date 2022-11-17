import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { SharedModule } from '../../shared/shared.module'


@NgModule({
  declarations: [CustomerListComponent, CustomerViewComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
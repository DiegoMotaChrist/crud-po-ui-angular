import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Customer } from '../providers/customer/customer';
import { CustomerProvider } from '../providers/customer/customer.provider';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<Customer> {

  constructor(private customerPrvd: CustomerProvider) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<Customer> {

    const id: string = route.params && route.params['id'] ? <string>route.params['id'] : '';
    
    if (id) {
      const customer: Customer = await this.customerPrvd.findCustomer(id);
      return customer;
    }
    return undefined;
  }
}

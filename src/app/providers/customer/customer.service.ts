import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API = 'http://localhost:3000/customers';
  private URL: string;

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    this.URL = this.API;
    return this.http.get<Customer[]>(this.URL).pipe(take(1));
  }

  loadById(id: string): Observable<Customer>{
    this.URL = `${this.API}/${id}`;
    return this.http.get<Customer>(this.URL)
  }

  create(cliente: Customer): Observable<any> {
    this.URL = this.API;
    return this.http.post<Customer>(this.URL, cliente);
  }

  update(cliente: Customer): Observable<Customer> {
    this.URL  = `${this.API}/${cliente.id}`;
    return this.http.put<Customer>(this.URL, cliente);
  }

  remove(customer:Customer): Observable<Customer> {
    this.URL = `${this.API}/${customer.id}`;
    return this.http.delete<Customer>(this.URL);
  }

}

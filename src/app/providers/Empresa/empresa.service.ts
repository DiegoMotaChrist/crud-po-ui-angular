import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService{

  private readonly API = 'https://www.receitaws.com.br/v1/cnpj';
  private URL: string;

  constructor(private http: HttpClient) { }

  loadByCNPJ(cnpj: string) {
    this.URL = `${this.API}/${cnpj}`;
    return this.http.jsonp(this.URL, 'callback');
 }

}

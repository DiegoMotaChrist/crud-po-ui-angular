import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from './endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = 'https://viacep.com.br/ws';
  private URL: string;

  constructor(private http: HttpClient) { }

  loadByCEP(cep: string) {
    this.URL = `${this.API}/${cep}/json/`;
    return this.http.get<Endereco>(this.URL);
 }

}

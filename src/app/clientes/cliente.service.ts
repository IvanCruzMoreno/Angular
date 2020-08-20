import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import {Cliente} from './cliente';
import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ClienteService{

  private http: HttpClient;
  private urlEndPoint: string = 'http://localhost:8090/api/clientes';

  constructor(http: HttpClient) {
    this.http = http;
  }
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}

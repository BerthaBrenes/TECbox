import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json'
})};


@Injectable({
  providedIn: 'root'
})
export class APIService {
  URL = "localhost:5000/";


  constructor(private http: HttpClient) { }

  /*
  Retorna todos los clientes 
  */
  getCliente(){
    return this.http.get<void[]>(this.URL);
  }

  /*
  Recibe un cliente y lo publica en el rest api
  */
  addCliente(cliente:void){
    return this.http.post<any>(this.URL,cliente)
 }
}



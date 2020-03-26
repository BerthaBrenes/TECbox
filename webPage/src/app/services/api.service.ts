import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json'
})};


@Injectable({
  providedIn: 'root'
})
export class APIService {
  url = "localhost:5000/";
  productSave:any;

  constructor(private http: HttpClient) {
    
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  /*
  Retorna todos los clientes 
  */
  getCliente(){
    return this.http.get<void[]>(this.url);
  }

  /*
  Recibe un cliente y lo publica en el rest api
  */
  addCliente(cliente:void){
    return this.http.post<any>(this.url,cliente)
 }
 /**
  *  Funtion to save the information of the product saved
  * @param finalPrice Final price of the product
  * @param quantiy Quantity of the product
  * @param productData Product general Information
  */
 addProductSell(finalPrice,quantiy,productData){
  this.productSave ={
    "Name": productData['Name'],
    "BarCode": productData['BarCode'],
    "Description": productData['Description'],
    "Seller": {
        "Name" : productData['Seller']['Name'],
        "Id" : {
            "Type":productData['Seller']['Id']['Type'],
            "Number":productData['Seller']['Id']['Number']
        }
    },
    "Price": finalPrice,
    "Quantity":quantiy
  }
 }
 
 handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
getProducts() {
  console.log("Service Get")
  return this.http.get(`${this.url}/api/Product`);
}
addProducts(data:any){
  console.log(data);
  return this.http.post(`${this.url}/api/Product"`,data,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
getClientes() {
  console.log("Service Get")
  return this.http.get(`${this.url}/client/getClient/All`);
}
getPackages() {
  console.log("Service Get")
  return this.http.get(`${this.url}/products/getProducts/All`);
}
getWorkers() {
  console.log("Service Get")
  return this.http.get(`${this.url}/products/getProducts/All`);
}
getSeller() {
  console.log("Service Get")
  return this.http.get(`${this.url}/products/getProducts/All`);
}
postProduct(Obj:any){
  return this.http.post<any>(`${this.url}/api/Product`,Obj)
}
getProductSell(){
  console.log(this.productSave);
  return this.productSave.json;
}
}



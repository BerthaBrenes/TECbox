import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
/**
 * options for the http header
 */
const httpOptions = {headers: new HttpHeaders({
  'Content-Type': 'application/json'
})};
/**
 * Injectable of the service
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Handle the request to the backEnd
 */
export class ApiService {
/**
 * Url for the request
 */
  url = 'https://localhost:44332';
  /**
   * Variable for the saved product
   */
  productSave: any;
  /**
   * Set the http options
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  /**
   * This method initializes the component
   * @param http Controller for the httpClient
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Get the clients
   */
  getCliente(){
    return this.http.get<void[]>(`${this.url}/api/v1/clients`);
  }

  /**
   * Look in the database and post
   * @param cliente the client data
   */
  addCliente(cliente: void){
    return this.http.post<any>(`${this.url}/api/v1/clients`, cliente);
 }
 /**
  *  Function to save the information of the product saved
  * @param finalPrice Final price of the product
  * @param quantity Quantity of the product
  * @param productData Product general Information
  */
 addProductSell(finalPrice, quantity, productData){
  this.productSave = {
    // tslint:disable-next-line: no-string-literal
    Name: productData['Name'],
    // tslint:disable-next-line: no-string-literal
    BarCode: productData['BarCode'],
    // tslint:disable-next-line: no-string-literal
    Description: productData['Description'],
    Seller: {
      // tslint:disable-next-line: no-string-literal
        Name : productData['Seller']['Name'],
        Id : {
            // tslint:disable-next-line: no-string-literal
            Type: productData['Seller']['Id']['Type'],
            // tslint:disable-next-line: no-string-literal
            Number: productData['Seller']['Id']['Number']
        }
    },
    Price: finalPrice,
    Quantity: quantity
  };
 }
 /**
  * Handler the http error
  * @param error error message
  */
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
}
/**
 * Get all the product
 */
getProducts() {
  console.log('Service Get');
  return this.http.get(`${this.url}/api/v1/products`);
}

/**
 * add a product
 * @param data data of the component
 */
addProducts(data: any){
  console.log(data);
  return this.http.post(`${this.url}/api/v1/products`, data, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError)
  );
}

/**
 * Get all the clients
 */
getClientes() {
  console.log('Service Get');
  return this.http.get(`${this.url}/api/v1/clients`);
}
/**
 * Get all the package
 */
getPackages() {
  console.log('Service Get');
  return this.http.get(`${this.url}/api/v1/packages`);
}
/**
 * Get worker information
 */
getWorkers() {
  console.log('Service Get');
  return this.http.get(`${this.url}/api/v1/employees`);
}
/**
 * get information of the seller
 */
getSeller() {
  console.log('Service Get');
  return this.http.get(`${this.url}/api/v1/sellers`);
}

/**
 * Add a product in the database
 * @param Obj Obj to post
 */
postProduct(Obj: any){
  return this.http.post<any>(`${this.url}/api/v1/products`, Obj);
}
/**
 * get all the product sellen
 */
getProductSell(){
  console.log(this.productSave);
  return this.productSave.json;
}
}

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  url = 'https://localhost:44332';

  constructor(private https:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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
    return this.https.get(`${this.url}/api/Product`);
  }
  addProducts(data:any){
    console.log(data);
    return this.https.post(`${this.url}/products/postProducts/"`,data,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getClientes() {
    console.log("Service Get")
    return this.https.get(`${this.url}/client/getClient/All`);
  }
  getPackages() {
    console.log("Service Get")
    return this.https.get(`${this.url}/products/getProducts/All`);
  }
  getWorkers() {
    console.log("Service Get")
    return this.https.get(`${this.url}/products/getProducts/All`);
  }
  getSeller() {
    console.log("Service Get")
    return this.https.get(`${this.url}/products/getProducts/All`);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
   HttpClient, 
   HttpHeaders, 
   HttpErrorResponse, 
   HttpEvent, 
   HttpHandler, 
   HttpInterceptor,
   HttpRequest
  } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService{
  constructor(private http: HttpClient) { }

  
  apiUrl = 'https://localhost:44332';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /**
   * Get info of all the distribuitor
   */
  getDistributors(){
    console.log("Service Get");
    return this.http.get(`${this.apiUrl}/api/v1/sellers`);
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
  }
  


  /**
   * Validates if a given user is valid
   * @param username 
   * @param password 
   */
  login(user:string, password:string){
    const data = { "Username": user, "Password":password};
    return this.http.post(`${this.apiUrl}/api/v1/employees/login`, data,this.httpOptions);
  }

  

  /**
   * Edit status of the package
   * @param status status of the package
   */
  changeStatus(status:string){
    console.log('Service Package Post');
    return this.http.patch(`${this.apiUrl}/api/v1/packages`,status);
  }
  /**
   * Get information of a specific package
   * @param Id TrackID of the package
   */
  getPackageByID(Id:string){
    console.log('Package Id', Id);
    return this.http.get(`${this.apiUrl}/api/v1/packages/`+Id);
  }
  getPackages(){
    console.log('Package data');
    return this.http.get(`${this.apiUrl}/api/v1/packages`);
  }
}


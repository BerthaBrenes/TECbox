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
  changeStatus(status:string, trackId: string){
    const jsonData = { "Status": status }; 
    return this.http.put<any>(`${this.apiUrl}/api/v1/packages/${trackId}`,jsonData, this.httpOptions);
  }


  /**
   * Get the packages of a certain deliverer
   * @param deliverer 
   */
  getPackages(){
    return this.http.get(`${this.apiUrl}/api/v1/packages`);
  }
}


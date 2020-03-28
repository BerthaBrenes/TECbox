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
    console.log('Service Package Post: '+ status);
    const jsonData = { "Status": status }; 
    console.log(JSON.stringify(jsonData));
    return this.http.put<any>(`${this.apiUrl}/api/v1/packages/A-349`,jsonData, this.httpOptions);
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


import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  apiUrl = 'https://localhost:5001';
  constructor(private http: HttpClient) { }

  /**
   * Get info of all the distribuitor
   */
  getDistributors(){
    console.log("Service Get");
    return this.http.get(`${this.apiUrl}/employee/getEmployee/All`);
  }
  /**
   * Put status of the package
   * @param status status of the package
   */
  changeStatus(status:string){
    console.log('Service Package Post');
    return this.http.post(`${this.apiUrl}/package/changeStatus/`,status);
  }
  /**
   * Get information of a specific package
   * @param Id TrackID of the package
   */
  getPackageByID(Id:string){
    console.log('Package Id', Id);
    return this.http.get(`${this.apiUrl}/package/getPackageID/`+Id);
  }
  getPackages(){
    console.log('Package data');
    return this.http.get(`${this.apiUrl}/package/getAllPackage`);
  }
}

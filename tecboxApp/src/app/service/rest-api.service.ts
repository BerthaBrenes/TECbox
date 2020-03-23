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

  getClientes(){
    console.log("Service Get")
    return this.http.get(`${this.apiUrl}/client/getClient/All`);
  }
}

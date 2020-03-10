import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
apiUrl = "http://api.zippopotam.us/";
  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    let response1 = this.http.get(this.apiUrl+'US/00210');
    let response2= this.http.get(this.apiUrl+'IN/110001');
    let response3 = this.http.get(this.apiUrl+'BR/01000-000');
    let response4 = this.http.get(this.apiUrl+'FR/01000');
    return forkJoin([response1, response2, response3, response4]);
  }
}

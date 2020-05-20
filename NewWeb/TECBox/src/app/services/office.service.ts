import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Office API resources
 */
export class OfficeService {


  // Server address and options for the hhttp header
  tecboxUrl = 'https://localhost:44332/api/v1';
  httpOptions = { headers: new HttpHeaders({'Content-Type':'application/json'})};

  /**
   * This method initializes the component
   * @param http Controller for the httpClient
   */
  constructor(private http:HttpClient) { }

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
   * Requests all offices to the server
   * @returns List with all the offices of tecbox.com
   */
  getOfficesList(){
    return this.http.get(`${this.tecboxUrl}/offices`)
  }

  
  /**
   * Request a client from the server
   * @param officeId Office identification number
   * @returns The requested Office object.
   */
  getOffice(officeId:string){
    return this.http.get(`${this.tecboxUrl}/offices/?officeId=${officeId}`);
  }
  

  /**
   * Register new users to the tecbox.com database
   * @param office Object with the data of the new customer
   */
  addNewOffice(office:any){
    return this.http.post<any>(`${this.tecboxUrl}/offices`,office);
  }


  /**
   * It allows to modify the information of a client.
   * @param officeId Office identification number
   * @param editedOffice The client with the updated information.
   */
  editOfficeData(officeId:string,editedOffice:void){
    return this.http.put<any>(`${this.tecboxUrl}/offices/?officeId=${officeId}`,editedOffice);
  }


  /**
   * Delete a customer account from the tecbox.com database.
   * @param officeId Office identification number
   */
  deleteOffice(officeId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/offices/?officeId=${officeId}`);
  }
  
}

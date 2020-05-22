import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Seller API resources
 */
export class SellerService {


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
   * Requests all sellers to the server
   * @returns List with all the sellers of tecbox.com
   */
  getSellersList(){
    return this.http.get(`${this.tecboxUrl}/sellers`);
  }

  
  /**
   * Request a seller from the server
   * @param sellerId Seller identification (physical or legal)
   * @returns The requested Seller object.
   */
  getSeller(sellerId:string){
    return this.http.get(`${this.tecboxUrl}/sellers/?sellerId=${sellerId}`);
  }
  

  /**
   * Register new users to the tecbox.com database
   * @param seller Object with the data of the new seller
   */
  registerSeller(seller:any){
    return this.http.post<any>(`${this.tecboxUrl}/sellers`,seller);
  }


  /**
   * It allows to modify the information of a seller.
   * @param sellerId Seller identification (physical or legal)
   * @param editedSeller The seller with the updated information.
   */
  editSellerData(sellerId:string,editedSeller:any){
    return this.http.put<any>(`${this.tecboxUrl}/sellers/?sellerId=${sellerId}`,editedSeller);
  }


  /**
   * Delete a seller from the tecbox.com database.
   * @param sellerId Seller identification (physical or legal)
   */
  deleteSellerAccount(sellerId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/sellers/?sellerId=${sellerId}`);
  }
}

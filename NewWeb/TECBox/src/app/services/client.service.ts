import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Client API resources
 */
export class ClientService {


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
   * Requests all clients to the server
   * @returns List with all the clients of tecbox.com
   */
  getClientsList(){
    return this.http.get(`${this.tecboxUrl}/clients`);
  }


  /**
   * Request a client from the server
   * @param clientId Customer identification (physical or legal)
   * @returns The requested Client object.
   */
  getClient(clientId:string){
    return this.http.get(`${this.tecboxUrl}/clients/?clientId=${clientId}`);
  }
  

  /**
   * Register new users to the tecbox.com database
   * @param client Object with the data of the new customer
   */
  registerClient(client:any){
    return this.http.post<any>(`${this.tecboxUrl}/clients`,client);
  }


  /**
   * It allows to modify the information of a client.
   * @param clientId Customer identification (physical or legal)
   * @param editedClient The client with the updated information.
   */
  editClientData(clientId:string,editedClient:void){
    return this.http.put<any>(`${this.tecboxUrl}/clients/?clientId=${clientId}`,editedClient);
  }


  /**
   * Delete a customer account from the tecbox.com database.
   * @param clientId Customer identification (physical or legal)
   */
  deleteClientAccount(clientId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/clients/?clientId=${clientId}`);
  }


  /**
   * Make a client login request. If it is successful, it returns the 
   * customer profile, otherwise you will receive an error.
   * @param username client username
   * @param password client password
   */
  loginClient(username:string,password:string){
    const clientData = { "Username": username, "Password":password};
    return this.http.post<any>(`${this.tecboxUrl}/clients/login`,clientData,this.httpOptions);
  }


}
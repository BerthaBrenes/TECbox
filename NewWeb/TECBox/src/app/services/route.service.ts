import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Route API resources
 */
export class RouteService {


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
   * Requests all routes to the server
   * @returns List with all the routes of tecbox.com
   */
  getRoutesList(){
    return this.http.get(`${this.tecboxUrl}/routes`);
  }

  
  /**
   * Request a route from the server
   * @param routeId route identification number.
   * @returns The requested Route object.
   */
  getRoute(routeId:string){
    return this.http.get(`${this.tecboxUrl}/routes/?routeId=${routeId}`);
  }
  

  /**
   * Register new users to the tecbox.com database.
   * @param route Object with the data of the new customer.
   */
  addNewRoute(route:any){
    return this.http.post<any>(`${this.tecboxUrl}/routes`,route);
  }


  /**
   * It allows to modify the information of a route.
   * @param routeId route identification number.
   * @param editedRoute The route with the updated information.
   */
  editRouteData(routeId:number,editedRoute:void){
    return this.http.put<any>(`${this.tecboxUrl}/routes/?routeId=${routeId}`,editedRoute);
  }


  /**
   * Add a new district to a route.
   * @param routeId 
   * @param district 
   */
  addDistrict(routeId:any,district:string){
    return this.http.put<any>(`${this.tecboxUrl}/routes/?routeId=${routeId}&district=${district}`,{});
  }


  /**
   * Delete a customer account from the tecbox.com database.
   * @param routeId route identification number.
   */
  deleteRouteAccount(routeId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/routes/?routeId=${routeId}`);
  }

}

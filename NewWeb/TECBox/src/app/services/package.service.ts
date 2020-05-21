import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Package API resources
 */
export class PackageService {


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
   * Requests all packages to the server
   * @returns List with all the packages of tecbox.com
   */
  getPackagesList(){
    return this.http.get(`${this.tecboxUrl}/packages`);
  }

  
  /**
   * Request a package from the server.
   * @param packId Package Tracking ID.
   * @returns The requested Package object.
   */
  getPackage(packId:string){
    return this.http.get(`${this.tecboxUrl}/packages/?packId=${packId}`);
  }

  
  /**
   * Returns packages that belong to a route and are in the "Ready for Delivery" status.
   * @param routeId 
   */
  getPackageByRoute(routeId:number){
    return this.http.get(`${this.tecboxUrl}/packages/report/?routeId=${routeId}`);
  }


  /**
   * Returns the packages that have been delivered, grouped by shipper and ordered by date.
   * @param startDate 
   * @param endDate 
   */
  getDeliveredPackages(startDate:string,endDate:string){
    const date = {
                    "startDate":startDate,
                    "endDate":endDate
                 };
    return this.http.post<any>(`${this.tecboxUrl}/packages/report`,date,this.httpOptions);
  }

  
  /**
   * Add new packages to the tecbox.com database
   * @param newPackage Object with the data of the new package
   */
  addNewPackage(newPackage:any){
    return this.http.post<any>(`${this.tecboxUrl}/packages`,newPackage);
  }


  /**
   * It allows to modify the information of a package.
   * @param packId Package Tracking ID
   * @param editedPackage The package with the updated information.
   */
  editPackageData(packId:string,editedPackage:void){
    return this.http.put<any>(`${this.tecboxUrl}/packages/?packId=${packId}`,editedPackage);
  }


  /**
   * Delete a package from the tecbox.com database.
   * @param packId Package Tracking ID
   */
  deletePackageAccount(packId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/packages/?packId=${packId}`);
  }


}

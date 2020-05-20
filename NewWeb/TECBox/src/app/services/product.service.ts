import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Product API resources
 */
export class ProductService {


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
   * Requests all products to the server
   * @returns List with all the products of tecbox.com
   */
  getProductsList(){
    return this.http.get(`${this.tecboxUrl}/products`)
  }


  /**
   * Request a product from the server.
   * @param productId Product Barcode.
   * @returns The requested Product object.
   */
  getProduct(productId:string){
    return this.http.get(`${this.tecboxUrl}/products/?productId=${productId}`);
  }


  /**
   * Get the 25 best-selling Tecbox products between two given dates
   * @param startDate
   * @param endDate
   * @returns Sorted list with the 25 best sellers
   */
  getBestSellers(startDate:string,endDate:string){
    const dates = {
                    "startDate":startDate,
                    "endDate":endDate
                  };
    return this.http.post<any>(`${this.tecboxUrl}/products/bestseller`,dates,this.httpOptions);
  }


  /**
   * Returns a mockup of the best-selling products.
   */
  getBestSellerEmergency(){
    return this.http.get(`${this.tecboxUrl}/products/bestseller/emergency`);
  }
  
  
  /**
   * Register new users to the tecbox.com database.
   * @param product Object with the data of the new customer.
   */
  addNewProduct(product:any){
    return this.http.post<any>(`${this.tecboxUrl}/products`,product);
  }


  /**
   * It allows to modify the information of a product.
   * @param productId Product Barcode.
   * @param editedProduct The product with the updated information.
   */
  editProductData(productId:string,editedProduct:void){
    return this.http.put<any>(`${this.tecboxUrl}/products/?productId=${productId}`,editedProduct);
  }


  /**
   * Delete a customer account from the tecbox.com database.
   * @param productId Customer identification (physical or legal)
   */
  deleteProductAccount(productId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/products/?productId=${productId}`);
  }
}

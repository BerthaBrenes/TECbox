import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Class that provides services to consume Tecbox Employee API resources
 */
export class EmployeeService {


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
   * Requests all employees to the server.
   * @returns List with all the employees of tecbox.com.
   */
  getEmployeesList(){
    return this.http.get(`${this.tecboxUrl}/employees`)
  }

  
  /**
   * Request an employee from the server.
   * @param empId Employee identification number.
   * @returns The requested Employee object.
   */
  getEmployee(empId:string){
    return this.http.get(`${this.tecboxUrl}/employees/?empId=${empId}`);
  }
  
  
  /**
   * Register new users to the tecbox.com database.
   * @param employee Object with the data of the new employee.
   */
  addEmployee(employee:any){
    return this.http.post<any>(`${this.tecboxUrl}/employees`,employee);
  }


  /**
   * It allows to modify the information of an employee.
   * @param empId Employee identification number.
   * @param editedEmployee The employee with the updated information.
   */
  editEmployeeData(empId:string,editedEmployee:void){
    return this.http.put<any>(`${this.tecboxUrl}/employees/?empId=${empId}`,editedEmployee);
  }


  /**
   * Delete an employee account from the tecbox.com database.
   * @param empId Employee identification number
   */
  deleteEmployee(empId:string){
    return this.http.delete<any>(`${this.tecboxUrl}/employees/?empId=${empId}`);
  }


  /**
   * Make an employee login request. If it is successful, it returns the 
   * employee profile, otherwise you will receive an error.
   * @param username employee username
   * @param password employee password
   */
  loginEmployee(username:string,password:string){
    const clientData = { "Username": username, "Password":password};
    return this.http.post<any>(`${this.tecboxUrl}/employees/login`,clientData,this.httpOptions);
  }

}

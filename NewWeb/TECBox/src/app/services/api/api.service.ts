import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
/**
 * options for the http header
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
/**
 * Injectable of the service
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Handle the request to the backEnd
 */
export class ApiService {
  /**
   * Url for the request
   */
  url = 'https://localhost:44332';
  json = 'assets/jsonUbicaciones.json';
  /**
   * Variable for the saved product
   */
  productSave: any;
  /**
   * Product Test
   */
  productTest: any[] = [
    {
      TrackId: 'A-349',
      Client: 'Ellon Musk',
      Description: 'Memoria SD 1 Unit',
      RouteId: 0,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Listo para Entrega',
      DeliveryDate: '2020-08-01'
    },
    {
      TrackId: 'B-552',
      Client: 'Esteban Alvarado Vargas',
      Description: 'Arduino UNO; Raspberry Pi 4',
      RouteId: 0,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Devuelto a Sucursal',
      DeliveryDate: '2020-04-01'
    },
    {
      TrackId: 'B-553',
      Client: 'Bertha Brenes',
      Description: 'Descripción de Producto',
      RouteId: 1,
      DeliveryMan: 'Juan Roberto',
      DmId: '100-789-142',
      Status: 'Entregado',
      DeliveryDate: '2020-05-22'
    },
    {
      TrackId: 'B-554',
      Client: 'Enellia Vargas',
      Description: 'Descripción de Producto',
      RouteId: 0,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Entregado',
      DeliveryDate: '2020-05-21'
    },
    {
      TrackId: 'B-555',
      Client: 'Sahis Rojas',
      Description: 'Descripción de Producto',
      RouteId: 2,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Listo para Entrega',
      DeliveryDate: '2020-04-01'
    },
    {
      TrackId: 'C-012',
      Client: 'Maron Arrieta',
      Description: 'Descripción de Producto',
      RouteId: 1,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Entregado',
      DeliveryDate: '2020-04-28'
    },
    {
      TrackId: 'D-502',
      Client: 'Esteban Alvarado Vargas',
      Description: 'Descripción de Producto',
      RouteId: 0,
      DeliveryMan: 'Juan Roberto',
      DmId: '100-789-142',
      Status: 'Entregado',
      DeliveryDate: '2020-05-10'
    },
    {
      TrackId: 'D-511',
      Client: 'Tim Cook',
      Description: 'Descripción de Producto',
      RouteId: 2,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Intento de Entrega Fallido',
      DeliveryDate: '2020-04-01'
    },
    {
      TrackId: 'M-334',
      Client: 'Roberto Azofeifa',
      Description: 'Descripción de Producto',
      RouteId: 3,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Entregado',
      DeliveryDate: '2020-02-16'
    },
    {
      TrackId: 'N-221',
      Client: 'Alejandro Ibarra',
      Description: 'Descripción de Producto',
      RouteId: 1,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'En Sucursal',
      DeliveryDate: '2020-08-15'
    },
    {
      TrackId: 'X-032',
      Client: 'Isaac Ramírez',
      Description: 'Descripción de Producto',
      RouteId: 3,
      DeliveryMan: 'David Alvarado',
      DmId: '109-251-785',
      Status: 'Listo para Entrega',
      DeliveryDate: '2020-05-16'
    }
  ];
  /**
   * user test
   */
  userTest: any[] = [{
    Username: 'bbrenes1996',
    Password: 'client',
    Name: 'Bertha Brenes Brenes',
    Id: {
      Type: 'CR',
      Number: '124-345-567'
    },
    Email: 'bertha@mail.com',
    Phone: '+(99)(999) 9999-9999',
    Mobile: '8888-8888',
    Address: {
      Department: 'Cartago',
      City: 'Desamparados',
      District: 'Gravillas',
      Others: 'El Porvenir, Urb Marianela Casa 8F'
    }
  },
  {
  Username: 'estalvgs1999',
    Password: 'admin',
    Name: 'Esteban Alvarado Vargas',
    Id: {
      Type: 'CF',
      Number: '123-345-567'
    },
    Email: 'esteban@mail.com',
    Phone: '+(99)(999) 9999-9999',
    Mobile: '8888-8888',
    Address: {
      Department: 'San José',
      City: 'Desamparados',
      District: 'Gravillas',
      Others: 'El Porvenir, Urb Marianela Casa 8F'
    }
  }
];
  /**
   * Test data
   */
  // tslint:disable-next-line: max-line-length
  TemporalArticuleData: any = [
    { name: 'Celular',
    description: 'Memoria para celular 16M',
    barCode: '7545',
    seller: 'Juan Barnes',
    price: 7802,
    discount: 20,
    taxes: true,
    image: 'https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593724/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_8_sbfegj.png'
  }, {
    name: 'Laptp',
    description: 'Memoria para celular 16M',
    barCode: '7545',
    seller: 'Juan Barnes',
    price: 18000,
    discount: 20,
    taxes: true,
    image: 'https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593724/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_8_sbfegj.png'
  }];
  /**
   * Set the http options
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  /**
   * This method initializes the component
   * @param http Controller for the httpClient
   */
  constructor(private http: HttpClient) {
  }

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
   * Look in the database and post
   * @param cliente the client data
   */
  addCliente(cliente: void) {
    return this.http.post<any>(`${this.url}/api/v1/clients`, cliente);
  }
  /**
   *  Function to save the information of the product saved
   * @param finalPrice Final price of the product
   * @param quantity Quantity of the product
   * @param productData Product general Information
   */
  addProductSell(finalPrice, quantity, productData) {
    this.productSave = {
      // tslint:disable-next-line: no-string-literal
      Name: productData['Name'],
      // tslint:disable-next-line: no-string-literal
      BarCode: productData['BarCode'],
      // tslint:disable-next-line: no-string-literal
      Description: productData['Description'],
      Seller: {
        // tslint:disable-next-line: no-string-literal
        Name: productData['Seller']['Name'],
        Id: {
          // tslint:disable-next-line: no-string-literal
          Type: productData['Seller']['Id']['Type'],
          // tslint:disable-next-line: no-string-literal
          Number: productData['Seller']['Id']['Number']
        }
      },
      Price: finalPrice,
      Quantity: quantity
    };
  }
  /**
   * add a product
   * @param data data of the component
   */
  addProducts(data: any) {
    console.log(data);
    return this.http.post(`${this.url}/api/v1/products`, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  /**
   * Add a product in the database
   * @param Obj Obj to post
   */
  postProduct(Obj: any) {
    return this.http.post<any>(`${this.url}/api/v1/products`, Obj);
  }
  /**
   * Get all the clients
   */
  getClientes() {
    console.log('Service Get');
    return this.http.get(`${this.url}/api/v1/clients`);
  }
  /**
   * Get the clients
   */
  getCliente() {
    return this.http.get<void[]>(`${this.url}/api/v1/clients`);
  }
  /**
   * Get all the package
   */
  getPackages() {
    console.log('Service Get');
    return this.http.get(`${this.url}/api/v1/packages`);
  }
  /**
   * Get worker information
   */
  getWorkers() {
    console.log('Service Get');
    return this.http.get(`${this.url}/api/v1/employees`);
  }
  /**
   * get information of the seller
   */
  getSeller() {
    console.log('Service Get');
    return this.http.get(`${this.url}/api/v1/sellers`);
  }

  /**
   * get all the product sellen
   */
  getProductSell() {
    console.log(this.productSave);
    return this.productSave.json;
  }
  /**
   * Get all the product
   */
  getProducts() {
    return this.http.get(`${this.url}/api/v1/products`);
  }
  /**
   * Get all the product
   */
  getProductsTemporal() {
    console.log('Service Get');
    return this.TemporalArticuleData;
  }
  /**
   * get the reports data
   */
  getReport(){
    const reports = {
      report1: [
        {
            BarCode: 'AAAAA',
            Name: 'Producto 1',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 2',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 3',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 4',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 5',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 6',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 7',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 8',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 9',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 10',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 11',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 12',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 13',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 14',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 15',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 16',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 17',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 18',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 19',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 20',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 21',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 22',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 23',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 24',
            Qty: 100
        },
        {
            BarCode: 'AAAAA',
            Name: 'Producto 25',
            Qty: 100
        }
    ],
      report2: [],
      report3: []
    };
    return reports;
  }
  getUbicacion(){
    return this.http.get(this.json);
  }
}

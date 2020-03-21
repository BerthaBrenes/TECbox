import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = 'https://localhost:5001';

  constructor(private https:HttpClient) { }

  getProducts() {
    console.log("Service Get")
    return this.https.get(`${this.url}/products/getProducts/All`);
  }
}

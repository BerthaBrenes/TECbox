import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  /**Boolean for the Client Log in */
  ClienteEnable:boolean=false;
  /** Bolean for the Package  */
  PaquetesEnable:boolean=false;
  /**Input data for the articles component */
  inputArticle:any;
  /**
   * Inicialization of the page
   * @param productService manage the request of product Service
   */
  constructor(
    private productService:ProductsService
  ) { 
    /**Call the Service to get the information of the produts */
    this.productService.getProducts().subscribe(data=>{
      this.inputArticle=data;
      console.log(data)
    });
  }
/**
 * Go after the constructor
 */
  ngOnInit() {
    
  }
  /**
   * Enables the log in function
   */
  enableCliente(){
    this.ClienteEnable=true;
    console.log('cliente',this.ClienteEnable)

  }
  /**
  * Enables the packege function
  */
  enablePaquete(){
    this.PaquetesEnable=true;
  }

}

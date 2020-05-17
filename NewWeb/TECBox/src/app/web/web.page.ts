import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web',
  templateUrl: './web.page.html',
  styleUrls: ['./web.page.scss'],
})
export class WebPage implements OnInit {
  /**
   * Boolean for the Client Log in
   */
  ClienteEnable: boolean = false;
  /** Bolean for the Package  */
  PaquetesEnable: boolean = false;
  /**
   * Input data for the articles component
   */
  inputArticle: any;
  /**
   * Input Data for the clients Componet
   */
  inputClients: any;
  /**
   * Test data
   */
  TestData: any= {"name":"Celular","description":"Memoria para celular 16M","barCode":"7545","seller":"Juan Barnes","price":32,"discount":false,"taxes":true,"image":"https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593724/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_8_sbfegj.png"};
  /**
   * This method initializes the component
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }
  /**
   * Enables the log in function
   */
  enableCliente(){
    this.ClienteEnable = true;
    console.log('cliente', this.ClienteEnable);

  }
   /**
    * Enables the packege functio
    */
  enablePaquete(){
    this.PaquetesEnable = true;
  }

}

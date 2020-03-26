import { Component, OnInit } from '@angular/core';
import  {APIService} from '../services/api.service'
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
   * Input Data for the clients Componet
   */
  inputClients:any;
  /**
   * Test data
   */
  TestData:any={"name":"Celular","description":"Memoria para celular 16M","barCode":"7545","seller":"Juan Barnes","price":32,"discount":false,"taxes":true,"image":"https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593724/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_8_sbfegj.png"};
  /**
   * Inicialization of the page
   * @param entityService manage the request of product Service
   */
  constructor(
    private entityService:APIService
  ) { 
    // this.entityService.addProducts(this.TestData).subscribe(Response=>{
    //   console.log(Response)
    // });
    /**Call the Service to get the information of the produts */
    this.entityService.getProducts().subscribe(data=>{
      this.inputArticle=data;
      console.log('Products',data)
    });
    this.entityService.getClientes().subscribe(data=>{
      this.inputClients=data;
      console.log('Clients',data)
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

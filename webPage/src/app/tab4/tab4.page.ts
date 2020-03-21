import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  ClienteEnable:boolean=false;
  PaquetesEnable:boolean=false;
  constructor(
    private productService:ProductsService
  ) { 
    console.log(this.productService.getDetails().subscribe());
  }

  ngOnInit() {
    
  }
  enableCliente(){
    this.ClienteEnable=true;
    console.log('cliente',this.ClienteEnable)

  }
  enablePaquete(){
    this.PaquetesEnable=true;
  }

}

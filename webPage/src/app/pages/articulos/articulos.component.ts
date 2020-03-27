import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit {
  /**
   * Variable for the data of the articke
   */
  data:any;
  /**
   * Variable to get the number of products to buy 
   */
  quantity: number = 0;

  /**
   * Checks if there is a variable selected.
   */
  answered: boolean = false;
   /**
   * Input of the component
   */
  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }

  /**
   * Call passed by parameter.
   */
  @Output() onAnswered = new EventEmitter<{ value: number }>();

  /**
   * First Function to call in the page
   */
  constructor() {
    
   }
 /**
  * Second Funtion to call
  */
  ngOnInit() {}
/**
   * This function increment the value of the quantity.
   */
  increment() {
      this.quantity++;
    this.setAnswer();
  }
  /**
   * This function decrement the value of the quantity.
   */
  decrement() {
    this.quantity--;
    this.setAnswer();
  }
   setAnswer() {
    this.answered = true;
    this.onAnswered.emit({ value: this.quantity });
    let initValue = {
      value: this.quantity
    };
  }
  /**
   * Buy products, add the product to service
   */
  buy(product:any){
    var Finalprice = this.quantity*product['Price']
    var discount= 1;
    var taxes=1;
    if(product['Discount']==true){
      discount = ((this.quantity*10)/100)
    }
    if(product['Taxes']==true){
      taxes = ((this.quantity*13)/100)
    }
    Finalprice= Finalprice+taxes-discount
    console.log('Cantidad de productos',this.quantity,'Precio Final',Finalprice,'Product',product)
  }


}

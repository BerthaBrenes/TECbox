import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
/**
 * Component that handles the articles
 */
export class ArticulosComponent implements OnInit {
  /**
   * Variable for the data of the article
   */
  data: any;
  /**
   * Variable to get the number of products to buy
   */
  quantity: number = 0;
  /**
   * user Validation
   */
  userValidation: boolean;
  /**
   * Checks if there is a variable selected.
   */
  answered: boolean = false;
  /**
   * Input of the component
   */
  @Input() set src(val: any) {
    this.data = val;
    console.log('data', this.data);
  }
  @Input() set userValidate(valUser: boolean) {
    this.userValidation = valUser;
    console.log('userEntry', valUser);
  }

  /**
   * Call passed by parameter.
   */
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAnswered = new EventEmitter<{ price: number, quantity: number, product: any}>();

  /**
   * This method initializes the component
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() { }

  /**
   * This function increment the value of the quantity.
   */
  increment() {
    this.quantity++;
  }
  /**
   * This function decrement the value of the quantity.
   */
  decrement() {
    if (this.quantity >= 1){
      this.quantity--;
    }
  }
  /**
   * Set an answer
   */
  setAnswer(price: number, quantity: number, product: any) {
    this.answered = true;
    this.onAnswered.emit({ price, quantity, product});
  }
  /**
   * Buy products, add the product to service
   * @param product product it will be buy
   */
  agregarCarrito(product: any) {
    // tslint:disable-next-line: no-string-literal
    let FinalPrice = this.quantity * product['price'];
    console.log(FinalPrice);
    let discount = 1;
    // tslint:disable-next-line: no-string-literal
    if (product['discount']) {
      discount = product?.discount / 100;
    }
    FinalPrice = (FinalPrice * discount);
    console.log('Cantidad de productos', this.quantity, 'Precio Final', FinalPrice, 'Product', product);
    this.setAnswer(FinalPrice, this.quantity, product);

  }

}

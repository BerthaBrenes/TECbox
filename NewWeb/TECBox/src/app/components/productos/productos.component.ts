import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  /**
   * Enable the component for add data
   */
  enterEnable:boolean=false;
  /**
   * id of the page for pass to the table
   */
  id:string='producto';
  /**
   * data of the component
   */
  data: any;
  /**
   * Input of the component
   */
  @Input() set src(val: any){
    this.data = val;
    console.log('product data', this.data);
  }
  /**
   * First Function to call in the page
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}
  /**
   * Function for add product
   */
  clickEnter(){
    this.enterEnable = true;
  }


}

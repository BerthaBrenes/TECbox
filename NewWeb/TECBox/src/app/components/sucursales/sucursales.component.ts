import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
})
export class SucursalesComponent implements OnInit {

  /**
   * Data for the component
   */
  data: any;
  /**
   * id of the component for the table
   */
  id: string = 'sucursal';
  /**
   * enable to add new data
   */
  enterEnable: boolean = false;
  /**
   * Input function that get the data
   */
  @Input() set src(val: any){
    this.data = val;
    console.log('data', this.data);
  }
  /**
   * This method is the constructor of the component.
   */
  constructor() { }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}
  /**
   * Function that enable the add data
   */
  clickEnter(){
    this.enterEnable = true;
  }

}

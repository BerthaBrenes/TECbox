import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  /**
   * Data of packages
   */
  data: any;
  /**
   * id of the component
   */
  id: string = 'paquetes';
  /**
   * Enable the function to add data
   */
  enterEnable: boolean = false;
  /**
   * Input of data
   */
  @Input() set src(val: any){
    this.data = val;
    console.log('data', this.data);
  }
  /**
   * This method initializes the component
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}
  /**
   * method for add more data
   */
  clickEnter(){
    this.enterEnable = true;
  }

}

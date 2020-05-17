import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss'],
})
export class VendedoresComponent implements OnInit {

   /**
   * Enable to add data
   */
  enterEnable:boolean=false;
   /**
   * id of the component for the table
   */
  id:string='vendedores';
   /**
   * data for the component
   */
  data:any;
  /**
   * Inpunt data
   */
  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
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
   * Function that enable the add data
   */
  clickEnter(){
    this.enterEnable=true;
  }

}

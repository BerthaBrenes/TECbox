import { Component, OnInit, Input } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss'],
})
/**
 * Page that handles the routes
 */
export class RutasComponent implements OnInit {

  /**
   * Enable to add data
   */
  enterEnable: boolean = false;
  /**
   * id of the component for the table
   */
  id: string = 'rutas';
  /**
   * data for the component
   */
  data: any;

  /**
   * Inpunt data
   */
  @Input() set src(val: any) {
    this.data = val;
    console.log('data', this.data);
  }
  /**
   * First Function to call in the page
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() { }
  /**
   * let add data
   */
  clickEnter() {
    this.enterEnable = true;
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.scss'],
})
export class TrackingPageComponent implements OnInit {
  /**
   * Data for the component
   */
  data: any;
  /**
   * id to set up the table
   */
  id: string = 'cliente';

  /**
   * Input of the component
   */
  @Input() set src(val: any) {
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
  ngOnInit() { }
}

import { Component, OnInit, Input } from '@angular/core';
import { PopOverMenu } from 'src/app/models/popovermenu';
/**
 * Component
 */
@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
/**
 * Controller the handle the popOverMenu
 */
export class PopOverComponent implements OnInit {
  /**
   * Input of the controller for the menu options
   */
  @Input() config: {
    color: string,
    menuItems: PopOverMenu[]
  };
  /**
   * This method initializes the component
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() { }

}

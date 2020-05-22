import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
/**
 * Component
 */
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
/**
 * Component that handles the client
 */
export class ClientesComponent implements OnInit {
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
  constructor(public modalCtrl: ModalController) { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() { }
  /**
   * Dismiss the modal
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}

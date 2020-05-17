import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaquetesComponent } from '../components/paquetes/paquetes.component';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'app-cellar',
  templateUrl: './cellar.page.html',
  styleUrls: ['./cellar.page.scss'],
})
export class CellarPage implements OnInit {

  /**
   * id for the table
   */
  idTracking: string = 'rastreo';
  /**
   * This method initializes the component
   */
  constructor( public modalController: ModalController) { }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }
  /**
   * Present the Package Component
   */
  async presentPackage() {
    const modal = await this.modalController.create({
      component: PaquetesComponent,
      cssClass: 'modalClass'
    });
    return await modal.present();
  }
  /**
   * Present the Table Component for the tracking
   */
  async presentTrackingPackage() {
    const modal = await this.modalController.create({
      component: TableComponent,
      cssClass: 'modalClass',
      componentProps: {
        type: this.idTracking
      }
    });
    return await modal.present();
  }

}

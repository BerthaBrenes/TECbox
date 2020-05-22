import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PackageService } from 'src/app/services/package.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Component
 */
@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.scss'],
})
/**
 * Component that handle the tracking page
 */
export class TrackingPageComponent implements OnInit {
  /**
   * Data for the component
   */
  data: any;
  /**
   * id to set up the table
   */
  id: string = 'rastreo';

  dataPaquete: any;
  enablePaquete: boolean = false;
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
  constructor(
    private toastController: ToastController, 
    public modalController: ModalController,
    private packageService: PackageService

  ) { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() { }
    /**
   * Dismmiss the page
   */
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  /**
   * Buscar paquete
   */
  buscar(id: string){
    console.log('id Packete',id);
    this.packageService.getPackage(id).subscribe(
      data =>{
        this.dataPaquete = data;
        console.log('data Package', this.dataPaquete);
        this.enablePaquete = true;
      },
      (error: HttpErrorResponse) => {
        this.presentToast('Opps ¡Algo salió mal! Id paquete no es valido', 'danger');
      }
    )
  }
   /**
   * Present toast
   */
  async presentToast(messageR: string, colorR: string) {
    const toast = await this.toastController.create({
      message: messageR,
      color: colorR,
      duration: 4000
    });
    toast.present();
  }
}

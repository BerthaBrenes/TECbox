import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  /**
   * data of the products
   */
  data: any = [];
  /**
   * Input data 
   */
  @Input() set products(val: any){
    this.data = val;
    console.log('data Product', this.data);
  }
  /**
   * products send
   */
  @Output() onAnswered = new EventEmitter<{ data: any}>();

  /**
   * 
   */
  constructor(public modalCtrl: ModalController,
    private toastController: ToastController ) { }

  ngOnInit() {}
  /**
   * Dismiss the modal
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
 

  /**
   * Comprar
   */
  comprar(){
    this.presentToast('Ha comprado los paquetes con exito, se le enviara un correo con la informacion para el pago','success')
    this.dismissWD(this.data);
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
/**
   * dismiss the modal with data
   */
  dismissWD(dataD: any) {
    this.modalCtrl.dismiss({
      dismissed: true,
      data: dataD
    });
  }
}

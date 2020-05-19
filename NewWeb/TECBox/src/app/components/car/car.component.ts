import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {

  data: any;
  @Input() set products(val: any){
    this.data = val;
    console.log('data', this.data);
  }
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  /**
   * Dismiss the modal
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}

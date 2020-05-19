import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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

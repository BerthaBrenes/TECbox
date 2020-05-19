import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import {ubicaciones} from './../../../assets/data/ubication';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  providences: any[];
  constructor(
    public modalCtrl: ModalController,
    private entityService: ApiService) {
      this.entityService.getUbicacion().subscribe(data => {
        console.log('dataUb', data);
      });
    }

  ngOnInit() {
    console.log('ngONit', ubicaciones);
    this.providences = ubicaciones['provincias'];
    console.log('providence', this.providences);
  }
  /**
   * Dismiss the modal
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  cargarCantones(titleP: string){
    console.log('type', typeof(titleP), titleP);
    console.log(this.providences)
    // tslint:disable-next-line: forin
    // tslint:disable-next-line: only-arrow-functions
    var found = this.providences.find( (element) => {
      console.log(element);
      return titleP === element.title;
    });
    console.log(found);
  }
}

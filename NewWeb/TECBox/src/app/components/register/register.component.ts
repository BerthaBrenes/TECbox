import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ClientService } from 'src/app/services/client.service';
import {ubicaciones} from './../../../assets/data/ubication';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  providences: any[];
  providenceSelected: string;
  cantones: any[];
  cantonSelected: string;
  distritos: any[];
  districtSelected: string;
  name: string;
  email: any;
  phone: any;
  mobile: any;
  username: string;
  password: any;
  otherSign: string;
  typeOfId: string;
  id: string;
  constructor(
    public modalCtrl: ModalController,
    private entityService: ApiService) {
    this.entityService.getUbicacion().subscribe(data => {
      console.log('dataUb', data);
    });
  }

  ngOnInit() {
    console.log('ngONit', ubicaciones);
    this.providences = ubicaciones.provincias;
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
  cargarCantones(ev: string) {
    for (const providence of this.providences) {
      if (ev === providence.title) {
        this.cantones = providence.cantones;
        console.log('cantones', this.cantones);
        break;
      }
    }
  }

  cargarDistritos(ev: string) {
    console.log(ev);
    for (const canton of this.cantones) {
      if (ev === canton.title) {
        this.distritos = canton.distritos;
        console.log('distritos', this.distritos);
        break;
      }
    }
  }
  submit() {
    const userObject = {
      Username: this.username,
      Password: this.password,
      Name: this.name,
      Id: {
        Type: 'CR',
        Number: '124-345-567'
      },
      Email: this.email,
      Phone: this.phone,
      Mobile: this.mobile,
      Address: {
        Department: this.providenceSelected,
        City: this.cantonSelected,
        District: this.districtSelected,
        Others: this.otherSign
      }
    };
    this.entityService.addCliente(userObject);
    this.dismiss();
  }
}

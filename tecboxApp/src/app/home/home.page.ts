import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {RestApiService} from '../service/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public api: RestApiService, public loadingController: LoadingController) {}
  clients:any;
  ngOnInit(){
      this.getData();
  }
  async getData() {
    this.api.getClientes().subscribe(data=>{
      this.clients=data;
      console.log(data);
    });
  }
}

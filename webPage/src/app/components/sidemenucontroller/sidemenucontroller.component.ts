import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-sidemenucontroller',
  templateUrl: './sidemenucontroller.component.html',
  styleUrls: ['./sidemenucontroller.component.scss'],
})
export class SidemenucontrollerComponent implements OnInit {

  admin: boolean; 
  storage: boolean;
  report: boolean;
  constructor(private navParams: NavParams) {
    console.log(this.navParams.data['type']);
    
   }

  ngOnInit() {}

}

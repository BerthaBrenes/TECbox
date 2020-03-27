import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
navigate2:any;
id:string='rastreo';
  constructor() {}
  sideMenu2(){
    this.navigate2=[{
      title : "Gestion de Paquetes",
      url   : "/paquetes",
      icon  : "home"
    },
    {
      title : "Gestion de Rastreo de Paquetes",
      url   : "/rastre",
      icon  : "home"
    }
  ]
  }

}

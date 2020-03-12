import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selected:string;
  navigate:any=[
    {
      title : "Sucursales",
      url   : "/sucursales",
      icon  : "home"
    },
    {
      title : "Trabajadores",
      url   : "/trabajadores",
      icon  : "home"
    },
    {
      title : "Vendedores",
      url   : "/vendedores",
      icon  : "home"
    }, 
    {
      title : "Productos",
      url   : "/productos",
      icon  : "home"
    },
    {
      title : "Rutas",
      url   : "/rutas",
      icon  : "home"
    }
  ];
 

  constructor(private menu: MenuController, private router: Router) {
  }
  
  

}

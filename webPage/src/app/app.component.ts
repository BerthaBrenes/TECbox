import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate:any;
  navigate2:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.sideMenu();
    this.sideMenu2();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
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
  sideMenu(){
    this.navigate=[
      {
        title : "Gestion de Sucursales",
        url   : "/sucursales",
        icon  : "home"
      },
      {
        title : "Gestion de Trabajadores",
        url   : "/trabajadores",
        icon  : "home"
      },
      {
        title : "Gestion de Vendedores",
        url   : "/vendedores",
        icon  : "home"
      }, 
      {
        title : "Gestion de Productos",
        url   : "/productos",
        icon  : "home"
      },
      {
        title : "Gestion de Rutas",
        url   : "/rutas",
        icon  : "home"
      }
    ]
  }
}

import { Component } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import {APIService} from '../services/api.service'
import { SidemenucontrollerComponent } from '../components/sidemenucontroller/sidemenucontroller.component';
import { PopOverControllerPage } from '../pop-over-controller/pop-over-controller.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /**
   * Input of the products
   */
  inputProduct:any;
  /**
   * Test Data
   */
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
 /**
  * Inicialization of the page
  * @param menu manage the side menu 
  * @param router manage the navigation between the pages
  * @param entityService Services for get all the entity information
  */

  constructor(
    private menu: MenuController, 
    private router: Router, 
    private entityService:APIService,
    public popoverController: PopoverController
    ) { 
      // this.entityService.addProducts(this.TestData).subscribe(Response=>{
      //   console.log(Response)
      // });
      /**Call the Service to get the information of the produts */
      this.entityService.getProducts().subscribe(data=>{
        this.inputProduct=data;
        console.log(data)
      });
  
    }

    /**
     * Present the menu for the 
     * @param ev Event
     */
    async sideAdminMenu(ev: CustomEvent) {
      const popover = await this.popoverController.create({
        component: PopOverControllerPage,
        event: ev,
        translucent: true,
        componentProps: {
          type: 'admin'
        }
      });
      return await popover.present();
    }

}

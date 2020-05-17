import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopOverComponent } from '../components/pop-over/pop-over.component';
import { ProductosComponent } from '../components/productos/productos.component';
import { RutasComponent } from '../components/rutas/rutas.component';
import { SucursalesComponent } from '../components/sucursales/sucursales.component';
import { TrabajadoresComponent } from '../components/trabajadores/trabajadores.component';
import { VendedoresComponent } from '../components/vendedores/vendedores.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  /**
   * Input of the products
   */
  ProductData: any;
  /**
   * Test Data
   */
  branchData: any = [
    {
      title : 'Sucursales',
      url   : '/sucursales',
      icon  : 'home'
    },
    {
      title : 'Trabajadores',
      url   : '/trabajadores',
      icon  : 'home'
    },
    {
      title : 'Vendedores',
      url   : '/vendedores',
      icon  : 'home'
    },
    {
      title : 'Productos',
      url   : '/productos',
      icon  : 'home'
    },
    {
      title : 'Rutas',
      url   : '/rutas',
      icon  : 'home'
    }
  ];

  /**
   * This method initializes the component
   * @param popoverController Controller for the popover
   * @param modalController Controller for the modal
   */
  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController) { }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }

  /**
   * Side menu for the admi view
   * @param ev event
   */
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopOverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        config: { color: 'customColor', menuItems: [
          {
            displayText: 'Productos',
            type: 'button',
            icon: 'desktop-outline',
            color: 'white',
            callback: (event: CustomEvent) => {
              this.presentProducts();
            }
          },
          {
            displayText: 'Rutas',
            type: 'button',
            icon: 'git-branch-outline',
            color: 'white',
            callback: (event: CustomEvent) => {
              this.presentRoutes();
            },
          },
          {
            displayText: 'Sucursales',
            type: 'button',
            icon: 'business-outline',
            color: 'white',
            callback: (event: CustomEvent) => {
              this.presentBranch();
            },
          },
          {
            displayText: 'Trabajadores',
            type: 'button',
            icon: 'people-circle-outline',
            color: 'white',
            callback: (event: CustomEvent) => {
              this.presentWorker();
            },
          },
          {
            displayText: 'Vendedores',
            type: 'button',
            icon: 'woman-outline',
            color: 'white',
            callback: (event: CustomEvent) => {
              this.presentSeller();
            },
          }
        ]
      }
      }
    });
    return await popover.present();
  }

  /**
   * Present the Products Component
   */
  async presentProducts() {
    const modal = await this.modalController.create({
      component: ProductosComponent,
      cssClass: 'modalClass',
      componentProps: {
        src: this.ProductData
      }
    });
    return await modal.present();
  }
  /**
   * Present the rutas Component
   */
  async presentRoutes() {
    const modal = await this.modalController.create({
      component: RutasComponent,
      cssClass: 'modalClass'
    });
    return await modal.present();
  }
  /**
   * Present the Branch Component
   */
  async presentBranch() {
    const modal = await this.modalController.create({
      component: SucursalesComponent,
      cssClass: 'modalClass',
      componentProps: {
        src: this.branchData
      }
    });
    return await modal.present();
  }

  /**
   * Present the worker Component
   */
  async presentWorker() {
    const modal = await this.modalController.create({
      component: TrabajadoresComponent,
      cssClass: 'modalClass'
    });
    return await modal.present();
  }
  /**
   * Present the seller Component
   */
  async presentSeller() {
    const modal = await this.modalController.create({
      component: VendedoresComponent,
      cssClass: 'modalClass'
    });
    return await modal.present();
  }
}

import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, Injector } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopOverComponent } from '../components/pop-over/pop-over.component';
import { ProductosComponent } from '../components/productos/productos.component';
import { RutasComponent } from '../components/rutas/rutas.component';
import { SucursalesComponent } from '../components/sucursales/sucursales.component';
import { TrabajadoresComponent } from '../components/trabajadores/trabajadores.component';
import { VendedoresComponent } from '../components/vendedores/vendedores.component';
import { ApiService } from '../services/api.service';
/**
 * Component
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
/**
 * Page that handle the administration page
 */
export class AdminPage implements OnInit {
  /**
   * Responsibilities of the admin
   */
  responsibilities: any = [
    {
      name: 'Productos',
      icon: 'cart',
      component: true
    },
    {
      name: 'Empleados',
      icon: 'people',
      component: true
    }
    ,
    {
      name: 'Rutas',
      icon: 'map',
      component: true
    }
    ,
    {
      name: 'Sucursales',
      icon: 'home',
      component: true
    }
    ,
    {
      name: 'Vendedores',
      icon: 'pricetag',
      component: true
    }
  ];
  /**
   * Input of the products
   */
  ProductData: any;
  /**
   * Test Data
   */
  branchData: any = [
    {
      title: 'Sucursales',
      url: '/sucursales',
      icon: 'home'
    },
    {
      title: 'Trabajadores',
      url: '/trabajadores',
      icon: 'home'
    },
    {
      title: 'Vendedores',
      url: '/vendedores',
      icon: 'home'
    },
    {
      title: 'Productos',
      url: '/productos',
      icon: 'home'
    },
    {
      title: 'Rutas',
      url: '/rutas',
      icon: 'home'
    }
  ];
  /**
   * This variable is used in order to get access to the dynamic component.
   */
  // tslint:disable-next-line: no-any
  instance: any;
  /**
   * Reference to the html element to inject the component.
   */
  @ViewChild('ComponentContainer', { read: ViewContainerRef, static: true }) responsibilityContainer: ViewContainerRef;
  /**
   * This method initializes the component
   * @param popoverController Controller for the popover
   * @param modalController Controller for the modal
   * @param cfr Controller for the component factory
   * @param injector Controller for the injections
   * @param entityService Controller for the API service
   */
  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private entityService: ApiService) {
    this.entityService.getProducts().subscribe(data => {
      this.ProductData = data;
      console.log(data);
    });
  }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }
  /**
   * Side menu for the admin view
   * @param ev event
   */
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopOverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        config: {
          color: 'customColor', menuItems: [
            {
              displayText: 'Productos',
              type: 'button',
              icon: 'desktop',
              color: 'white',
              callback: (event: CustomEvent) => {
                this.presentProducts();
              }
            },
            {
              displayText: 'Rutas',
              type: 'button',
              icon: 'git-branch',
              color: 'white',
              callback: (event: CustomEvent) => {
                this.presentRoutes();
              },
            },
            {
              displayText: 'Sucursales',
              type: 'button',
              icon: 'business',
              color: 'white',
              callback: (event: CustomEvent) => {
                this.presentBranch();
              },
            },
            {
              displayText: 'Trabajadores',
              type: 'button',
              icon: 'people-circle',
              color: 'white',
              callback: (event: CustomEvent) => {
                this.presentWorker();
              },
            },
            {
              displayText: 'Vendedores',
              type: 'button',
              icon: 'woman',
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
  /**
   * Create the component
   * @param name name of the component
   */
  async openComponent(name: string) {
    if (name === 'Productos') {
      // tslint:disable-next-line: no-shadowed-variable
      const { ProductosComponent } = await import('./../components/productos/productos.component');
      const questionFactory = this.cfr.resolveComponentFactory(ProductosComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      this.instance = instance;
      instance.data = this.ProductData;
    }
    else if (name === 'Empleados') {
      // tslint:disable-next-line: no-shadowed-variable
      const { TrabajadoresComponent } = await import('./../components/trabajadores/trabajadores.component');
      const questionFactory = this.cfr.resolveComponentFactory(TrabajadoresComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      this.instance = instance;
    }
    else if (name === 'Rutas') {
      // tslint:disable-next-line: no-shadowed-variable
      const { RutasComponent } = await import('./../components/rutas/rutas.component');
      const questionFactory = this.cfr.resolveComponentFactory(RutasComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      this.instance = instance;
    }
    else if (name === 'Sucursales') {
      // tslint:disable-next-line: no-shadowed-variable
      const { SucursalesComponent } = await import('./../components/sucursales/sucursales.component');
      const questionFactory = this.cfr.resolveComponentFactory(SucursalesComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      instance.data = this.branchData;
      this.instance = instance;
    }
    else if (name === 'Vendedores') {
      // tslint:disable-next-line: no-shadowed-variable
      const { VendedoresComponent } = await import('./../components/vendedores/vendedores.component');
      const questionFactory = this.cfr.resolveComponentFactory(VendedoresComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      this.instance = instance;
    }
  }
}

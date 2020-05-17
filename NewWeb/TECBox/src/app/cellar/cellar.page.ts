import { Component, OnInit, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaquetesComponent } from '../components/paquetes/paquetes.component';
import { TableComponent } from '../components/table/table.component';
/**
 * Component
 */
@Component({
  selector: 'app-cellar',
  templateUrl: './cellar.page.html',
  styleUrls: ['./cellar.page.scss'],
})
/**
 * Page for the cellar view
 */
export class CellarPage implements OnInit {

  /**
   * id for the table
   */
  idTracking: string = 'rastreo';
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
   * @param modalController Controller for the modal
   * @param cfr Controller for the component factoru
   * @param injector Controller for the injection
   */
  constructor(
    public modalController: ModalController,
    private cfr: ComponentFactoryResolver,
    private injector: Injector) { }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }
  /**
   * Create the component
   * @param name name of the component
   */
  async openComponent(name: string) {
    if (name === 'gestion') {
      // tslint:disable-next-line: no-shadowed-variable
      const { PaquetesComponent } = await import('./../components/paquetes/paquetes.component');
      const questionFactory = this.cfr.resolveComponentFactory(PaquetesComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      this.instance = instance;
    }
    else if (name === 'rastreo') {
      // tslint:disable-next-line: no-shadowed-variable
      const { TableComponent } = await import('./../components/table/table.component');
      const questionFactory = this.cfr.resolveComponentFactory(TableComponent);
      const { instance } = this.responsibilityContainer.createComponent(questionFactory, null, this.injector);
      this.instance = instance;
      instance.type = this.idTracking;
    }
  }

}

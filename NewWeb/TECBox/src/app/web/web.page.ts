import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ModalController } from '@ionic/angular';
import { RegisterComponent } from '../components/register/register.component';
import { IngresarComponent } from '../components/ingresar/ingresar.component';
import { ClientesComponent } from '../components/clientes/clientes.component';
import { HelpComponent } from '../components/help/help.component';
import { CarComponent } from '../components/car/car.component';
/**
 * Component
 */
@Component({
  selector: 'app-web',
  templateUrl: './web.page.html',
  styleUrls: ['./web.page.scss'],
})
/**
 * Page that handle the web window
 */
export class WebPage implements OnInit {
  /**
   * Boolean for the client is Log in
   */
  ClientUser: boolean = false;
  /**
   * Bolean for the Package
   */
  PaquetesEnable: boolean = false;
  /**
   * Input data for the articles component
   */
  inputArticle: any;
  /**
   * Input Data for the clients Component
   */
  inputClients: any;
  /**
   * user test
   */
  userTest: any[];
  /**
   * Variable of the object that wil be buy
   */
  inputCar: any;
  /**
   * Test data
   */
  // tslint:disable-next-line: max-line-length
  TestData: any = { name: 'Celular', description: 'Memoria para celular 16M', barCode: '7545', seller: 'Juan Barnes', price: 32, discount: false, taxes: true, image: 'https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593724/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_8_sbfegj.png' };
  /**
   * This method initializes the component
   * @param entityService Controller for the API service
   */
  constructor(
    private entityService: ApiService,
    public modalController: ModalController
  ) {
    this.inputArticle = this.entityService.getProductsTemporal();
  //   this.entityService.getProducts().subscribe(data => {
  //     this.inputArticle = data;
  //     console.log('Products', data);
  //   });
  //   this.entityService.getClientes().subscribe(data => {
  //     this.inputClients = data;
  //     console.log('Clients', data);
  //   });
  }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }
  /**
   * Enables the log in function
   */
  enableCliente(dataUser: any) {
    if (dataUser.answer){
      this.userTest = dataUser.message;
      this.ClientUser = true;
    }
  }
  /**
   * Enables the package function
   */
  enablePaquete() {
    this.PaquetesEnable = true;
  }
  /**
   * Call the modal for the login
   */
  async logIn(ev: Event){
    const modal = await this.modalController.create({
      component: RegisterComponent
    });
    return await modal.present();
  }
  /**
   * Call the modal for signUp
   */
  async SignUp(ev: Event){
    const modal = await this.modalController.create({
      component: IngresarComponent,
      componentProps: {
        src: this.entityService.getClientes(),
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.enableCliente(data.data.data)
    });
    return await modal.present();
  }
  /**
   * Call the modal for signUp
   */
  async MyAccount(ev: Event){
    const modal = await this.modalController.create({
      component: ClientesComponent
    });
    return await modal.present();
  }
  /**
   * callback of the component
   * @param ev event data
   */
  dataProduct(ev: any){
    console.log(ev);
    this.inputCar = ev;
  }
  /**
   * function to open the help modal
   * @param ev event click
   */
  async openHelp(ev: Event){
    const modal = await this.modalController.create({
      component: HelpComponent
    });
    return await modal.present();
  }
  /**
   * Function to open the car shopping modal
   * @param ev click event
   */
  async openCar(ev: Event){
    const modal = await this.modalController.create({
      component: CarComponent,
      componentProps: {
        products: this.inputCar
      }
    });
    return await modal.present();
  }
}

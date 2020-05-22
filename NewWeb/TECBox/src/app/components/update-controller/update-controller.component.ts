import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SellerService } from 'src/app/services/seller.service';
import { OfficeService } from 'src/app/services/office.service';
import { RouteService } from 'src/app/services/route.service';
import { PackageService } from 'src/app/services/package.service';
import { ClientService } from 'src/app/services/client.service';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Component
 */
@Component({
  selector: 'app-update-controller',
  templateUrl: './update-controller.component.html',
  styleUrls: ['./update-controller.component.scss'],
})
/**
 * Component for update data
 */
export class UpdateControllerComponent implements OnInit {
  /**
   * Data selected
   */
  selectData: any[] = [];
  /**
   * id passed
   */
  idPlace: any;
  /**
   * data selected
   */
  dataToUpdate: any[] = [];
  /**
   * json
   */
  jsonData = {}
  /**
   * Data original
   */
  dataOrigin = {}
  /**
   * disable the add data
   */
  disableButton: boolean = false;
  /**
   * Times the button update selected
   */
  buttonSelected: number = 0;
  /**
   * Input with the data
   */
  @Input() set data(value: any[]){
    this.selectData = value;
    console.log('editables inputs', this.selectData);
  };
  /**
   * Input of the origin json
   */
  @Input() set originJson(value: any){
    this.dataOrigin = value;
    console.log('original', this.selectData);
  };
  /**
   * Input of the id 
   */
  @Input() set place(value: any){
    this.idPlace = value;
    console.log('place where im', this.selectData);
  };
  /**
   * Constructor of the component
   */
  constructor(
    
    private toastController: ToastController, 
    private productService: ProductService,
    private employeeService: EmployeeService,
    private sellerService: SellerService,
    private routeService: RouteService,
    private officeService: OfficeService,
    private packageService: PackageService,
    private clientService: ClientService,
    public modalController: ModalController
  ) {

   }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}
  /**
   * Dismmiss the page
   */
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  /**
   * Update the data
   */
  updateData(data: string, controlador){
    console.log(data, controlador)
    this.jsonData[controlador] = data;
    console.log(this.jsonData);
    this.buttonSelected++;
    if( this.buttonSelected === this.selectData.length ){
      this.disableButton = true;
    }
  }
  /**
   * save all the information
   */
  save(event){
    console.log( this.jsonData);
    this.disableButton = false;
    if (this.idPlace === 'sucursal') {
      console.log(this.jsonData);
      console.log('data old', this.dataOrigin);
      this.dataOrigin['Name'] = this.jsonData['Name'];
      this.dataOrigin['Admin'] = this.jsonData['Admin'];
      this.dataOrigin['Phone'] = this.jsonData['Phone'];
      this.dataOrigin['Address']['Department'] = this.jsonData['Address.Department'];
      this.dataOrigin['Address']['City'] = this.jsonData['Address.City'];
      this.dataOrigin['Address']['District'] = this.jsonData['Address.District'];
      this.dataOrigin['Address']['Others'] = this.jsonData['Address.Others'];
      console.log('new data', this.dataOrigin);

      this.officeService.editOfficeData(this.dataOrigin['Id'],this.dataOrigin)
      .subscribe(
        data =>{
          this.presentToast("La sucursal se ha editado con éxito",'success');
       },
       (error: HttpErrorResponse) => {
         this.presentToast('Opps ¡Algo salió mal!', 'danger');
       }
      );

    } else if (this.idPlace === 'trabajadores') {
      console.log(this.jsonData);
      console.log('data old', this.dataOrigin);
      this.dataOrigin['Role'] = this.jsonData['Role'];
      this.dataOrigin['BranchOffice']['Name'] = this.jsonData['BranchOffice.Name'];
      this.dataOrigin['SalaryHour'] = this.jsonData['Salary.Hour'];
      console.log('new data', this.dataOrigin);
      this.employeeService.editEmployeeData(this.dataOrigin['Id']['Number'], this.dataOrigin).subscribe(
        data =>{
          this.presentToast("El trabajador se ha editado con éxito",'success');
        },
        (error: HttpErrorResponse) => {
          this.presentToast('Opps ¡Algo salió mal!', 'danger');
        }
      )

    } else if (this.idPlace === 'vendedores') {
      const seller = {
        "Name":this.jsonData["Name"],
        "Id":{
          "Type":this.jsonData["Id.Type"],
          "Number":this.jsonData["Id.Number"]
        }
      }
      this.sellerService.editSellerData(this.dataOrigin['Id']['Number'],seller)
      .subscribe(
        data =>{
          this.presentToast("El vendedor se ha editado con éxito",'success');
       },
       (error: HttpErrorResponse) => {
         this.presentToast('Opps ¡Algo salió mal!', 'danger');
       }
      );


    } else if (this.idPlace === 'producto') {
      console.log(this.jsonData);
      console.log('old data', this.dataOrigin);
      this.dataOrigin['Name'] = this.jsonData['Name'];
      this.dataOrigin['Description'] = this.jsonData['Description'];
      this.dataOrigin['BarCode'] = this.jsonData['BarCode'];
      this.dataOrigin['Seller']['Name'] = this.jsonData['Seller.Name'];
      this.dataOrigin['Price'] = this.jsonData['Price'];
      this.dataOrigin['Discount'] = this.jsonData['Discount'];
      this.dataOrigin['Taxes'] = this.jsonData['Taxes'];
      console.log('new data', this.dataOrigin);
      this.productService.editProductData(this.dataOrigin['BarCode'], this.dataOrigin).subscribe(
        data=>{
          this.presentToast("El producto se ha editado con éxito",'success');
        },
        (error: HttpErrorResponse) => {
          this.presentToast('Opps ¡Algo salió mal!', 'danger');
        }
      )
      

    } else if (this.idPlace === 'rutas') {
      console.log(this.jsonData['Districts']);
      this.routeService.addDistrict(this.jsonData['Id'],this.jsonData['Districts']).subscribe(
        data =>{
          this.presentToast("La ruta se ha editado con éxito",'success');
        },
        (error: HttpErrorResponse) => {
          this.presentToast('Opps ¡Algo salió mal!', 'danger');
        }
      )

    } else if (this.idPlace === 'paquetes') {
      console.log(this.jsonData);
      console.log('old data', this.dataOrigin);
      this.dataOrigin['DeliveryMan'] = this.jsonData['DeliveryMan'];
      this.dataOrigin['DmId'] = this.jsonData['DmId'];
      this.dataOrigin['Status'] = this.jsonData['Status'];
      console.log('new data', this.dataOrigin);
      this.packageService.editPackageData(this.dataOrigin['TrackId'], this.dataOrigin).subscribe(
        data =>{
          this.presentToast("El paquete se ha editado con éxito",'success');
        },
        (error: HttpErrorResponse) => {
          this.presentToast('Opps ¡Algo salió mal!', 'danger');
        }
      )


    } else if (this.idPlace === 'cliente') {
      console.log('old data', this.dataOrigin);
      this.dataOrigin['Username'] = this.jsonData['Username'];
      this.dataOrigin['Enail'] = this.jsonData['Enail'];
      this.dataOrigin['Phone'] = this.jsonData['Phone'];
      this.dataOrigin['Mobile'] = this.jsonData['Mobile'];
      console.log('new data', this.dataOrigin);
      this.clientService.editClientData(this.dataOrigin['Id']['Number'], this.dataOrigin).subscribe(
        data =>{
          this.presentToast("El cliente se ha editado con éxito",'success');
        },
        (error: HttpErrorResponse) => {
          this.presentToast('Opps ¡Algo salió mal!', 'danger');
        }
      )

    }
  }

  /**
   * Present toast
   */
  async presentToast(messageR: string, colorR: string) {
    const toast = await this.toastController.create({
      message: messageR,
      color: colorR,
      duration: 4000
    });
    toast.present();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SellerService } from 'src/app/services/seller.service';
import { RouteService } from 'src/app/services/route.service';
import { OfficeService } from 'src/app/services/office.service';
import { PackageService } from 'src/app/services/package.service';
import { ClientService } from 'src/app/services/client.service';
import { ModalController } from '@ionic/angular';
import { UpdateControllerComponent } from '../update-controller/update-controller.component';
/**
 * Component
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
/**
 * Component for the tables
 */
export class TableComponent implements OnInit {
  /**
   * data of the table
   */
  data: any[];
  /**
   * id for the table
   */
  id: string = 'sucursal';
  /**
   * Input for the data
   */
  @Input() set src(val: any) {
    this.data = val;
    console.log('data Table', this.data);
  }
  /**
   * Input for the type
   */
  @Input() set type(val: any) {
    this.id = val;
    console.log('data get', this.id);
  }
  /**
   * First Function to call in the page
   */
  constructor(
    private productService: ProductService,
    private employeeService: EmployeeService,
    private sellerService: SellerService,
    private routeService: RouteService,
    private officeService: OfficeService,
    private packageService: PackageService,
    private clientService: ClientService,
    public modalController: ModalController
  ) { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() { }

  delete(idE: string) {
    console.log('idComponent', this.id, 'id delte', idE);
    if (this.id === 'sucursal') {
      this.officeService.deleteOffice(idE).subscribe(); //id
    } else if (this.id === 'trabajadores') {
      this.employeeService.deleteEmployee(idE).subscribe(); // id
    } else if (this.id === 'vendedores') {
      this.sellerService.deleteSellerAccount(idE).subscribe(); // id
    } else if (this.id === 'producto') {
      this.productService.deleteProductAccount(idE).subscribe(); // BarCode
    } else if (this.id === 'rutas') {
      this.routeService.deleteRouteAccount(idE).subscribe(); // Id
    } else if (this.id === 'paquetes') {
      this.packageService.deletePackageAccount(idE).subscribe(); // trackId
    } else if (this.id === 'cliente') {
      this.clientService.deleteClientAccount(idE).subscribe(); // id number
    }
  }

  /**
   * Update the data in for the table in specific spaces
   */
  updateData(data: any) {
    console.log('idComponent', this.id, 'id update', data);
    let dataUpdate;
    if (this.id === 'sucursal') {
      console.log('sucursal');
      dataUpdate = [{
        title: 'Nombre',
        value: 'Name'
      },{
        title: 'Encargado',
        value: 'Admin'
      },{
        title: 'Telefono',
        value: 'Phone'
      },{
        title: 'Provincia',
        value: 'Address.Department'
      },{
        title: 'Canton',
        value: 'Address.City'
      },{
        title: 'Distrito',
        value: 'Address.District'
      },{
        title: 'Otras Señas',
        value: 'Address.Others'
      }]
      this.presentModal(dataUpdate);
      
    } else if (this.id === 'trabajadores') {
      console.log('trabajadores');
      dataUpdate = [{
        title: 'Rol',
        value: 'Role'
      },{
        title: 'Sucursal',
        value: 'BranchOffice.Name'
      },{
        title: 'Salario /hora',
        value: 'Salary.Hour'
      }]
      this.presentModal(dataUpdate);

    } else if (this.id === 'vendedores') {
      console.log('vendedores');
      dataUpdate = [{
        title: 'Nombre',
        value: 'Name'
      },{
        title: 'Tipo de cedula',
        value: 'Id.Type'
      },{
        title: 'Numero de cedula',
        value: 'Id.Number'
      }]
      this.presentModal(dataUpdate);

    } else if (this.id === 'producto') {
      console.log('producto');
      dataUpdate = [{
        title: 'Nombre',
        value: 'Name'
      },{
        title: 'Descripcion',
        value: 'Description'
      },{
        title: 'Codigo Barras',
        value: 'BarCode'
      },{
        title: 'Vendedor',
        value: 'Seller.Name'
      },{
        title: 'Precio',
        value: 'Price'
      },{
        title: 'Descuento',
        value: 'Discount'
      },{
        title: 'Impuesto',
        value: 'Taxes'
      }]
      this.presentModal(dataUpdate);

    } else if (this.id === 'rutas') {
      console.log('rutas');
      dataUpdate =[{
        title: 'Distrito',
        value: 'Districts'
      }]
      this.presentModal(dataUpdate);

    } else if (this.id === 'paquetes') {
      dataUpdate = [{
        title: 'Repartidor',
        value: 'DeliveryMan'
      },{
        title: 'Id Repartidor',
        value: 'DmId'
      },
      {
        title: 'Estado',
        value: 'Status'
      }]
      console.log('paquetes');
      this.presentModal(dataUpdate);

    } else if (this.id === 'cliente') {
      console.log('cliente');
      dataUpdate = [{
        title: 'Usuario',
        value: 'username'
      },{
        title: 'Correo',
        value: 'email'
      },{
        title: 'Telefono',
        value: 'Phone'
      },{
        title: 'Celular',
        value: 'Mobile'
      }]
      this.presentModal(dataUpdate);
    }
  }
  /**
   * Present the update Controller Component
   */
  async presentModal(Editdata: any) {
    const modal = await this.modalController.create({
      component: UpdateControllerComponent,
      componentProps: {
        data: Editdata,
        place: this.id
      }
    });
    return await modal.present();
  }

}

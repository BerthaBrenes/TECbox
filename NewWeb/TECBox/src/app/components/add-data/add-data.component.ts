import { RouteService } from './../../services/route.service';
import { OfficeService } from './../../services/office.service';
import { SellerService } from './../../services/seller.service';
import { EmployeeService } from './../../services/employee.service';
import { PackageService } from './../../services/package.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ubicaciones } from './../../../assets/data/ubication';
import { ToastController } from '@ionic/angular';

/**
 * Component
 */
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
/**
 * Component that handles the adding data
 */
export class AddDataComponent implements OnInit {
  /**
   * Data came from the component
   */
  data: any;
  /**
   * id of the father component
   */
  idEntity: string;
  /**
   * Providence of the country
   */
  provincias: any = [];
  /**
   * state of the providence
   */
  cantones: any;
  /**
   * District of the state
   */
  distritos: any;

  /**
   * District routes
   */
  distritosRutas: any = [];
  /**
   * Clients variable
   */
  clientes: Array<any>;
  /**
   * Data of the branch
   */
  sucursales:any = [];


  NameSucursale: any;
  EncargadoSucursales: any;
  phoneSucursales: any;
  ProvinciaSucursales: any;
  DistritoSucursales: any;
  CantonSucursales:any;
  OtrasSucursales:any;
  sucursalTrabajador: any;
  /**
   * Input of the src variable
   */
  @Input() set src(val: any) {
    this.data = val;
  }

  /**
   * Input for the type variable
   */
  @Input() set type(val: any) {
    this.idEntity = val;

  }


  /**
   * This method initializes the component
   * @param entityService Controller the api service
   */
  constructor(
    private toastController: ToastController, 
    private productService: ProductService,
    private packageService: PackageService,
    private employeeService: EmployeeService,
    private sellerService: SellerService,
    private officeService: OfficeService,
    private routeService: RouteService
    ) {

      this.officeService.getOfficesList()
      .subscribe(
        data =>{
          console.log('sucs',data);
          this.sucursales = data;
        }
      );
    }


  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
    this.provincias = ubicaciones.provincias;
    
  }
  

 

  /**
   * Looad District routes
   */
  cargarDistritosRuta() {
  }

  /**
   * Save a branch
   */
  async guardarSucursal(ev: any) {
    const office = await {
      "Name": this.NameSucursale,
      "Admin": this.EncargadoSucursales,
      "Phone": this.phoneSucursales,
      "Address": {
        "Department": this.ProvinciaSucursales,
        "City": this.CantonSucursales,
        "District": this.DistritoSucursales,
        "Others": this.OtrasSucursales
      }
    };
  
    this.officeService.addNewOffice(office).subscribe(
      data =>{
         this.presentToast("¡Una nueva sucursal Tecbox se ha creado!",'success');
      },
      (error: HttpErrorResponse) => {
        this.presentToast('¡Oops! No podemos crear esta sucursal. ¡Algo salió mal!', 'danger');
      }
    );
  }

  
  /**
   * Save the gowrker data
   * @param Nombre First Name
   * @param Apellido1 first last name
   * @param Apellido2 Second last name
   * @param Cedula Id
   * @param FechaN Date of deliveryn
   * @param FechaI Date of beggin
   * @param Sucursal Branch where the person work
   * @param SalarioH Salary per hour
   */
  guardarTrabajador(Nombre: any, Apellido1: any, Apellido2: any, Cedula: any, FechaN: any, FechaI: any, Sucursal:any, SalarioH: any, Contraseña: any,  Usuario: any, Rol: any) {
    
    const result = {
      "Username": `${Usuario}@tecbox.com`,
      "Password": Contraseña,
      "Name": `${Nombre} ${Apellido1} ${Apellido2}`,
      "Id": {
        "Type": "CF",
        "Number": Cedula
      },
      "Role": Rol,
      "BranchOffice": {"Name":Sucursal},
      "BirthDate": FechaN,
      "StartDate": FechaI,
      "SalaryHour": SalarioH
    };
    
    this.employeeService.addEmployee(result)
    .subscribe(
      data =>{
         this.presentToast("El empleado se ha añadido con éxito",'success');
      },
      (error: HttpErrorResponse) => {
        this.presentToast('¡El empleado no se ha agregado!\nEl empleado ya existe', 'danger');
      }
    );
  }


  /**
   * Save a seller
   */
  guardarVendedor(Nombre: any, TipoCedula: any, Cedula: any) {
    const seller = {
      "Name":Nombre,
      "Id":{
        "Type": TipoCedula,
        "Number": Cedula
      }
    }

    this.sellerService.registerSeller(seller)
    .subscribe(
      data =>{
         this.presentToast("El vendedor se ha añadido con éxito",'success');
      },
      (error: HttpErrorResponse) => {
        this.presentToast('¡El vendedor no se ha agregado!\nEl vendedor ya existe', 'danger');
      }
    );
  }

  
  /**
   * Save a product
   * @param Nombre Name of the product
   * @param Descripcion description of the product
   * @param CodigoBarras barscode of the product
   * @param Vendedor seller
   * @param PrecioCompra price of the product
   * @param Impuesto taxes of the product
   * @param Descuento discount of the product
   */
  guardarProducto(Nombre: any, Descripcion: any, CodigoBarras: any, Vendedor: any, PrecioCompra: any, Impuesto: any, Descuento: any,ImgUri: any) {
    const producto = {
      Name: Nombre,
      Description: Descripcion,
      BarCode: CodigoBarras,
      Seller: {Name:Vendedor},
      Price: PrecioCompra,
      Taxes: Impuesto,
      Discount: Descuento,
      ImageUrl: ImgUri
    };

    this.productService.addNewProduct(producto)
    .subscribe(
      data =>{
         console.log(data);
         this.presentToast("El producto se ha añadido con éxito",'success');
      },
      (error: HttpErrorResponse) => {
        this.presentToast('¡El producto no se ha agregado!\nEl producto ya existe o tiene información incompleta', 'danger');
      }
    );

  }

  /**
   * Load the states of a providence
   * @param ev providence
   */
  cargarCantones(ev: string) {
    for (const providence of this.provincias) {
      if (ev === providence.title) {
        this.cantones = providence.cantones;
        console.log('cantones', this.cantones);
        break;
      }
    }
  }

  /**
   * Load the district of a state
   * @param ev State
   */
  cargarDistritos(ev: string) {
    console.log(ev);
    for (const canton of this.cantones) {
      if (ev === canton.title) {
        this.distritos = canton.distritos;
        console.log('distritos', this.distritos);
        break;
      }
    }
  }

  /**
   * Get a client
   */
  getCliente() {
    this.data.getEmpleados().subscribe(datos => this.clientes = datos);
    console.log(this.clientes);
  }

  /**
   * Add a district
   * @param D District
   */
  addDistritoTemp(D: any) {
    this.distritosRutas.push(D);
    console.log(this.distritosRutas);
  }

  /**
   * 
   */
  guardarRuta(nombreRuta:any) {
    const route = {
      "Name": nombreRuta,
      "Districts": this.distritosRutas
    }

    console.log('Soy la ruta: ', route);
    
    this.routeService.addNewRoute(route)
    .subscribe(
      data =>{
         console.log(data);
         this.presentToast(`La ruta ${nombreRuta} se ha añadido con éxito`,'success');
      },
      (error: HttpErrorResponse) => {
        this.presentToast('¡La ruta no se ha agregado a la base de datos, ya existe o tiene información incompleta', 'danger');
      }
    );
  }
  
  /**
   * Save a package
   */
  guardarPaquete(TrackingID: any, Cliente: any, FechaLlegada: any, DescripciónValue: any) {
    console.log(TrackingID);
  }

  async presentToast(messageR: string, colorR: string) {
    const toast = await this.toastController.create({
      message: messageR,
      color: colorR,
      duration: 4000
    });
    toast.present();
  }

}

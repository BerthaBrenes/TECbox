import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { AddDataComponent } from './add-data/add-data.component';
import { TableComponent } from './table/table.component';
import { PopOverComponent } from './pop-over/pop-over.component';
import { ProductosComponent } from './productos/productos.component';
import { RutasComponent } from './rutas/rutas.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { RegisterComponent } from './register/register.component';
import { CarComponent } from './car/car.component';
import { HelpComponent } from './help/help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresarComponent } from './ingresar/ingresar.component';
import { UpdateControllerComponent } from './update-controller/update-controller.component';



@NgModule({
  declarations: [
    VendedoresComponent,
    TrabajadoresComponent,
    AddDataComponent,
    TableComponent,
    PopOverComponent,
    ProductosComponent,
    RutasComponent,
    SucursalesComponent,
    PaquetesComponent,
    ArticulosComponent,
    ClientesComponent,
    TrackingPageComponent,
    RegisterComponent,
    IngresarComponent,
    CarComponent,
    HelpComponent,
    UpdateControllerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    VendedoresComponent,
    TrabajadoresComponent,
    AddDataComponent,
    TableComponent,
    PopOverComponent,
    ProductosComponent,
    RutasComponent,
    SucursalesComponent,
    PaquetesComponent,
    ArticulosComponent,
    ClientesComponent,
    CarComponent,
    IngresarComponent,
    TrackingPageComponent,
    UpdateControllerComponent
  ]
})
export class ComponentsModule { }

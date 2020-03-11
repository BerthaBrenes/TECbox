import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { RastrePaquetesComponent } from './rastre-paquetes/rastre-paquetes.component';
import { ProductosComponent } from './productos/productos.component';
import { RutasComponent } from './rutas/rutas.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';



@NgModule({
  declarations: [
    ArticulosComponent,
    ClienteComponent,
    PaquetesComponent,
    RastrePaquetesComponent,
    ProductosComponent,
    RutasComponent,
    SucursalesComponent,
    TrabajadoresComponent,
    VendedoresComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    ArticulosComponent,
    ClienteComponent,
    PaquetesComponent,
    RastrePaquetesComponent,
    ProductosComponent,
    RutasComponent,
    SucursalesComponent,
    TrabajadoresComponent,
    VendedoresComponent]
})
export class PagesModule { }

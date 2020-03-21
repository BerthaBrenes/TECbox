import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TableComponent} from './components/table/table.component';
import {AddDataComponent} from './components/add-data/add-data.component';
import {ComponentsModule} from './components/components.module';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { RastrePaquetesComponent } from './pages/rastre-paquetes/rastre-paquetes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';
import { VendedoresComponent } from './pages/vendedores/vendedores.component';
import {PagesModule} from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    TableComponent,
    AddDataComponent,
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
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
  HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VendedoresComponent } from './pages/vendedores/vendedores.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { RastrePaquetesComponent } from './pages/rastre-paquetes/rastre-paquetes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {path: 'vendedores',component:VendedoresComponent},
  {path: 'trabajadores',component:TrabajadoresComponent},
  {path: 'sucursales',component:SucursalesComponent},
  {path: 'rutas',component:RutasComponent},
  {path: 'rastre',component:RastrePaquetesComponent},  
  {path: 'productos',component:ProductosComponent},
  {path: 'paquetes',component:PaquetesComponent},  
  {path: 'cliente',component:ClienteComponent},
  {path: 'articulos',component:ArticulosComponent}


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

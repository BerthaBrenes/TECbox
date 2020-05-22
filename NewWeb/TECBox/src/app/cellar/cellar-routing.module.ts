import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CellarPage } from './cellar.page';

const routes: Routes = [
  {
    path: '',
    component: CellarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CellarPageRoutingModule {}

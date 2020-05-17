import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopOverControllerPage } from './pop-over-controller.page';

const routes: Routes = [
  {
    path: '',
    component: PopOverControllerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopOverControllerPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebPage } from './web.page';

const routes: Routes = [
  {
    path: '',
    component: WebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPageRoutingModule {}

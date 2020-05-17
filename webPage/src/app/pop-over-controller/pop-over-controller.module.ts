import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopOverControllerPageRoutingModule } from './pop-over-controller-routing.module';

import { PopOverControllerPage } from './pop-over-controller.page';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopOverControllerPageRoutingModule,
    PagesModule
  ],
  declarations: [PopOverControllerPage],
  exports: [PopOverControllerPage],
  entryComponents: [PopOverControllerPage]
})
export class PopOverControllerPageModule {}

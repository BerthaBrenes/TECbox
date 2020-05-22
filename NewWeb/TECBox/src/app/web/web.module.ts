import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPageRoutingModule } from './web-routing.module';

import { WebPage } from './web.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WebPage]
})
export class WebPageModule {}

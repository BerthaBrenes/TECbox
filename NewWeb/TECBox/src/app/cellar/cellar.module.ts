import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CellarPageRoutingModule } from './cellar-routing.module';

import { CellarPage } from './cellar.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CellarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CellarPage]
})
export class CellarPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { ComponentsModule } from '../components/components.module';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PagesModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}

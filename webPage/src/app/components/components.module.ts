import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {TableComponent} from './table/table.component';
import {AddDataComponent} from './add-data/add-data.component';
import { SidemenucontrollerComponent } from './sidemenucontroller/sidemenucontroller.component';


@NgModule({
  declarations: [
    TableComponent,
    AddDataComponent,
    SidemenucontrollerComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    TableComponent,
    AddDataComponent,
    SidemenucontrollerComponent
  ],
  entryComponents: [
    TableComponent,
    AddDataComponent,
    SidemenucontrollerComponent
  ],
})
export class ComponentsModule { }

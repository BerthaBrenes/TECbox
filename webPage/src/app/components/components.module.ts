import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {TableComponent} from './table/table.component';
import {AddDataComponent} from './add-data/add-data.component';


@NgModule({
  declarations: [TableComponent,AddDataComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TableComponent,AddDataComponent]
})
export class ComponentsModule { }

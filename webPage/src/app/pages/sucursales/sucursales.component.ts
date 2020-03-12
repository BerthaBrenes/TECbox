import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
})
export class SucursalesComponent implements OnInit {
  data:any;
  enterEnable:boolean=false;
  constructor() { }

  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }
  ngOnInit() {}

  clickEnter(){
    this.enterEnable=true;
  }

}

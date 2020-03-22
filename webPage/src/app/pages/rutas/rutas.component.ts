import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss'],
})
export class RutasComponent implements OnInit {
  enterEnable:boolean=false;
  data:any;
  id:string = 'ruta';
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

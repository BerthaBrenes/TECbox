import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  data:any;
  id:string='paquetes';
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

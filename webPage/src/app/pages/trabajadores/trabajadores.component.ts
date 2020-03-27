import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss'],
})
export class TrabajadoresComponent implements OnInit {
  enterEnable:boolean=false;
  id:string='trabajadores';
  data:any;
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

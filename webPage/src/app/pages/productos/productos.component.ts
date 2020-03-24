import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  enterEnable:boolean=false;
  id:string='producto';
  data:any;
  id:string = 'producto';
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

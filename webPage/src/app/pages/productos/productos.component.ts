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
  constructor() { }
  @Input() set src(val:any){
    this.data = val;
    console.log('product data',this.data)
  }
  ngOnInit() {}

  clickEnter(){
    this.enterEnable=true;
  }

}

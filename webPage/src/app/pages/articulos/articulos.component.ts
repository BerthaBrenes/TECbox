import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit {
  data:any=[{"name":"MemoriaSD","description":"Memoria para celular 16M","barCode":"2345","seller":"Juan Barnes","price":32,"discount":false,"taxes":true,"image":"https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593724/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_8_sbfegj.png"},{"name":"Microfono","description":"Microfono 8mg","barCode":"2387","seller":"Juan Barnes","price":80,"discount":true,"taxes":true,"image":"https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593723/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_3_mwd9bm.png"},{"name":"Microfono","description":"Microfono 8mg","barCode":"1381","seller":"Juan Barnes","price":80,"discount":true,"taxes":true,"image":"https://res.cloudinary.com/tecbases01bbb/image/upload/v1584593723/Screenshot_2020-03-18_International_Shopping_Shop_Computers_that_Ship_Internationally_2_gwbmkf.png"}];
  constructor() { }

  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }
  ngOnInit() {}


}

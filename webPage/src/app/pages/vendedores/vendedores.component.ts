import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss'],
})
export class VendedoresComponent implements OnInit {
  enterEnable:boolean=false;
  id:string='vendedores';
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

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
data:any;
  constructor() { }

  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }
  ngOnInit() {}

}

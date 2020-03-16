import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rastre-paquetes',
  templateUrl: './rastre-paquetes.component.html',
  styleUrls: ['./rastre-paquetes.component.scss'],
})
export class RastrePaquetesComponent implements OnInit {
  data:any;
  id:string='rastreo';
  constructor() { }
  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }

  ngOnInit() {}

}

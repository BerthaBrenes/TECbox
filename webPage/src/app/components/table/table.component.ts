import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  data:any;
  constructor() { }
  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }
  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
/**
 * Component for the tables
 */
export class TableComponent implements OnInit {
/**
 * data of the table
 */
  data: any;
  /**
   * id for the table
   */
  id: string = 'sucursal';
  /**
   * test data
   */
  prueba: any[] = [
    {
      Name: 'Juan',
      LastName: 'Barnes',
      IdCard: '2345',
      Email: 'my@mail.com',
      Locker: 32,
      Cellphone: '8222-2222',
      Phone: '2222-2222',
      Province: 'Alajuela',
      City: 'Alajuela',
      District: 'La Agonía'
    },
    {
      Name: 'Carlos',
      LastName: 'Vargas',
      IdCard: '2554',
      Email: 'myC@mail.com',
      Locker: 33,
      Cellphone: '8333-2222',
      Phone: '2333-2222',
      Province: 'San José',
      City: 'Desamparados',
      District: 'Gravilias'
    },
    {
      Name: 'Juan',
      LastName: 'Monge',
      IdCard: '2014108336',
      Email: 'es_fg1989@gmail.com',
      Locker: 789,
      Cellphone: '(+506) 9059-7161',
      Phone: '(+506) 2341-7456',
      Province: 'Alajuela',
      City: 'Alajuela',
      District: 'La Agonía'
    }
  ];
  /**
   * Input for the data
   */
  @Input() set src(val: any){
    this.data = val;
    console.log('data Table', this.data);
  }
  /**
   * Input for the type
   */
  @Input() set type(val: any){
    this.id = val;
    console.log('data', this.id);
  }
  /**
   * First Function to call in the page
   */
  constructor() { }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}

}

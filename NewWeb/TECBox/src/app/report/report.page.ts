import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ApiService } from '../services/api/api.service';
/**
 * Component
 */
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
/**
 * Page handles the report page
 */
export class ReportPage implements OnInit {
  /**
   * Data of the component
   */
  data: any;
  /**
   * Report one for the best seller
   */
  reporte1: Array<any>;
  /**
   * Report for the ready to send
   */
  reporte2: Array<any>;
  /**
   * Report for the product in home
   */
  reporte3: Array<any>;
  /**
   * First Function to call in the page
   * @param instanceApi Controller for the api service
   */
  constructor(
    private instanceApi: ApiService
  ) {
    const reports = this.instanceApi.getReport();
    this.reporte1 = reports?.report1;
    this.reporte2 = reports?.report2;
    this.reporte3 = reports?.report3;
  }
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {
  }
  /**
   * Generate the first report
   */
  generarReporte1(){
    const pdf = new jsPDF();
    pdf.setFontStyle('times');
    pdf.setFontSize(30);
    pdf.text(80, 20, 'TecBox');
    pdf.text(35 , 30, 'Reporte de productos más vendidos');
    const data = [];
    const columns = ['Código de Barras', 'Nombre', 'Cantidad'];

    // tslint:disable-next-line: prefer-for-of
    for  (let x = 0; x < this.reporte1.length; x++){
        console.log(this.reporte1[x]);
        const temp = [];
        temp.push(this.reporte1[x]['BarCode']);
        temp.push(this.reporte1[x]['Name']);
        temp.push(this.reporte1[x]['Qty']);
        data.push(temp);
    }
    pdf.autoTable(columns, data, { margin: { top: 50 }, theme : 'grid'});
    pdf.save('Productos más vendidos.pdf');
    }
    /**
     * Generate second report
     */
    generarReporte2(){
      const pdf = new jsPDF();
      pdf.setFontStyle('times');
      pdf.setFontSize(30);
      pdf.text(80, 20, 'TecBox');
      pdf.text(40 , 30, 'Productos listos para entregar');
      const data = [];
      const columns = ['TrackingId', 'Cliente', 'Descripción', 'IdRuta', 'Repartidor', 'IdRepartidor', 'Estado', 'Fecha de Entrega'];
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.reporte2.length; x++){
          console.log(this.reporte2[x]);
          const temp = [];
          temp.push(this.reporte2[x]['TrackId']);
          temp.push(this.reporte2[x]['Client']);
          temp.push(this.reporte2[x]['Description']);
          temp.push(this.reporte2[x]['RouteId']);
          temp.push(this.reporte2[x]['DeliveryMan']);
          temp.push(this.reporte2[x]['DmId']);
          temp.push(this.reporte2[x]['Status']);
          temp.push(this.reporte2[x]['DeliveryDate']);
          data.push(temp);
      }
      pdf.autoTable(columns, data, { margin: { top: 100 }, theme : 'grid'});
      pdf.save('Productos Entregados.pdf');
    }
    /**
     * Generate third report
     */
    generarReporte3(){
      const pdf = new jsPDF();
      pdf.setFontStyle('times');
      pdf.setFontSize(30);
      pdf.text(80, 20, 'TecBox');
      pdf.text(60 , 30, 'Productos entregados');
      const data = [];
      const columns = ['Repartidor', 'TrackingId', 'Cliente', 'Descripción', 'IdRuta', 'IdRepartidor', 'Estado', 'Fecha de Entrega'];
      for (let x = 0; x <= this.reporte3.length; x++){
        const temp2 = [];
        console.log(this.reporte3[0]['1']);
        temp2.push(this.reporte3[0]['' + x][0]['DeliveryMan']);
        data.push(temp2);
        // tslint:disable-next-line: prefer-for-of
        for (let y = 0; y < this.reporte3[0]['' + x].length; y++){
          const temp1 = [];
          temp1.push('');
          temp1.push(this.reporte3[0]['' + x][y]['TrackId']);
          temp1.push(this.reporte3[0]['' + x][y]['Client']);
          temp1.push(this.reporte3[0]['' + x][y]['Description']);
          temp1.push(this.reporte3[0]['' + x][y]['RouteId']);
          temp1.push(this.reporte3[0]['' + x][y]['DmId']);
          temp1.push(this.reporte3[0]['' + x][y]['Status']);
          temp1.push(this.reporte3[0]['' + x][y]['DeliveryDate']);
          data.push(temp1);
        }
      }
      pdf.autoTable(columns, data, { margin: { top: 50 }, theme : 'grid'});
      pdf.save('Productos Entregados.pdf');
    }
}

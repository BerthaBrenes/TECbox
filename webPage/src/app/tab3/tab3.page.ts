import { Component, Input } from '@angular/core';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data:any;

  reporte1:Array<any>;
  reporte2:Array<any>;
  reporte3:Array<any>;

  constructor() {}
  
    generarReporte1(){
    var pdf = new jsPDF();

    pdf.setFontStyle("times");
    pdf.setFontSize(30);
    pdf.text(80,20,"TecBox");
    pdf.text(35 ,30,"Reporte de productos más vendidos");
   
    var data = [];
    var columns = ["Código de Barras", "Nombre", "Cantidad"];

    for(var x = 0; x < this.reporte1.length; x++){
        console.log(this.reporte1[x]);
        var temp = [];
        temp.push(this.reporte1[x]["BarCode"]);
        temp.push(this.reporte1[x]["Name"]);
        temp.push(this.reporte1[x]["Qty"]);
        data.push(temp);
    }
    pdf.autoTable(columns,data, { margin:{ top: 50 }, theme : 'grid'});
    pdf.save('Productos más vendidos.pdf');
     
    }    

    generarReporte2(){

      var pdf = new jsPDF();

      pdf.setFontStyle("times");
      pdf.setFontSize(30);
      pdf.text(80,20,"TecBox");
      pdf.text(40 ,30,"Productos listos para entregar");
     
      var data = [];
      var columns = ["TrackingId", "Cliente", "Descripción", "IdRuta", "Repartidor", "IdRepartidor", "Estado","Fecha de Entrega"];
  
      for(var x = 0; x < this.reporte2.length; x++){
          console.log(this.reporte2[x]);
          var temp = [];
          temp.push(this.reporte2[x]["TrackId"]);
          temp.push(this.reporte2[x]["Client"]);
          temp.push(this.reporte2[x]["Description"]);
          temp.push(this.reporte2[x]["RouteId"]);
          temp.push(this.reporte2[x]["DeliveryMan"]);
          temp.push(this.reporte2[x]["DmId"]);
          temp.push(this.reporte2[x]["Status"]);
          temp.push(this.reporte2[x]["DeliveryDate"]);
          data.push(temp);
      }
      pdf.autoTable(columns,data, { margin:{ top: 100 }, theme : 'grid'});
      pdf.save('Productos Entregados.pdf');

    }

    generarReporte3(){
      var pdf = new jsPDF();

      pdf.setFontStyle("times");
      pdf.setFontSize(30);
      pdf.text(80,20,"TecBox");
      pdf.text(60 ,30,"Productos entregados");
     
      var data = [];
      var columns = ["Repartidor", "TrackingId", "Cliente", "Descripción", "IdRuta", "IdRepartidor", "Estado","Fecha de Entrega"];

      for(var x = 0; x <= this.reporte3.length; x++){
 
        var temp2 = [];
        console.log(this.reporte3[0]["1"]);
        temp2.push(this.reporte3[0][""+x][0]["DeliveryMan"]);
        data.push(temp2);
        for(var y = 0; y < this.reporte3[0][""+x].length; y++){
          var temp1 = [];
          temp1.push("");
          temp1.push(this.reporte3[0][""+x][y]["TrackId"]);
          temp1.push(this.reporte3[0][""+x][y]["Client"]);
          temp1.push(this.reporte3[0][""+x][y]["Description"]);
          temp1.push(this.reporte3[0][""+x][y]["RouteId"]);
          temp1.push(this.reporte3[0][""+x][y]["DmId"]);
          temp1.push(this.reporte3[0][""+x][y]["Status"]);
          temp1.push(this.reporte3[0][""+x][y]["DeliveryDate"]);
          data.push(temp1);
        }
        
      }
        pdf.autoTable(columns,data, { margin:{ top: 50 }, theme : 'grid'});
        pdf.save('Productos Entregados.pdf');
    }

  
}

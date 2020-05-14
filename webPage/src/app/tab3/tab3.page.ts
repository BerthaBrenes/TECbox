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
  constructor() {}
  
  generarReporte1(){
    var pdf = new jsPDF();

    pdf.setFontStyle("times");
    pdf.setFontSize(30);
    pdf.text(75,20,"TEConstruye");
    pdf.text(67 ,30,"Reporte de Gastos");
   
    var data = [];
    var datagastos = [];
    var columns = ["Semana", "Proyecto","Etapa","Gasto"];
    pdf.save("reporte");
  }

}

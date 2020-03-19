import { Component, OnInit, Input } from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  data:any;
  idEntity:string = "trabajador";
  ubicaciones:any = {"title":"Costa Rica","provincias":[{"title":"San José","cantones":[{"title":"San José","distritos":[{"title":"Carmen"},{"title":"Merced"},{"title":"Hospital"},{"title":"Catedral"},{"title":"Zapote"},{"title":"San Fco. de Dos Ríos"},{"title":"Uruca"},{"title":"Mata Redonda"},{"title":"Pavas"},{"title":"Hatillo"},{"title":"San Sebastián"}]},{"title":"Escazú","distritos":[{"title":"Escazú"},{"title":"San Antonio"},{"title":"San Rafael"}]},{"title":"Desamparados","distritos":[{"title":"Desamparados"},{"title":"San Miguel"},{"title":"San Juan de Dios"},{"title":"San Rafael Arriba"},{"title":"San Antonio"},{"title":"Frailes"},{"title":"Patarrá"},{"title":"San Cristóbal"},{"title":"Rosario"},{"title":"Damas"},{"title":"San Rafael Abajo"},{"title":"Gravilias"},{"title":"Los Guido"}]},{"title":"Puriscal","distritos":[{"title":"Santiago"},{"title":"Mercedes Sur"},{"title":"Barbacoas"},{"title":"Grifo Alto"},{"title":"San Rafael"},{"title":"Candelaria"},{"title":"Desamparaditos"},{"title":"San Antonio"},{"title":"Chires"}]},{"title":"Tarrazú","distritos":[{"title":"San Marcos"},{"title":"San Lorenzo"},{"title":"San Carlos"}]},{"title":"Aserrí","distritos":[{"title":"Aserrí"},{"title":"Tarbaca"},{"title":"Vuelta de Jorco"},{"title":"San Gabriel"},{"title":"La Legua"},{"title":"Monterrey"},{"title":"Salitrillos"}]},{"title":"Mora","distritos":[{"title":"Colón"},{"title":"Guayabo"},{"title":"Tabarcia"},{"title":"Piedras Negras"},{"title":"Picagres"},{"title":"Caris"},{"title":"Quitirrisí"}]},{"title":"Goicoechea","distritos":[{"title":"Guadalupe"},{"title":"San Francisco"},{"title":"Calle Blancos"},{"title":"Mata de Plátano"},{"title":"Ipís"},{"title":"Rancho Redondo"},{"title":"Purral"}]},{"title":"Santa Ana","distritos":[{"title":"Santa Ana"},{"title":"Salitral"},{"title":"Pozos"},{"title":"Uruca"},{"title":"Piedades"},{"title":"Brasil"}]},{"title":"Alajuelita","distritos":[{"title":"Alajuelita"},{"title":"San Josecito"},{"title":"San Antonio"},{"title":"Concepción"},{"title":"San Felipe"}]},{"title":"Coronado","distritos":[{"title":"San Isidro"},{"title":"San Rafael"},{"title":"Dulce Nombre de Jesús"},{"title":"Patalillo"},{"title":"Cascajal"}]},{"title":"Acosta","distritos":[{"title":"San Ignacio"},{"title":"Guaitil"},{"title":"Palmichal"},{"title":"Cangrejal"},{"title":"Sabanillas"}]},{"title":"Tibás","distritos":[{"title":"San Juan"},{"title":"Cinco Esquinas"},{"title":"Anselmo Llorente"},{"title":"León XIII"},{"title":"Colima"}]},{"title":"Moravia","distritos":[{"title":"San Vicente"},{"title":"San Jerónimo"},{"title":"Trinidad"}]},{"title":"Montes de Oca","distritos":[{"title":"San Pedro"},{"title":"Sabanilla"},{"title":"Mercedes"},{"title":"San Rafael"}]},{"title":"Turrubares","distritos":[{"title":"San Pablo"},{"title":"San Pedro"},{"title":"San Juan de Mata"},{"title":"San Luis"},{"title":"Cárara"}]},{"title":"Dota","distritos":[{"title":"Santa María"},{"title":"Jardín"},{"title":"Copey"}]},{"title":"Curridabat","distritos":[{"title":"Curridabat"},{"title":"Granadilla"},{"title":"Sánchez"},{"title":"Tirrases"}]},{"title":"Perez Zeledón","distritos":[{"title":"San Isidro de el General"},{"title":"General"},{"title":"Daniel Flores"},{"title":"Rivas"},{"title":"San Pedro"},{"title":"Platanares"},{"title":"Pejibaye"},{"title":"Cajón"},{"title":"Barú"},{"title":"Río Nuevo"},{"title":"Páramo"},{"title":"La Amistad"}]},{"title":"León Cortés","distritos":[{"title":"San Pablo"},{"title":"San Andrés"},{"title":"Llano Bonito"},{"title":"San Isidro"},{"title":"Santa Cruz"},{"title":"San Antonio"}]}]},{"title":"Alajuela","cantones":[{"title":"Alajuela","distritos":[{"title":"Alajuela"},{"title":"San José"},{"title":"Carrizal"},{"title":"San Antonio"},{"title":"Guácima"},{"title":"San Isidro"},{"title":"Sabanilla"},{"title":"San Rafael"},{"title":"Río Segundo"},{"title":"Desamparados"},{"title":"Turrucares"},{"title":"Tambor"},{"title":"La Garita"},{"title":"Sarapiquí"}]},{"title":"San Ramón","distritos":[{"title":"San Ramón"},{"title":"Santiago"},{"title":"San Juan"},{"title":"Piedades Norte"},{"title":"Piedades Sur"},{"title":"San Rafael"},{"title":"San Isidro"},{"title":"Angeles"},{"title":"Alfaro"},{"title":"Volio"},{"title":"Concepción"},{"title":"Zapotal"},{"title":"San Isidro de Peñas Blancas"},{"title":"San Lorenzo"}]},{"title":"Grecia","distritos":[{"title":"Grecia"},{"title":"San Isidro"},{"title":"San José"},{"title":"San Roque"},{"title":"Tacares"},{"title":"Puente Piedra"},{"title":"Bolívar"}]},{"title":"San Mateo","distritos":[{"title":"San Mateo"},{"title":"Desmonte"},{"title":"Jesús María"},{"title":"Labrador"}]},{"title":"Atenas","distritos":[{"title":"Atenas"},{"title":"Jesús"},{"title":"Mercedes"},{"title":"San Isidro"},{"title":"Concepción"},{"title":"San José"},{"title":"Santa Eulalia"},{"title":"Escobal"}]},{"title":"Naranjo","distritos":[{"title":"Naranjo"},{"title":"San Miguel"},{"title":"San José"},{"title":"Cirrí Sur"},{"title":"San Jerónimo"},{"title":"San Juan"},{"title":"Rosario"},{"title":"Palmitos"}]},{"title":"Palmares","distritos":[{"title":"Palmares"},{"title":"Zaragoza"},{"title":"Buenos Aires"},{"title":"Santiago"},{"title":"Candelaria"},{"title":"Esquipulas"},{"title":"La Granja"}]},{"title":"Poas","distritos":[{"title":"San Pedro"},{"title":"San Juan"},{"title":"San Rafael"},{"title":"Carrillos"},{"title":"Sabana Redonda"}]},{"title":"Orotina","distritos":[{"title":"Orotina"},{"title":"Mastate"},{"title":"Hacienda Vieja"},{"title":"Coyolar"},{"title":"Ceiba"}]},{"title":"San Carlos","distritos":[{"title":"Quesada"},{"title":"Florencia"},{"title":"Buenavista"},{"title":"Aguas Zarcas"},{"title":"Venecia"},{"title":"Pital"},{"title":"Fortuna"},{"title":"Tigra"},{"title":"Palmera"},{"title":"Venado"},{"title":"Cutris"},{"title":"Monterrey"},{"title":"Pocosol"}]},{"title":"Zarcero","distritos":[{"title":"Zarcero"},{"title":"Laguna"},{"title":"Tapezco"},{"title":"Guadalupe"},{"title":"Palmira"},{"title":"Zapote"},{"title":"Las Brisas"}]},{"title":"Valverde Vega","distritos":[{"title":"Sarchí Norte"},{"title":"Sarchí Sur"},{"title":"Toro Amarillo"},{"title":"San Pedro"},{"title":"Rodríguez"}]},{"title":"Upala","distritos":[{"title":"Upala"},{"title":"Aguas Claras"},{"title":"San José"},{"title":"Bijagua"},{"title":"Delicias"},{"title":"Dos Ríos"},{"title":"Yolillal"},{"title":"Canalete"}]},{"title":"Los Chiles","distritos":[{"title":"Los Chiles"},{"title":"Caño Negro"},{"title":"Amparo"},{"title":"San Jorge"}]},{"title":"Guatuso","distritos":[{"title":"San Rafael"},{"title":"Buenavista"},{"title":"Cote"},{"title":"Katira"}]},{"title":"Río Cuarto","distritos":[{"title":"Río Cuarto"},{"title":"Santa Isabel"},{"title":"Santa Rita"}]}]},{"title":"Cartago","cantones":[{"title":"Cartago","distritos":[{"title":"Oriental"},{"title":"Occidental"},{"title":"Carmen"},{"title":"San Nicolás"},{"title":"Aguacaliente"},{"title":"Guadalupe"},{"title":"Corralillo"},{"title":"Tierra Blanca"},{"title":"Dulce Nombre"},{"title":"Llano Grande"},{"title":"Quebradilla"}]},{"title":"Paraíso","distritos":[{"title":"Paraíso"},{"title":"Santiago"},{"title":"Orosi"},{"title":"Cachí"},{"title":"Los Llanos de Santa Lucía"}]},{"title":"La Unión","distritos":[{"title":"Tres Ríos"},{"title":"San Diego"},{"title":"San Juan"},{"title":"San Rafael"},{"title":"Concepción"},{"title":"Dulce Nombre"},{"title":"San Ramón"},{"title":"Río Azul"}]},{"title":"Jiménez","distritos":[{"title":"Juan Viñas"},{"title":"Tucurrique"},{"title":"Pejibaye"}]},{"title":"Turrialba","distritos":[{"title":"Turrialba"},{"title":"La Suiza"},{"title":"Peralta"},{"title":"Santa Cruz"},{"title":"Santa Teresita"},{"title":"Pavones"},{"title":"Tuis"},{"title":"Tayutic"},{"title":"Santa Rosa"},{"title":"Tres Equis"},{"title":"La Isabel"},{"title":"Chirripó"}]},{"title":"Alvarado","distritos":[{"title":"Pacayas"},{"title":"Cervantes"},{"title":"Capellades"}]},{"title":"Oreamuno","distritos":[{"title":"San Rafael"},{"title":"Cot"},{"title":"Potrero Cerrado"},{"title":"Cipreses"},{"title":"Santa Rosa"}]},{"title":"El Guarco","distritos":[{"title":"El Tejar"},{"title":"San Isidro"},{"title":"Tobosi"},{"title":"Patio de Agua"}]}]},{"title":"Heredia","cantones":[{"title":"Heredia","distritos":[{"title":"Heredia"},{"title":"Mercedes"},{"title":"San Francisco"},{"title":"Ulloa"},{"title":"Varablanca"}]},{"title":"Barva","distritos":[{"title":"Barva"},{"title":"San Pedro"},{"title":"San Pablo"},{"title":"San Roque"},{"title":"Santa Lucía"},{"title":"San José de la Montaña"}]},{"title":"Santo Domingo","distritos":[{"title":"Santo Domingo"},{"title":"San Vicente"},{"title":"San Miguel"},{"title":"Paracito"},{"title":"Santo Tomás"},{"title":"Santa Rosa"},{"title":"Tures"},{"title":"Pará"}]},{"title":"Santa Bárbara","distritos":[{"title":"Santa Bárbara"},{"title":"San Pedro"},{"title":"San Juan"},{"title":"Jesús"},{"title":"Santo Domingo del Roble"},{"title":"Puraba"}]},{"title":"San Rafael","distritos":[{"title":"San Rafael"},{"title":"San Josecito"},{"title":"Santiago"},{"title":"Angeles"},{"title":"Concepción"}]},{"title":"San Isidro","distritos":[{"title":"San Isidro"},{"title":"San José"},{"title":"Concepción"},{"title":"San Francisco"}]},{"title":"Belén","distritos":[{"title":"San Antonio"},{"title":"La Ribera"},{"title":"Asunción"}]},{"title":"Flores","distritos":[{"title":"San Joaquín"},{"title":"Barrantes"},{"title":"Llorente"}]},{"title":"San Pablo","distritos":[{"title":"San Pablo"},{"title":"Rincón de Sabanilla"}]},{"title":"Sarapiquí","distritos":[{"title":"Puerto Viejo"},{"title":"La Virgen"},{"title":"Horquetas"},{"title":"Llanuras de Gaspar"},{"title":"Cureña"}]}]},{"title":"Guanacaste","cantones":[{"title":"Liberia","distritos":[{"title":"Liberia"},{"title":"Cañas Dulces"},{"title":"Mayorga"},{"title":"Nacascolo"},{"title":"Curubande"}]},{"title":"Nicoya","distritos":[{"title":"Nicoya"},{"title":"Mansión"},{"title":"San Antonio"},{"title":"Quebrada Honda"},{"title":"Sámara"},{"title":"Nósara"},{"title":"Belén de Nosarita"}]},{"title":"Santa Cruz","distritos":[{"title":"Santa Cruz"},{"title":"Bolsón"},{"title":"Veintisiete de Abril"},{"title":"Tempate"},{"title":"Cartagena"},{"title":"Cuajiniquil"},{"title":"Diriá"},{"title":"Cabo Velas"},{"title":"Tamarindo"}]},{"title":"Bagaces","distritos":[{"title":"Bagaces"},{"title":"Fortuna"},{"title":"Mogote"},{"title":"Río Naranjo"}]},{"title":"Carrillo","distritos":[{"title":"Filadelfia"},{"title":"Palmira"},{"title":"Sardinal"},{"title":"Belén"}]},{"title":"Cañas","distritos":[{"title":"Cañas"},{"title":"Palmira"},{"title":"San Miguel"},{"title":"Bebedero"},{"title":"Porozal"}]},{"title":"Abangares","distritos":[{"title":"Juntas"},{"title":"Sierra"},{"title":"San Juan"},{"title":"Colorado"}]},{"title":"Tilarán","distritos":[{"title":"Tilarán"},{"title":"Quebrada Grande"},{"title":"Tronadora"},{"title":"Santa Rosa"},{"title":"Líbano"},{"title":"Tierras Morenas"},{"title":"Arenal"}]},{"title":"Nandayure","distritos":[{"title":"Carmona"},{"title":"Santa Rita"},{"title":"Zapotal"},{"title":"San Pablo"},{"title":"Porvenir"},{"title":"Bejuco"}]},{"title":"La Cruz","distritos":[{"title":"La Cruz"},{"title":"Santa Cecilia"},{"title":"Garita"},{"title":"Santa Elena"}]},{"title":"Hojancha","distritos":[{"title":"Hojancha"},{"title":"Monte Romo"},{"title":"Puerto Carrillo"},{"title":"Huacas"}]}]},{"title":"Puntarenas","cantones":[{"title":"Puntarenas","distritos":[{"title":"Puntarenas"},{"title":"Pitahaya"},{"title":"Chomes"},{"title":"Lepanto"},{"title":"Paquera"},{"title":"Manzanillo"},{"title":"Guacimal"},{"title":"Barranca"},{"title":"Monte Verde"},{"title":"Isla del Coco"},{"title":"Cóbano"},{"title":"Chacarita"},{"title":"Chira"},{"title":"Acapulco"},{"title":"Roble"},{"title":"Arancibia"}]},{"title":"Esparza","distritos":[{"title":"Espíritu Santo"},{"title":"San Juan Grande"},{"title":"Macacona"},{"title":"San Rafael"},{"title":"San Jerónimo"},{"title":"Caldera"}]},{"title":"Buenos Aires","distritos":[{"title":"Buenos Aires"},{"title":"Volcán"},{"title":"Potrero Grande"},{"title":"Boruca"},{"title":"Pilas"},{"title":"Colinas"},{"title":"Chánguena"},{"title":"Bioley"},{"title":"Brunka"}]},{"title":"Montes de Oro","distritos":[{"title":"Miramar"},{"title":"Unión"},{"title":"San Isidro"}]},{"title":"Osa","distritos":[{"title":"Puerto Cortés"},{"title":"Palmar"},{"title":"Sierpe"},{"title":"Bahía Ballena"},{"title":"Piedras Blancas"},{"title":"Bahía Drake"}]},{"title":"Quepos","distritos":[{"title":"Quepos"},{"title":"Savegre"},{"title":"Naranjito"}]},{"title":"Golfito","distritos":[{"title":"Golfito"},{"title":"Puerto Jiménez"},{"title":"Guaycará"},{"title":"Pavón"}]},{"title":"Coto Brus","distritos":[{"title":"San Vito"},{"title":"Sabalito"},{"title":"Agua Buena"},{"title":"Limoncito"},{"title":"Pittier"},{"title":"Gutiérrez Brown"}]},{"title":"Parrita","distritos":[{"title":"Parrita"}]},{"title":"Corredores","distritos":[{"title":"Corredores"},{"title":"La Cuesta"},{"title":"Paso Canoas"},{"title":"Laurel"}]},{"title":"Garabito","distritos":[{"title":"Jacó"},{"title":"Tárcoles"}]}]},{"title":"Limón","cantones":[{"title":"Limón","distritos":[{"title":"Limón"},{"title":"Valle La Estrella"},{"title":"Río Blanco"},{"title":"Matama"}]},{"title":"Pococí","distritos":[{"title":"Guápiles"},{"title":"Jiménez"},{"title":"Rita"},{"title":"Roxana"},{"title":"Cariari"},{"title":"Colorado"},{"title":"La Colonia"}]},{"title":"Siquirres","distritos":[{"title":"Siquirres"},{"title":"Pacuarito"},{"title":"Florida"},{"title":"Germania"},{"title":"Cairo"},{"title":"Alegría"}]},{"title":"Talamanca","distritos":[{"title":"Bratsi"},{"title":"Sixaola"},{"title":"Cahuita"},{"title":"Telire"}]},{"title":"Matina","distritos":[{"title":"Matina"},{"title":"Batán"},{"title":"Carrandí"}]},{"title":"Guácimo","distritos":[{"title":"Guácimo"},{"title":"Mercedes"},{"title":"Pocora"},{"title":"Río Jiménez"},{"title":"Duacarí"}]}]}]};

  provincias:any = [];
  cantones:any = [];
  distritos:any = [];

  provTemp:any = [];
  canTemp:any =[];
  distriTemp:any = [];

  clientes:Array<any>;


  constructor(private service: APIService) { 
    

  }

  @Input() set src(val:any){
    this.data = val;
    console.log('data',this.data)
  }
  ngOnInit() {
    this.cargarProvincias();
  }

  cargarProvincias(){
    this.provTemp = this.ubicaciones["provincias"];
    for(var i = 0; i < this.provTemp.length; i++){
      this.provincias.push(this.provTemp[i]["title"]);  
    }
  }
  guardarDatos(Nombre:any, Telefono:any, Encargado:any, Provincia:any, Canton:any, Distrito:any){
    console.log("Datos de Sucursal: "+Nombre+Telefono+Encargado+Provincia+Canton+Distrito);
  }
  guardarTrabajador(Nombre:any, Apellido1:any, Apellido2:any, Cedula:any, FechaN:any, FechaI:any, Sucursal:any, SalarioH:any){
    console.log("Datos de Trabajador: "+Nombre+Apellido1+Apellido2+Cedula+FechaN+FechaI+Sucursal+SalarioH);
  }

  cargarCantones(P:any){

    var id;
  
    for(var i = 0; i < this.provTemp.length; i ++){
      if(P == this.provTemp[i]["title"]){
        id = i;
      }
    }

    this.canTemp = this.provTemp[id]["cantones"];
    
    
    for(var i = 0; i < this.canTemp.length; i++){
      this.cantones.push(this.canTemp[i]["title"]);
    }

  }

  cargarDistritos(C:any){
    var id;
    for(var i = 0; i < this.canTemp.length; i++){
      if(C == this.canTemp[i]["title"]){
        id = i;
      }

    }
    this.distriTemp = this.canTemp[id]["distritos"];
    
    for(var i = 0; i < this.distriTemp.length; i++){
      this.distritos.push(this.distriTemp[i]["title"]);
    }
  }

  getCliente(){
    this.data.getEmpleados().subscribe(datos => this.clientes= datos);
    console.log( this.clientes);
 }

}

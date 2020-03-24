import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RestApiService} from '../service/rest-api.service';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  /** Recieve idCard */
  data:any;
/**
 * Variable is the product tracked
 */
Product:any;
/**
 * Status of the product
 */
productStatus:string="Pendiente";
/**
 * First function of the page
 * @param route Controller of the Actived url and the information get it by it
 * @param router Controller of the Router 
 * @param api Controller the Rest Api Service
 */
  constructor(private route: ActivatedRoute, private router: Router,public api: RestApiService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log('data Tracking',this.data)
      }
    });
    this.api.getClientes().subscribe(data=>{
      console.log('Data Tracking',data);
      this.getInfoPackage(data);
    });
    
  }
  /**
   * Second function to initialize
   */
  ngOnInit() {
  }
  /**
   * Funtion the get the correct Package information, in here it must take the product by the seller
   * @param data list with all the products
   */
  getInfoPackage(data:any){
    for(var i in data){
      if(data[i]['idCard']== this.data){
        console.log('Data function',data[i]);
        this.Product= data[i];
        break;
      }
      else{
        console.log('else')
      }
    }
  }

  /**
   * Value Selected to sent to the package
   * 
   */
  packageStatusAction($event){
    console.log('selected',this.productStatus)
  }
  /**
   * Send Status of the package
   * HERE goes the post
   */
  summitStatus(){
    console.log('summit Data',this.productStatus);
    this.router.navigate(['home']);
  }
}

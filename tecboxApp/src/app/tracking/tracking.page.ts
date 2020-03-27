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
Package:any;
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
        console.log('distrubuitor Tracking ID, received',this.data)
      }
    });
    this.api.getPackages().subscribe(Packages=>{
      console.log('Data Packages',Packages);
      this.getInfoPackage(Packages);
    });
    
  }
  /**
   * Second function to initialize
   */
  ngOnInit() {
  }
  /**
   * Funtion the get the correct Package information, in here it must take the product by the seller
   * Here there is two option, get package by the TrackID, or use this funtion that call all the package and look what is for what
   * @param data list with all the products
   */
  getInfoPackage(Packages:any){
    for(var i in Packages){
      if(Packages[i]['TrackID']== this.data){
        console.log('Info Package',Packages[i]);
        this.Package= Packages[i];
        /**Second way , its to get directly by the Package ID */
        this.api.getPackageByID(this.data)
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
    this.api.changeStatus(this.productStatus);
    this.router.navigate(['home']);
    
  }
}

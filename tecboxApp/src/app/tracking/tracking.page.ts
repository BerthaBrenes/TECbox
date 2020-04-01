import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RestApiService} from '../service/rest-api.service';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

// Recieve deliverer user
data:any;

//Variable that contains all the packages of certain deliverer
packagesIDs:Array<string> = [];

//Status of the product
productStatus:string="Pendiente";

// Product Track ID
productTrackID:string="";

/**
 * First function of the page
 * @param route Controller of the Actived url and the information get it by it
 * @param router Controller of the Router 
 * @param api Controller the Rest Api Service
 */
  constructor(private route: ActivatedRoute, private router: Router,public api: RestApiService) {

    let user:string;

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special)['user'].replace(/@tecbox.com/gi,``);
        console.log('distrubuitor: ',this.data);
      }
    });

    this.api.getPackages(this.data).subscribe(Packages=>{
      console.log('Data Packages',Packages);
      this.getInfoPackage(Packages);
    });
    
  }
  
  //Second function to initialize
  ngOnInit() {
  }

  /**
   * Function that takes all the packets, extracts their 
   * trackID and enters them in the list of identifiers
   * @param Packages List of all packages
   */
  getInfoPackage(Packages:any){
    for(var i in Packages){
        console.log('Info Package',Packages[i]['TrackID']);
        this.packagesIDs.push(Packages[i]['TrackID']);
    }
    console.log(`array: ${this.packagesIDs}`);
  }

  /**
   * Value Selected to sent to the package
   * 
   */
  packageStatusAction($event){
    console.log('selected',this.productStatus);
  }

  //Value Selected to sent to the package
  packageTrackIDAction($event){
    console.log('selected',this.productTrackID);
  }


  /**
   * Send Status of the package
   */
  summitStatus(){
    console.log('summit Data',this.productStatus);
    this.api.changeStatus(this.productStatus, this.productTrackID).subscribe();
  }
}

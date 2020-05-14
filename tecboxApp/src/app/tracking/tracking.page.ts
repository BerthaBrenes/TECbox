import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RestApiService} from '../service/rest-api.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

// Recieve deliverer user
deliveryMan:any;

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
  constructor(private route: ActivatedRoute, private router: Router,public api: RestApiService, public toastController: ToastController) {


    this.route.queryParams.subscribe(
      params => {
        if (params && params.special) {
          this.deliveryMan = JSON.parse(params.special);
        }
      }
    );

    this.api.getPackages().subscribe(Packages=>{
      console.log('Data Packages: ',Packages);
      this.getInfoPackage(Packages);
    });
    
  }
  
  //Second function to initialize
  ngOnInit() {}

  /**
   * Function that takes all the packages, extracts their 
   * trackID and enters them in the list of identifiers
   * @param Packages List of all packages
   */
  getInfoPackage(Packages:any){
    for(var i in Packages){
        
        if (Packages[i]['DmId'] == this.deliveryMan['Id']){
          this.packagesIDs.push(Packages[i]['TrackId']);
        }
    }
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
    this.api.changeStatus(this.productStatus, this.productTrackID).subscribe();
    this.packageUpdatedToast();
  }

  // Shows a message 
  async packageUpdatedToast() {
    const toast = await this.toastController.create({
      message: 'El estado del paquete ha sido actualizado.',
      duration: 2000
    });
    toast.present();
  }
}


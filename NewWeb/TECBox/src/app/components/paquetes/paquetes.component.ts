import { PackageService } from './../../services/package.service';
import { Component, OnInit, Input } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
/**
 * Component that handles the packages
 */
export class PaquetesComponent implements OnInit {
  /**
   * Data of packages
   */
  data: any;
  /**
   * id of the component
   */
  id: string = 'paquetes';
  /**
   * Enable the function to add data
   */
  enterEnable: boolean = false;
  /**
   * Input of data
   */
  @Input() set src(val: any){
    this.data = val;
    console.log('data', this.data);
  }
  /**
   * This method initializes the component
   */
  constructor(
    private packageService: PackageService
  ) { 
    this.packageService.getPackagesList()
    .subscribe(
      pack => {
        this.data = pack;
      }
    );
  }
  
  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}
  /**
   * method for add more data
   */
  clickEnter(){
    this.enterEnable = true;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SellerService } from 'src/app/services/seller.service';
import { OfficeService } from 'src/app/services/office.service';
import { RouteService } from 'src/app/services/route.service';
import { PackageService } from 'src/app/services/package.service';
import { ClientService } from 'src/app/services/client.service';
import { ModalController } from '@ionic/angular';
/**
 * Component
 */
@Component({
  selector: 'app-update-controller',
  templateUrl: './update-controller.component.html',
  styleUrls: ['./update-controller.component.scss'],
})
/**
 * Component for update data
 */
export class UpdateControllerComponent implements OnInit {
  selectData: any[] = [];
  /**
   * Input with the data
   */
  @Input() set data(value: any[]){
    this.selectData = value;
    console.log('editables inputs', this.selectData);
  };
  /**
   * Constructor of the component
   */
  constructor(
    private productService: ProductService,
    private employeeService: EmployeeService,
    private sellerService: SellerService,
    private routeService: RouteService,
    private officeService: OfficeService,
    private packageService: PackageService,
    private clientService: ClientService,
    public modalController: ModalController
  ) { }

  /**
   * A life cycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit() {}
  /**
   * Dismmiss the page
   */
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}

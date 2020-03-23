import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  /** Recieve idCard */
data:any;
/**
 * 
 * @param route 
 * @param router 
 */
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
     this.data=params;
     console.log(this.data)
    }); }

  ngOnInit() {
  }

}

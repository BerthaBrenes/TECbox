import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pop-over-controller',
  templateUrl: './pop-over-controller.page.html',
  styleUrls: ['./pop-over-controller.page.scss'],
})
export class PopOverControllerPage implements OnInit {

  constructor(private navParams: NavParams) {
    console.log(this.navParams.data['type']);
  }

  ngOnInit() {
  }

}

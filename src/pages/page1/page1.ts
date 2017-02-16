import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Page2 } from '../page2/page2';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];
  }

  swipe_left(event, page) {
    //2 = right to left swipe
      this.openPage(page);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.navCtrl.setRoot(page.component);
    this.navCtrl.setRoot(Page2, {}, {animate: true, direction: "back"});

  }
}

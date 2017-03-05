import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  selectedItem: any;
  icons: string[];
  fnames: string[];
  lnames: string[];
  tf: boolean[];
  friends: Array<{name: string, active: boolean, distance:number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.fnames = ['Aaron','Ryan','John','Will','Alice','Brandi','Joan','Mark',
    'Andrew','Austin','Luke','Matt','Lauren','Bianca'];
    this.lnames = ['Parry','James','Goldstein','Brooks','Chen','Christian','Lee','Smith'];
    this.tf = [true,false]
    this.friends = [];
    for (let i = 1; i < 35; i++) {
      this.friends.push({
        name: this.fnames[Math.floor(Math.random() * this.fnames.length)] + " " + this.lnames[Math.floor(Math.random() * this.lnames.length)],
        active: this.tf[Math.floor(Math.random() * this.tf.length)],
        distance:Math.random()*10,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(Page2, {
  //     item: item
  //   });
  // }
}

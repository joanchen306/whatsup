import {Component} from "@angular/core";
import {FriendProvider} from "../../providers/friend-provider";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html',
  providers: [FriendProvider]
})
export class FriendsPage {
  selectedItem:any;
  friendsIds:string[];
  icons:string[];
  fnames:string[];
  lnames:string[];
  tf:boolean[];
  friends=[];

  constructor(public navCtrl:NavController, public navParams:NavParams, public friendProvider:FriendProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.friends = this.friendProvider.getAllFriends();

    alert("IDS: " + this.friendsIds);

    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
    //
    // this.fnames = ['Aaron','Ryan','John','Will','Alice','Brandi','Joan','Mark',
    // 'Andrew','Austin','Luke','Matt','Lauren','Bianca'];
    // this.lnames = ['Parry','James','Goldstein','Brooks','Chen','Christian','Lee','Smith'];
    // this.tf = [true,false]
    // this.friends = [];
    // for (let i = 1; i < 35; i++) {
    //   this.friends.push({
    //     name: this.fnames[Math.floor(Math.random() * this.fnames.length)] + " " + this.lnames[Math.floor(Math.random() * this.lnames.length)],
    //     active: this.tf[Math.floor(Math.random() * this.tf.length)],
    //     distance:Math.random()*10,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(Page2, {
  //     item: item
  //   });
  // }
}

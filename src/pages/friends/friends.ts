import {Component, Input} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Rx";
import {FacebookService} from "../../services/facebook.service";
import {Http} from "@angular/http";

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html',
  providers: [FacebookService]
})
export class FriendsPage {
  selectedItem:any;
  friendsIds:string[];
  icons:string[];
  fnames:string[];
  lnames:string[];
  tf:boolean[];
  friends:any[];
  public friendsObservable:Observable<any[]>;
  @Input() userId:string;

  private accessToken = 'EAACEdEose0cBAMR4BmdM3kh6uYPFAYVOPZAjHZCrBB19Yaee2B9ZAialtVIfUTXaZBMpdV18W3IbLCXKXnShPmvYYWYZB4aus0vFlZCMIiFtHErsfkMAjgNQaRKf5BZCP5U5AZCnZBlozb14ObFJkoaEt2NjlUR5nuwza4eK6J6MAyKQb5xRSuAoC';

  private graphUrl = `https://graph.facebook.com/v2.8/?access_token=${this.accessToken}/`;
  private friendsQuery = '/friends';

  constructor(public navCtrl:NavController, public navParams:NavParams, private http:Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    let url = this.graphUrl + "10211612897815532" + this.friendsQuery;

    this.http
      .get(url)
      .map(response => response.json())
      .subscribe(data => {
        alert("Data: " + data);
      });

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

  mapFriends = (friend) => {
    this.friends.push({
      name: friend.name,
      active: this.tf[Math.floor(Math.random() * this.tf.length)],
      distance: Math.random() * 10,
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });
  };

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(Page2, {
  //     item: item
  //   });
  // }
}

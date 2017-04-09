import {Component, Input} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {Observable} from "rxjs/Rx";
import {FacebookService} from "../../services/facebook.service";
import {Http} from "@angular/http";
import {FriendData} from "../../data/friendData";

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html',
  providers: [FriendData]
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

  constructor(public navCtrl:NavController, public navParams:NavParams, private friendData:FriendData) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.friends = [];
    for (let i = 0; i < friendData.friends.length; i++) {
      this.friends.push({
        name: friendData.friends[i].name,
        active: friendData.friends[i].available,
        latitude: friendData.friends[i].latitude,
        longitude: friendData.friends[i].longitude
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

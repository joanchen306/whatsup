import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  selector: 'friendDetails-page',
  templateUrl: 'friendDetails.html'
})
export class FriendDetails {
  friend:any;

  constructor(navParams:NavParams, public viewCtrl:ViewController) {
    this.friend = navParams.data;
  }

  showFriendLocation() {
    // TODO: Show friend location on map
    // TODO: Slide screen to mapview
    this.viewCtrl.dismiss({
      locationRequested: true,
      friend: this.friend
    });
  }
}

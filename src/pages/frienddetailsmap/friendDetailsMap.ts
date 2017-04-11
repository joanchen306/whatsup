import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  selector: 'friendDetailsMap-page',
  templateUrl: 'friendDetailsMap.html'
})
export class FriendDetailsMap {
  friend:any;

  constructor(navParams:NavParams, public viewCtrl:ViewController) {
    this.friend = navParams.data;
  }

  dismissModal() {
    this.viewCtrl.dismiss(this.friend);
  }

  requestUber() {
    this.viewCtrl.dismiss(this.friend);
    alert("Uber to " + this.friend.name + " requested! Opening Uber.");
  }
}

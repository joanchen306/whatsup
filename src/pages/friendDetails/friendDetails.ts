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
    alert("FRIEND: " + JSON.stringify(this.friend));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

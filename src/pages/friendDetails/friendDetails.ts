import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  selector: 'friendDetails-page',
  templateUrl: 'friendDetails.html'
})
export class FriendDetails {

  constructor(navParams:NavParams, public viewCtrl:ViewController) {
    // alert("GOT: " + navParams.get('name'));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

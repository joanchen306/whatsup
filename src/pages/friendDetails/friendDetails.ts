import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  selector: 'friendDetails-page',
  templateUrl: 'friendDetails.html'
})
export class FriendDetails {

  constructor(navParams:NavParams) {
    // alert("GOT: " + navParams.name);
  }
}

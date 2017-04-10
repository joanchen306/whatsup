import {NavController, NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  selector: 'eventdetails-page',
  templateUrl: 'eventdetails.html'
})
export class EventDetails {
  event:any;

  constructor(public navParams:NavParams, public navCtrl:NavController, public viewCtrl:ViewController) {
    this.event = navParams.data;
    this.viewCtrl = viewCtrl;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

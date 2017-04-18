import { NavController, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";

@Component({
  selector: 'eventdetails-page',
  templateUrl: 'eventdetails.html'
})
export class EventDetails {
  userId:any;
  event:any;
  eventStart: Date;
  eventEnd: Date;

  constructor(public navParams:NavParams, public navCtrl:NavController, public viewCtrl:ViewController) {
    this.userId = navParams.data;
    this.viewCtrl = viewCtrl;
    this.event = navParams.get('event');
    this.eventStart = new Date(this.event.start);
    this.eventEnd = new Date(this.event.end);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.event);
  }

  requestUber() {
    this.viewCtrl.dismiss(this.event);
    alert("Uber to " + this.event.address + " requested! Opening Uber.");
  }
}

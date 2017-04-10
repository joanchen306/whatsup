import {NavController, Slides, NavParams, ViewController} from "ionic-angular";

import { Component } from '@angular/core';

@Component({
  selector: 'eventdetails-page',
  templateUrl: 'eventdetails.html'
})
export class EventDetails {
    userId: any;
    event: any;

    constructor(public navParams:NavParams, public navCtrl:NavController, public viewCtrl: ViewController) {
        this.userId = navParams.data;
        this.viewCtrl = viewCtrl;
        this.event = navParams.get('event');
        console.log(this.event);
        //ng-on-change to detect filter change
        // then if filter change, update markers
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
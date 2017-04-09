import { Component } from '@angular/core';
//import {EventProvider} from '../../providers/event-provider';
import { NavController } from 'ionic-angular';
import {EventData} from "../../data/eventData";

@Component({
  selector: 'event-list',
  templateUrl: 'events.html',
  providers: [EventData]
})
export class EventsPage {
  events = []


  constructor(public navCtrl: NavController, /*private eventProvider: EventProvide*/) {
    //
    // eventProvider.getJsonData().subscribe((res)=>{
    //   this.events = res.events;
    // });
  }

}

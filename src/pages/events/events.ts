import { Component } from '@angular/core';
import {EventProvider} from '../../providers/event-provider';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'event-list',
  templateUrl: 'events.html',
  providers: [EventProvider]
})
export class EventsPage {
  events = []


  constructor(public navCtrl: NavController, private eventProvider: EventProvider) {

    // eventProvider.getJsonData().subscribe((res)=>{
    //   this.events = res.events;
    // });
  }

}

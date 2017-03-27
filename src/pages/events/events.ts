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

    eventProvider.getJsonData().subscribe((res)=>{
      this.events = res.events;
      alert(res.events);
    });

    // [
    //   {
    //     name: "Esteban's Shindig",
    //     distance: 1.1,
    //     description: "Come celebrate your average Thursday night with Esteban and the crew. BYOB ofc"
    //   },
    //   {
    //     name: "Miguel's Lunar Eclipse Get-together",
    //     distance: 0.8,
    //     description: "Come celebrate the lunar eclipse, they don't happen very often ya know!"
    //   },
    // ];
  }


}

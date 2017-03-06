import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'event-list',
  templateUrl: 'events.html'
})
export class EventsPage {
  events: Array<{name:string, distance:number, description:string}>
  constructor(public navCtrl: NavController) {
    this.events = [
      {
        name: "Esteban's Shindig",
        distance: 1.1,
        description: "Come celebrate your average Thursday night with Esteban and the crew. BYOB ofc"
      },
      {
        name: "Miguel's Lunar Eclipse Get-together",
        distance: 0.8,
        description: "Come celebrate the lunar eclipse, they don't happen very often ya know!"
      },
    ];
  }

}

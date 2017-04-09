import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {EventData} from "../../data/eventData";
//import {EventProvider} from '../../providers/event-provider';

@Component({
  selector: 'event-list',
  templateUrl: 'events.html',
  providers: [EventData]
})
export class EventsPage {
  events:any[];


  constructor(public navCtrl:NavController, private eventData:EventData) {
    this.events = eventData.events;
  }

  eventTapped(event) {
    // TODO: Launch event modal
  }

}

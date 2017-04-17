import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { EventData } from "../../data/eventData";
import { EventDetails } from "../eventdetails/eventdetails";
import {EventProvider} from '../../providers/event-provider';

@Component({
  selector: 'event-list',
  templateUrl: 'events.html',
  providers: [EventData]
})
export class EventsPage {
  events:any[];



  constructor(public navCtrl:NavController, private eventData:EventData,private eventProvider:EventProvider, private modalCtrl:ModalController) {
    // this.events = eventData.events;
    eventProvider.getJsonData().subscribe((res)=>{
      console.log(res);
      this.events = res;});

  }

  eventTapped(event) {
    var eventDetailsModal = this.modalCtrl.create(EventDetails, {event: event});
    eventDetailsModal.onDidDismiss(eventDetails => {
      eventDetailsModal = this.modalCtrl.create(EventDetails, {event: eventDetails});
    });

   eventDetailsModal.present();
  }

}

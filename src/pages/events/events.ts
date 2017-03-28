import { Component } from '@angular/core';
import {EventProvider} from '../../providers/event-provider';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'event-list',
  templateUrl: 'events.html',
  providers: [EventProvider]
})
export class EventsPage {
  // events = []
  events: Array<{id: number, name: string, start: string, end: string, organizer:string, address: string, latitude: number, longitude: number,distance: number}>;
  constructor(public navCtrl: NavController) {
    this.events = [
      {id: 22601901897, name:"Big Tigger Hosts Suite Life Fridays At Suite Lounge - RSVP HERE", start:"2017-04-01T02:00:00Z", end:"2017-04-01T07:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address:"375 Luckie Street, Atlanta, GA 30313", latitude:33.764985, longitude:-84.39578920000002, distance: 2},
      {id: 16926238836, name:"Suite Life Dinner Party Every Friday At Suite Lounge - Reserve Your Table Now", start:"2017-04-01T02:00:00Z", end:"2017-04-01T07:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address:"375 Luckie Street, Atlanta, GA 30313", latitude:33.764985, longitude:-84.39578920000002, distance: 2},
      {id: 11121351261, name:"FREE BIRTHDAY SECTIONS AT ATLANTIS", start:"2017-04-02T02:00:00Z", end:"2017-04-02T07:00:00Z", organizer:"THURSDAY: Glamour Thursdays", address: "1937 PIEDMONT CIRCLE NW., ATLANTA, GA", latitude:33.8103915, longitude:-84.36746599999998, distance: 2},
      {id: 1880852681, name:"7th Annual Atlanta Hip Hop Day Festival", start:"2017-10-06T15:00:00Z", end:"2017-10-09T01:00:00Z", organizer:"The Official and Exclusive Event Promotional Company Holding the License for M.C. W.A.R.", address: "91 Peachtree St., Atlanta, GA 30303", latitude:33.7521587, longitude:-84.39209670000002, distance: 2},
      {id: 16682422575, name:"Vice Mondays At Tongue & Groove - Ladies Free All Night With RSVP", start:"2017-03-28T02:00:00Z", end:"2017-03-28T07:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address: "2420 Piedmont Road Northeast, Atlanta, GA 30344", latitude:33.8219566, longitude:-84.367677, distance: 3},
      {id: 13390307771, name:"The All New Dubai Wednesdays @ Kapture Ladies Free All Night", start:"2017-03-30T02:00:00Z", end:"2017-03-30T07:00:00Z", organizer:"#PRVLGD=FOE DIDDY,MR.DORSEY AND @CHRISSTAINLESS", address: "75 Peachtree Place NW , ATLANTA, GA 30309", latitude:33.7807272, longitude:-84.38969129999998, distance: 1},
      {id: 20746997829, name:"The 5th Annual No Sleep South Beach Weekend", start:"2017-07-21T18:00:00Z", end:"2017-07-23T21:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address: "Miami Flordia, Atlanta, GA 30319", latitude:33.8730946, longitude:-84.33842900000002,distance: 6},
      {id: 28417013051, name:"Eden On Peachtree Day Party this Sunday @Elleven45", start:"2017-07-21T18:00:00Z", end:"2017-04-03T04:00:00Z", organizer:"#PRVLGD=FOE DIDDY,MR.DORSEY AND @CHRISSTAINLESS", address: "2110 Peachtree Road , Atlanta, GA 30309", latitude:33.8186088, longitude:-84.39002210000001,distance: 2},
      {id: 25663241446, name:"MomoCon 2017 - Atlanta's Animation, Gaming, and Comic Convention", start:"2017-05-25T18:00:00Z", end:"2017-05-28T21:00:00Z", organizer:"n/a", address: "285 Andrew Young International Boulevard Northwest, Atlanta, GA 30303", latitude:33.759999, longitude:-84.396976,distance: 2},
      {id: 21510641909, name:"BRUNCH WITH YOUNG PROFESSIONALS AT DS17 hookah lounge and restaurant ", start:"2017-04-02T16:30:00Z", end:"2017-04-02T23:00:00Z", organizer:"EVENT SPECIALIST", address: "2285 Peachtree Road, Atlanta, GA 30309", latitude:33.8164626, longitude:-84.38960179999998,distance: 2}
    ];
    // eventProvider.getJsonData().subscribe((res)=>{
    //   this.events = res.events;
    // });
  }







// <<<<<<< HEAD
// =======
//     // eventProvider.getJsonData().subscribe((res)=>{
//     //   this.events = res.events;
//     // });
//   }
// >>>>>>> aed001f581b09282ff56946cf47626317959a9ad

}

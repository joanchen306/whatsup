import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {NativeStorage} from "ionic-native";
import 'rxjs/add/operator/map';
import {calcCrow} from "../services/getDistance";
import {categorize} from "../services/getCategory";
/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {

  events = {};
  constructor(public http: Http) {
    console.log("Event Provider")
  }
  public getJsonData(){

    return this.http.get(
      'https://www.eventbriteapi.com/v3/events/search/?location.address=Atlanta&expand=organizer,venue&token=VMGQGYQUIO3IKNS75BD4'
    ) .map((res) => {
           console.log(res.json());
           return res.json();

         }).map((res) => {
           console.log(res.events);
           var events = [];
           res.events.forEach((ev) => {events.push({
             'name':ev.name.text,
             'description':ev.description.text,
             'lat':ev.venue.latitude,
             'lon':ev.venue.longitude,
             'address':ev.venue.address.localized_address_display,
             'start':ev.start.local,
             'end':ev.end.local,
             'distance':calcCrow(ev.venue.latitude,ev.venue.longitude, 33.7818079,-84.3973634),
             'category':categorize(ev.category_id),
           })
         });
        return events});

  }
    //console.log('Hello EventProvider Provider');
}

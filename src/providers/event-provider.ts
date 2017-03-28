import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {NativeStorage} from "ionic-native";
import 'rxjs/add/operator/map';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {
  data:any;
  constructor(public http: Http) {
    this.data = null;
    //console.log('Hello EventProvider Provider');
  }

  public getCityEvents(city) {
    var event = {id: "", name: "", start: "", end: "", latitude: "", longitude: "", venue:""};
    NativeStorage.getItem('event')
      .then((data) => {
        alert("data: " + JSON.stringify(data));
        alert("data id: " + data.id);

        // event = {
        //   id = data.id,
        //   name = data.name,
        //   start = data.start,
        //   end = data.end,
        //   latitude = data.latitude,
        //   longitude = data.longitude,
        //   venue = data.venue
        // };


      this.http.get("https://www.eventbriteapi.com/v3/events/search/?location.address=Atlanta&expand=organizer,venue&token=VMGQGYQUIO3IKNS75BD4").subscribe( data =>{
        console.log(data);
        //variable assignment
        this.data = data;
      },
      error => {
        console.log(error)
      });
      })
}  }

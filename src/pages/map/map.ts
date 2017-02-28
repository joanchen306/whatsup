import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation } from 'ionic-native';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

    map: GoogleMap;

    constructor(public navCtrl: NavController, public platform: Platform) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    loadMap(){
      Geolocation.getCurrentPosition().then((position) => {
        let latLng = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);


        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': latLng,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
        }, (err) => {
          console.log(err);
        });

    }
}

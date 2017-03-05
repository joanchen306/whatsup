import { Component, ViewChild } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

    @ViewChild('map') mapElement;
    map: any;

    constructor(public navCtrl: NavController, public platform: Platform) {
        platform.ready().then(() => {
            this.initMap();
        });
    }

    initMap() {
      let latLng = new google.maps.LatLng(33.7756, -84.3963);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }
}

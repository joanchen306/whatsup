import { Component, ViewChild, OnInit } from '@angular/core';

import { NavController, Platform, ToastController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit {

    @ViewChild('map') mapElement;
    map: any;
    userMarker: any;

    constructor(public navCtrl: NavController, public platform: Platform, public toastCtrl: ToastController) {

    }

    ngOnInit() {}

    ngAfterViewInit() {
      this.initMap();
    }

    initMap() {
      let lat = 35.000;
      let long = -84.000;

      let latLng = new google.maps.LatLng(lat, long);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        //zoomControl: true,
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.centerToMyLocation();

      // Create the DIV to hold the control and call the CenterControl()
      // constructor passing in this DIV.
      var centerControlDiv = document.createElement('div');
      this.findMeControl(centerControlDiv, this.map);

      this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(centerControlDiv);
    }

    centerToMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.centerMap.bind(this), this.showError);
      } else {
        //browser does not support geolocation 
        this.presentToast("Browser does not support geolocation");
      }
    }

    centerMap(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      if (this.userMarker != null) {
        this.userMarker.setMap(null);
      }
      let latLng = new google.maps.LatLng(lat, long);

      this.userMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
          },
        title: 'My location'
      });

      this.map.setCenter(latLng);
      this.map.setZoom(15);

      this.userMarker.setMap(this.map);
    }

    showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          this.presentToast("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          this.presentToast( "Location information is unavailable.");
          break;
        case error.TIMEOUT:
          this.presentToast("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          this.presentToast("An unknown error occurred.");
          break;
      }
    }

    findMeControl(findMeControlDiv, map) {
      // Set CSS for the control border.
      var findMeControlUI = document.createElement('div');
      findMeControlUI.style.backgroundColor = '#fff';
      findMeControlUI.style.border = '2px solid #fff';
      findMeControlUI.style.borderRadius = '3px';
      findMeControlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      findMeControlUI.style.cursor = 'pointer';
      findMeControlUI.style.marginBottom = '22px';
      findMeControlUI.style.textAlign = 'center';
      findMeControlUI.title = 'Click to find your location';
      findMeControlDiv.appendChild(findMeControlUI);

      // Set CSS for the control interior.
      var findMeControlText = document.createElement('div');
      findMeControlText.style.color = 'rgb(25,25,25)';
      findMeControlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      findMeControlText.style.fontSize = '16px';
      findMeControlText.style.lineHeight = '38px';
      findMeControlText.style.paddingLeft = '5px';
      findMeControlText.style.paddingRight = '5px';
      findMeControlText.innerHTML = 'ME';
      findMeControlUI.appendChild(findMeControlText);

      // Setup the click event listener
      findMeControlText.addEventListener('click', this.findMeControlEventListener, false);
    }

    private findMeControlEventListener = (evt:Event) => {
      this.centerToMyLocation();
    }

    presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });

      toast.present();
    }
}
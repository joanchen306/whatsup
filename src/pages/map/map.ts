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
        zoomControl: true,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": "0.59"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "lightness": "8"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#5a60ac"
                    },
                    {
                        "weight": "1.77"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#2c2f72"
                    },
                    {
                        "weight": 0.8
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "weight": "2.63"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#00f6ff"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ],
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

      console.log('user lat : ' + lat);
      console.log('user long: ' + long);

      if (this.userMarker != null) {
        this.userMarker.setMap(null);
      }
      let latLng = new google.maps.LatLng(lat, long);

      this.userMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillOpacity: 1,
            strokeWeight: 2,
            fillColor: '#00b8ff',
            strokeColor: '#fff'
          },
        title: 'My location'
      });

      this.map.setCenter(latLng);
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
      findMeControlUI.id = 'findMe'
      findMeControlUI.title = 'Click to find your location';
      findMeControlDiv.appendChild(findMeControlUI);

      // Set CSS for the control interior.
      var findMeControlText = document.createElement('div');
      findMeControlText.style.color = 'white';
      findMeControlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      findMeControlText.style.fontSize = '16px';
      findMeControlText.style.lineHeight = '40px';
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
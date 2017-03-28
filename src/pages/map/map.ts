import { Component, ViewChild, OnInit } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit {

    @ViewChild('map') mapElement;
    map: any;
    userMarker: any;
    events: any;

    constructor(public navCtrl: NavController, public platform: Platform) {
        type EventArray = Array<{id: number, name: string, start: string, end: string, organizer:string, address: string, latitude: number, longitude: number}>;
        var events: EventArray = [
        {id: 22601901897, name:"Big Tigger Hosts Suite Life Fridays At Suite Lounge - RSVP HERE", start:"2017-04-01T02:00:00Z", end:"2017-04-01T07:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address:"375 Luckie Street, Atlanta, GA 30313", latitude:33.764985, longitude:-84.39578920000002},
        {id: 16926238836, name:"Suite Life Dinner Party Every Friday At Suite Lounge - Reserve Your Table Now", start:"2017-04-01T02:00:00Z", end:"2017-04-01T07:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address:"375 Luckie Street, Atlanta, GA 30313", latitude:33.764985, longitude:-84.39578920000002},
        {id: 11121351261, name:"FREE BIRTHDAY SECTIONS AT ATLANTIS", start:"2017-04-02T02:00:00Z", end:"2017-04-02T07:00:00Z", organizer:"THURSDAY: Glamour Thursdays", address: "1937 PIEDMONT CIRCLE NW., ATLANTA, GA", latitude:33.8103915, longitude:-84.36746599999998},
        {id: 1880852681, name:"7th Annual Atlanta Hip Hop Day Festival", start:"2017-10-06T15:00:00Z", end:"2017-10-09T01:00:00Z", organizer:"The Official and Exclusive Event Promotional Company Holding the License for M.C. W.A.R.", address: "91 Peachtree St., Atlanta, GA 30303", latitude:33.7521587, longitude:-84.39209670000002},
        {id: 16682422575, name:"Vice Mondays At Tongue & Groove - Ladies Free All Night With RSVP", start:"2017-03-28T02:00:00Z", end:"2017-03-28T07:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address: "2420 Piedmont Road Northeast, Atlanta, GA 30344", latitude:33.8219566, longitude:-84.367677},
        {id: 13390307771, name:"The All New Dubai Wednesdays @ Kapture Ladies Free All Night", start:"2017-03-30T02:00:00Z", end:"2017-03-30T07:00:00Z", organizer:"#PRVLGD=FOE DIDDY,MR.DORSEY AND @CHRISSTAINLESS", address: "75 Peachtree Place NW , ATLANTA, GA 30309", latitude:33.7807272, longitude:-84.38969129999998},
        {id: 20746997829, name:"The 5th Annual No Sleep South Beach Weekend", start:"2017-07-21T18:00:00Z", end:"2017-07-23T21:00:00Z", organizer:"FURIOUS ENTERTAINMENT, ATLANTA, GA", address: "Miami Flordia, Atlanta, GA 30319", latitude:33.8730946, longitude:-84.33842900000002},
        {id: 28417013051, name:"Eden On Peachtree Day Party this Sunday @Elleven45", start:"2017-07-21T18:00:00Z", end:"2017-04-03T04:00:00Z", organizer:"#PRVLGD=FOE DIDDY,MR.DORSEY AND @CHRISSTAINLESS", address: "2110 Peachtree Road , Atlanta, GA 30309", latitude:33.8186088, longitude:-84.39002210000001},
        {id: 25663241446, name:"MomoCon 2017 - Atlanta's Animation, Gaming, and Comic Convention", start:"2017-05-25T18:00:00Z", end:"2017-05-28T21:00:00Z", organizer:"n/a", address: "285 Andrew Young International Boulevard Northwest, Atlanta, GA 30303", latitude:33.759999, longitude:-84.396976},
        {id: 21510641909, name:"BRUNCH WITH YOUNG PROFESSIONALS AT DS17 hookah lounge and restaurant ", start:"2017-04-02T16:30:00Z", end:"2017-04-02T23:00:00Z", organizer:"EVENT SPECIALIST", address: "2285 Peachtree Road, Atlanta, GA 30309", latitude:33.8164626, longitude:-84.38960179999998},
        ];
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

      for (let event of this.events) {
        this.createEventMarker(event);
      }
    }

    centerToMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.centerMap.bind(this), this.showError);
      } else {
        //browser does not support geolocation 
        alert("Browser does not support geolocation");
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

    createEventMarker(event) {
      let lat = event.latitude;
      let long = event.longitude;

      let latLng = new google.maps.LatLng(lat, long);
    
      let eventMarker = new google.maps.Marker({
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
        title: event.name,
      });

      //eventMarker.addListener('click', this.launchModalMethod);
      eventMarker.setMap(this.map);
    }

    showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert( "Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
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
}
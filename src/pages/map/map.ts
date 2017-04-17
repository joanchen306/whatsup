import {Component, ViewChild, OnInit, Input, SimpleChanges} from "@angular/core";
import {NavController, Platform, ModalController} from "ionic-angular";
import {EventDetails} from "../eventdetails/eventdetails";
import {EventData} from "../../data/eventData";
import {FriendDetailsMap} from "../frienddetailsmap/friendDetailsMap";

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html',
  providers: [EventData]
})
export class MapPage implements OnInit {
  @Input() filters:Array<string> = [];
  @Input() friends:Array<any> = [];
  @Input() events:Array<any> = [];
  @ViewChild('map') mapElement;
  map:any;
  userMarker:any;
  eventMarkers:Map<any, any>;
  friendMarkers = {};
  mapLoaded: Boolean = false;
  // user: any;

  constructor(public navCtrl:NavController, public platform:Platform, public modalCtrl:ModalController, private eventData:EventData) {
    // this.events = eventData.events;
    this.eventMarkers = new Map<any, any>();

    // NativeStorage.getItem('user')
    // .then(function (data) {
    //     this.user = {
    //         id: data.id,
    //         name: data.name,
    //         gender: data.gender,
    //         picture: data.picture
    //     };
    // }.bind(this));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    let lat = 33.7818079;
    let long = -84.3973634;

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
              "color": "#222638"
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

    this.mapLoaded = true;
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
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
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

  createEventMarker(event) {
    let lat = event.lat;
    let long = event.lon;

    let latLng = new google.maps.LatLng(lat, long);

    var iconBase = "../assets/icon/"

    // switch (event.category) {
    //   case 'Comedy':
    //     break;
    //   case 'Theater/Dance':
    //     break;
    //   case 'Art/Film':
    //     break;
    //   case 'Music':
    //     break;
    //   case 'Sports/Recreation':
    //     break;
    //   case 'Food/Drink':
    //     break;
    //   case 'Games':
    //     break;
    //   case 'Info-session/Seminar':
    //     break;
    //   case 'Parties/Nightlife':
    //     break;
    // }

    var icons = {
          'Comedy': {
            icon: iconBase + 'comedy.png'
          },
          'Theater/Dance': {
            icon: iconBase + 'theatre.png'
          },
          'Art/Film': {
            icon: iconBase + 'film.png'
          },
          'Music': {
            icon: iconBase + 'music.png'
          },
          'Sports/Recreation': {
            icon: iconBase + 'sports.png'
          },
          'Food/Drink': {
            icon: iconBase + 'food.png'
          },
          'Games': {
            icon: iconBase + 'games.png'
          },
          'Info-session/Seminar': {
            icon: iconBase + 'info.png'
          },
          'Parties/Nightlife': {
            icon: iconBase + 'party.png'
          }
        };

    // console.log(event);
    // console.log(icons[event.category]);

    let eventMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
         path: google.maps.SymbolPath.CIRCLE,
         scale: 10,
         fillOpacity: 1,
         strokeWeight: 2,
         fillColor: '#ff0000',
         strokeColor: '#fff'
       },
      title: event.name,
    });

    eventMarker.setMap(this.map);

    var eventDetailsModal = this.modalCtrl.create(EventDetails, {event: event});
    eventDetailsModal.onDidDismiss(eventDetails => {
      eventDetailsModal = this.modalCtrl.create(EventDetails, {event: eventDetails});
    });

    eventMarker.addListener('click', function () {
      eventDetailsModal.present();
    });

    this.eventMarkers[event] = eventMarker;

    /*
    if (event.category == "Games") {
      this.eventMarkers[event].setMap(null);
    }
    */
  }

  removeEventMarker(event) {
    if (this.eventMarkers[event] != null) {
      this.eventMarkers[event].setMap(null);
      this.eventMarkers[event] = null;
    }
  }

  ngOnChanges(changes:SimpleChanges) {
    //console.log("Changes: " + JSON.stringify(changes));

    if (this.mapLoaded) {
      if (changes['filters'] != null || typeof changes['filters'] != 'undefined') {
        for (let event of this.events) {
          //console.log("indexOf: " + changes['filters'].currentValue.indexOf(event.category));
          //console.log(event.category);
          if (changes['filters'].currentValue.indexOf(event.category) >= 0) {
            //console.log("add marker");
            if (this.eventMarkers[event] != null) {
              this.createEventMarker(event);
            }
          } else {
            //console.log("remove marker");
            this.removeEventMarker(event);
          }
        }
      }
      if (changes['events'] != null || typeof changes['events'] != 'undefined') {
        for (let event of this.events) {
          this.createEventMarker(event);
        }
      }

    }

    if (changes['friends'] != null) {
      console.log("changed:" + changes['friends'].currentValue);

      var friend = changes['friends'].currentValue;
      if (friend != null) {
        // console.log("changed:" + friend.name);
        this.showFriendMarker(friend);
      }
    }
  }

  showFriendMarker(friend) {
    var latLng = new google.maps.LatLng(friend.latitude, friend.longitude);
    let friendMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillOpacity: 1,
        strokeWeight: 2,
        fillColor: '#00ff00',
        strokeColor: '#fff'
      },
      title: friend.name,
    });
    console.log("friend marker: " + friendMarker);
    friendMarker.setMap(this.map);

    this.map.setCenter(latLng);

    var friendDetailsModal = this.modalCtrl.create(FriendDetailsMap, friend);
    friendDetailsModal.onDidDismiss(friendDetails => {
      friendDetailsModal = this.modalCtrl.create(FriendDetailsMap, friendDetails);
    });

    friendMarker.addListener('click', function () {
      friendDetailsModal.present();
    });
    this.friendMarkers[friend] = friendMarker;
  }
}

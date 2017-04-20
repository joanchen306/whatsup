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
            icon: 'https://lh6.googleusercontent.com/oCYEqOozQCXcS8dg8T1sAbzSEcndneOz-5nElxfwgRd53hwGxto9l9dxnnBF2-VYmPv0OnOkCwp3PGI=w2556-h1398' //blue/green #009A9A
          },
          'Theater/Dance': {
            icon: 'https://lh5.googleusercontent.com/-VkTjW2on55-99Rj-8VhsleHAxk87uERZ-G2mH1pmHtG7eFTkbuTtPoB9Vu2_x3PyuUSPwXUDia9KHA=w2556-h1398' //pink #A90067
          },
          'Art/Film': {
            icon: 'https://lh5.googleusercontent.com/5ruRNMWkNW8YAa8ze9LXTM5wRd96FZR6Fp790AyugwXa0sSPSSrpEzEJ-wH788wG0h3bccscE4ip91Q=w2556-h1398' //black #000000
          },
          'Music': {
            icon: 'https://lh5.googleusercontent.com/fWBVYC6FsqKtERCk9emy41q4M0O6RLIayV7DIWwFFCXWkJg5F5_htK-16iyJ7W7Gdtjb7Jna7moKCbw=w2556-h1398' //red #C00000
          },
          'Sports/Recreation': {
            icon: 'https://lh6.googleusercontent.com/M4OWlJUNU6GKWAAuvPHvase2SJcx1lL7sD0lOxRWSFJ833BdzoWlrcKZhC0JFGvFbf7pG6ICmUCh7yc=w2556-h1398' //orange #F57A1C
          },
          'Food/Drink': {
            icon: 'https://lh4.googleusercontent.com/tQ0yCi8xBFBB7tOSVK-rq45Cl1Ld1zwXwq3cgKKFyqwA9nUDcrvO93-v6eGNUkAPjPG4fjHSJtZrcWI=w2556-h1398' //green  #67A900
          },
          'Games': {
            icon: 'https://lh3.googleusercontent.com/DouWISMDz692c4GtEU6FOTgBW4fgxrI61tSJxfD6LfRupzZ2Y3nCiDTg0x8GY1g7ckH6amBYbIQqNnA=w2556-h1398' //yellow #F5E71C
          },
          'Info-Session/Seminar': {
            icon: 'https://lh3.googleusercontent.com/2jkJ5o5GtC8k6Rrz8m--itO0JXNGYsfVEJjgfPqYPG1h7RnZXO-utfWkQeGPk3TR1D_-w5MRzzHd_LI=w2556-h1398'  //blue  #0096F6
          },
          'Parties/Nightlife': {
            icon: 'https://lh3.googleusercontent.com/bENJsMwIGVUHePcuty3ua5PjtWXnc2E3nlpsu7SlMLkye_8CpLqZ1avJ_Oz7R7jM_JMKS9ppBRRUqFc=w2556-h1398'  //purple  #710AAE
          }
        };

     console.log(event);
     console.log(event.category_id);

    let eventMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: icons[event.category].icon,
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
    var latLng = new google.maps.LatLng(friend.lat, friend.lng);
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

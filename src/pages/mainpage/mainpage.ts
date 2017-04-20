import {Component, ViewChild} from "@angular/core";
import {NavController, Slides, NavParams, ModalController} from "ionic-angular";
import {FacebookService} from "../../services/facebook.service";
import {FilterPage} from "../filter/filter";
import {EventProvider} from '../../providers/event-provider';
import {calcCrow} from "../../services/getDistance";
import {categorize} from "../../services/getCategory"
import {FriendProvider} from "../../providers/friend-provider";

@Component({
  selector: 'main-page',
  templateUrl: 'mainpage.html',
  providers: [FacebookService, EventProvider, FriendProvider]
})
export class MainPage {
  data:any;
  userId:string;
  friendsSharingLocation;
  filters = [
    'Comedy',
    'Theater/Dance',
    'Art/Film',
    'Music',
    'Sports/Recreation',
    'Food/Drink',
    'Games',
    'Info-Session/Seminar',
    'Parties/Nightlife'
  ];
  events = [];
  friends = [];
  @ViewChild(Slides) slides:Slides;

  FRIENDS_SLIDE_INDEX:number = 0;
  MAP_SLIDE_INDEX:number = 1;
  EVENTS_LIST_SLIDE_INDEX:number = 2;

  constructor(public navParams:NavParams, public navCtrl:NavController,
              public facebookService:FacebookService, public modalCtrl:ModalController,
              private eventProvider:EventProvider, private friendProvider:FriendProvider) {
    this.userId = navParams.data;
    this.navCtrl = navCtrl;
    this.modalCtrl = modalCtrl;
    eventProvider.getJsonData().subscribe((res)=> {
      console.log(res);
      this.events = res;
    });
    friendProvider.getFriendJSON(this.userId).subscribe((res) => {
      this.friends = res;
    });
  }

  goToSlide(slideIndex) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideIndex, 500);
  }

  onSlideDidChange() {

    if (this.slides.getActiveIndex() == this.MAP_SLIDE_INDEX) {
      this.slides.lockSwipes(true);
    } else {
      this.slides.lockSwipes(false);
    }
    this.eventProvider.getJsonData();
  }

  // launchEventFilterModal() {
  //   this.navCtrl.push(FilterPage)
  // }
  launchEventFilterModal() {
    let eventFilterModal = this.modalCtrl.create(FilterPage, {'filters': this.filters});
    eventFilterModal.onDidDismiss(data => {
      if (data != null) {
        this.filters = data.filters;
        console.log(data);
      }
    });
    eventFilterModal.present();
  }

  handleFriendRequested(friend) {
    //TODO handle friend request
    console.log("event heard:" + JSON.stringify(friend))
    this.friendsSharingLocation = friend;
    this.goToSlide(1);
  }

  handleEventsUpdate(events) {
    console.log("events" + events);
    // this.events = events;
  }


  isSelected(filter) {
    return (this.filters.indexOf(filter) != -1);
  }
}

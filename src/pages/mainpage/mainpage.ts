import {Component, ViewChild} from "@angular/core";
import {NavController, Slides, NavParams, ModalController} from "ionic-angular";
import {FacebookService} from "../../services/facebook.service";
import {FilterPage} from "../filter/filter";

@Component({
  selector: 'main-page',
  templateUrl: 'mainpage.html',
  providers: [FacebookService]
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
  @ViewChild(Slides) slides:Slides;

  FRIENDS_SLIDE_INDEX:number = 0;
  MAP_SLIDE_INDEX:number = 1;
  EVENTS_LIST_SLIDE_INDEX:number = 2;

  constructor(public navParams:NavParams, public navCtrl:NavController, public facebookService:FacebookService, public modalCtrl:ModalController) {
    this.userId = navParams.data;
    this.navCtrl = navCtrl;
    this.modalCtrl = modalCtrl;
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
  }

  // launchEventFilterModal() {
  //   this.navCtrl.push(FilterPage)
  // }
  launchEventFilterModal() {
    let eventFilterModal = this.modalCtrl.create(FilterPage);
    eventFilterModal.onDidDismiss(data => {
      this.filters = data.filters;
      console.log(data.filters);
    });
    eventFilterModal.present();
  }

  handleFriendRequested(friend) {
    //TODO handle friend request
    console.log("event heard:"+JSON.stringify(friend))
    this.friendsSharingLocation = friend;
    this.goToSlide(1);
  }

  isSelected(filter) {
    return (this.filters.indexOf(filter) != -1);
  }
}

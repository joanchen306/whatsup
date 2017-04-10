import {Component, ViewChild, Input} from "@angular/core";
import {Nav, NavController, Slides, NavParams, ViewController} from "ionic-angular";
import {FacebookService} from "../../services/facebook.service";
import {NativeStorage} from "ionic-native/dist/es5/index";
import {EnvironmentVariable} from "../../environment/environment_variables";

@Component({
  selector: 'filter-page',
  templateUrl: 'filter.html',
})
export class FilterPage {
  data:any;
  userId:string;
  selectedFilters: Array<string> = [];
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

  constructor(public navParams:NavParams, public navCtrl:NavController, public viewCtrl: ViewController) {
    this.userId = navParams.data;
    this.viewCtrl = viewCtrl;
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
  addFilter(filter) {
    console.log(filter);
    console.log(this.selectedFilters);
    var index = this.selectedFilters.indexOf(filter);
    if (index > -1) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(filter);

    }
  }
  dismiss() {
    this.viewCtrl.dismiss({
      filters: this.selectedFilters
    });
  }
}

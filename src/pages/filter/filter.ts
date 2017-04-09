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
  selectedFilters = ['afilter'];

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

  dismiss() {
    this.viewCtrl.dismiss({
      filters: this.selectedFilters
    });
  }
}

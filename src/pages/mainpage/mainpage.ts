import {Component, ViewChild, Input} from "@angular/core";
import {NavController, Slides, NavParams} from "ionic-angular";
import {FacebookService} from "../../services/facebook.service";
import {NativeStorage} from "ionic-native/dist/es5/index";
import {EnvironmentVariable} from "../../environment/environment_variables";

@Component({
  selector: 'main-page',
  templateUrl: 'mainpage.html',
  providers: [FacebookService]
})
export class MainPage {
  data:any;
  userId:string;

  @ViewChild(Slides) slides:Slides;

  FRIENDS_SLIDE_INDEX:number = 0;
  MAP_SLIDE_INDEX:number = 1;
  EVENTS_LIST_SLIDE_INDEX:number = 2;

  constructor(public navParams:NavParams, public navCtrl:NavController, public facebookService:FacebookService) {
    alert("NavParams: " + JSON.stringify(navParams));
    this.userId = navParams.data;
  }

  goToSlide(slideIndex) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideIndex, 500);
  }

  onSlideDidChange() {
    alert("In if statement");
    alert("UserId: " + this.userId);
    this.facebookService.getFriends(this.userId);

    if (this.slides.getActiveIndex() == this.MAP_SLIDE_INDEX) {
      this.slides.lockSwipes(true);
    } else {
      this.slides.lockSwipes(false);
    }
  }
}

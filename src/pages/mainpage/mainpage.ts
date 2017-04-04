import {Component, ViewChild} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {FacebookService} from "../../services/facebook.service";
import {NativeStorage} from "ionic-native/dist/es5/index";

@Component({
  selector: 'main-page',
  templateUrl: 'mainpage.html',
  providers: [FacebookService]
})
export class MainPage {
  data:any;

  @ViewChild(Slides) slides:Slides;

  FRIENDS_SLIDE_INDEX:number = 0;
  MAP_SLIDE_INDEX:number = 1;
  EVENTS_LIST_SLIDE_INDEX:number = 2;

  constructor(public navCtrl:NavController, private facebookService:FacebookService) {
  }

  ngOnInit() {
    this.data = this.facebookService.getFriends("TEST");
    alert(this.data);
  }

  goToSlide(slideIndex) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideIndex, 500);
  }

  onSlideDidChange() {
    NativeStorage.getItem('user')
      .then(function (data) {

        let user = {
          id: data.id,
          name: data.name,
          gender: data.gender,
          picture: data.picture
        };

        if (user != null) {
          alert("In if statement");
          alert(this);
          this.facebookService.getFriends(user.id);
        }
      });

    if (this.slides.getActiveIndex() == this.MAP_SLIDE_INDEX) {
      this.slides.lockSwipes(true);
    } else {
      this.slides.lockSwipes(false);
    }
  }
}

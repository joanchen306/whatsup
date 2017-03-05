import { Component } from '@angular/core';

import { NavController, Slides } from 'ionic-angular';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: 'mainpage.html'
})
export class MainPage {

  @ViewChild(Slides) slides: Slides;

  FRIENDS_SLIDE_INDEX: number = 0;
  MAP_SLIDE_INDEX: number = 1;
  EVENTS_LIST_SLIDE_INDEX: number = 2;

  constructor(public navCtrl: NavController) {
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
}

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { EventsPage } from '../pages/events/events';
import { FriendsPage } from '../pages/friends/friends';
import { MapPage } from '../pages/map/map';
import { MainPage } from '../pages/mainpage/mainpage';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'WhatsApp', component: EventsPage },
      { title: 'Friends', component: FriendsPage },
      { title: 'Map', component: MapPage },
      { title: 'Login', component: LoginPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
      NativeStorage.getItem('user')
      .then( function (data) {
        //User was previously logged in
        env.nav.push(MainPage);
        Splashscreen.hide();
      }, function (error) {
        //User data not found locally
        env.nav.push(LoginPage);
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

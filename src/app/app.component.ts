import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar, Splashscreen, NativeStorage} from "ionic-native";
import {EventsPage} from "../pages/events/events";
import {FriendsPage} from "../pages/friends/friends";
import {MapPage} from "../pages/map/map";
import {MainPage} from "../pages/mainpage/mainpage";
import {LoginPage} from "../pages/login/login";
import {FilterPage} from "../pages/filter/filter";
import {FriendDetails} from "../pages/friendDetails/friendDetail";
import {EventDetails} from "../pages/eventdetails/eventdetails";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  userId:string;

  rootPage:any = MainPage;

  pages:Array<{title:string, component:any}>;

  constructor(public platform:Platform) {

    // used for an example of ngFor and navigation
    this.pages = [
      // {title: 'Login', component: LoginPage},
      {title: 'WhatsApp', component: EventsPage},
      {title: 'Friends', component: FriendsPage},
      {title: 'Map', component: MapPage}
    ];

    this.initializeApp();
  }

  initializeApp() {
    let permissions = ["public_profile", "user_events", "user_friends"];
    this.platform.ready().then(() => {
      // // Okay, so the platform is ready and our plugins are available.
      // // Here you can do any higher level native things you might need.
      // let env = this;
      // NativeStorage.getItem('user')
      //   .then(function (data) {
      //     //User was previously logged in
      //     // TODO: Trigger Facebook login refresh
      //     env.nav.push(MainPage, data.id);
      //     Splashscreen.hide();
      //   }, function (error) {
      //     //User data not found locally
      //     Splashscreen.hide();
      //   });
      Splashscreen.hide();

      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

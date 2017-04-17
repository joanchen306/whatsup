import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {CloudSettings, CloudModule} from "@ionic/cloud-angular";
import {MyApp} from "./app.component";
import {EventsPage} from "../pages/events/events";
import {FriendsPage} from "../pages/friends/friends";
import {MapPage} from "../pages/map/map";
import {MainPage} from "../pages/mainpage/mainpage";
import {LoginPage} from "../pages/login/login";
import {FacebookService} from "../services/facebook.service";
import {EventProvider} from "../providers/event-provider";

import {FilterPage} from "../pages/filter/filter";
import {FriendDetails} from "../pages/friendDetails/friendDetails";
import {EventDetails} from "../pages/eventdetails/eventdetails";
import {FriendDetailsMap} from "../pages/frienddetailsmap/friendDetailsMap";

const cloudSettings:CloudSettings = {
  'core': {
    'app_id': '90d65db5'
  },
  'auth': {
    'facebook': {
      'scope': ['public_profile']
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    EventsPage,
    FriendsPage,
    MapPage,
    MainPage,
    LoginPage,
    FilterPage,
    FriendDetails,
    FriendDetailsMap,
    EventDetails
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventsPage,
    FriendsPage,
    MapPage,
    MainPage,
    LoginPage,
    FilterPage,
    FriendDetails,
    FriendDetailsMap,
    EventDetails
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookService, EventProvider],
})
export class AppModule {
}

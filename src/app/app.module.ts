import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { EventsPage } from '../pages/events/events';
import { FriendsPage } from '../pages/friends/friends';
import { MapPage } from '../pages/map/map';
import { MainPage } from '../pages/mainpage/mainpage';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '90d65db5'
  }
}

@NgModule({
  declarations: [
    MyApp,
    EventsPage,
    FriendsPage,
    MapPage,
    MainPage
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
    MainPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

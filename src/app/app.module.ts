import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import { MapPage } from '../pages/map/map';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '90d65db5'
  }
}

@NgModule({
  declarations: [
    MyApp,
    Page2,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page2,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

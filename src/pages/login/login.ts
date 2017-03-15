import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { MainPage } from '../mainpage/mainpage';``

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  FB_APP_ID: number = 1455058531172420;

  constructor(public navCtrl: NavController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  facebookLogin() {
    let nav = this.navCtrl;
    let permissions = ["public_profile", "user_events", "user_friends"];

    Facebook.login(permissions)
    .then( function (response) {
      console.log('login success');
      console.log(response);

      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=id,name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          id: user.id,
          name: user.name,
          gender: user.gender,
          picture: user.picture,
        })
        .then(function(){
          nav.push(MainPage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function (error) {
      console.log(error);
    })
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Facebook, NativeStorage } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the FriendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FriendProvider {
  data: any;
  user: any;

  constructor(public http: Http) {
    this.data = null;
  }

  public getAllFriends(): string[] {
    this.user = NativeStorage.getItem('user');

    if (this.user != null) {
      Facebook.api("/" + this.user.id + "/friends", [])
        .then(function(friends) {
          alert("Provider received: " + friends);
          return friends;
        }, function (error) {
          alert("ERROR: " + error + " USERID: " + this.user.id);
          return null;
        });
    }

    return null;
  }

  getFriend(id) {
    // TODO
  }


}

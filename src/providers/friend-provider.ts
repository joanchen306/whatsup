import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Facebook, NativeStorage} from "ionic-native";
import "rxjs/add/operator/map";

/*
 Generated class for the FriendProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FriendProvider {
  data:any;

  constructor(public http:Http) {
    this.data = null;
  }

  public getAllFriends(friendsList) {
    var user = {id: "", name: "", gender: "", picture: ""};

    NativeStorage.getItem('user')
      .then(function (data) {
        alert("data: " + JSON.stringify(data));
        alert("data id: " + data.id);

        user = {
          id: data.id,
          name: data.name,
          gender: data.gender,
          picture: data.picture
        };

        alert("USER ID: " + user.id);

        if (user != null) {
          Facebook.api("/" + user.id + "/friends", [])
            .then(function (friends) {
              alert("Provider received: " + JSON.stringify(friends));
              friendsList = friends;
            }, function (error) {
              alert("ERROR: " + error + " USERID: " + user.id);
            });
        }
      }, function (error) {
        console.log(error);
        alert("error storage: " + error);
      });
  }

  getFriend(id) {
    // TODO
  }

}

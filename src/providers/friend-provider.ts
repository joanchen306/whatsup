import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Facebook} from "ionic-native/dist/es5/index";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FriendProvider {
  friends = {};

  constructor() {
  }

  public getFriendJSON(userId:string) {
    return Observable.fromPromise(Facebook.api("/" + userId + "/friends", []))
      .map((response) => {
        return response;
      })
      .map((response) => {
        var friends = [];
        response.data.forEach((friend) => {
          var rand =
            friends.push({
              'name': friend.name,
              'id': friend.id,
              'lat': 33.78130,
              'lng': -84.402112,
              'available': true,
            });
        });
        return friends;
      });
  }
}

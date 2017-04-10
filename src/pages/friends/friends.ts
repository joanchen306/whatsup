import {Component, Input} from "@angular/core";
import {NavController, NavParams, ModalController} from "ionic-angular";
import {FriendData} from "../../data/friendData";
import {FriendDetails} from "../friendDetails/friendDetails";

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html',
  providers: [FriendData]
})
export class FriendsPage {
  friends:any[];
  @Input() filters:any[];
  @Input() userId:string;

  constructor(public navCtrl:NavController, public navParams:NavParams, private friendData:FriendData, private modalCtrl:ModalController) {
    this.friends = friendData.friends;
  }

  friendTapped(friend) {
    let friendDetailsModal = this.modalCtrl.create(FriendDetails, friend);
    friendDetailsModal.onDidDismiss(data => {
      // TODO:
      if (data.locationRequested) {
        // TODO: Show location
      }
    });
    friendDetailsModal.present();
  }
}

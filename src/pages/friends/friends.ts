import {Component, Input} from "@angular/core";
import {NavController, NavParams, ModalController} from "ionic-angular";
import {Observable} from "rxjs/Rx";
import {FacebookService} from "../../services/facebook.service";
import {Http} from "@angular/http";
import {FriendData} from "../../data/friendData";
import {FriendDetails} from "../friendDetails/friendDetails";

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html',
  providers: [FriendData]
})
export class FriendsPage {
  selectedItem:any;
  friends:any[];
  public friendsObservable:Observable<any[]>;
  @Input() userId:string;

  constructor(public navCtrl:NavController, public navParams:NavParams, private friendData:FriendData, private modalCtrl: ModalController) {
    this.friends = friendData.friends;
  }

  itemTapped(item) {
    alert("ITEM TAPPED");
    let friendDetailsModal = this.modalCtrl.create(FriendDetails,
      item.name);
    friendDetailsModal.present();
  }
}

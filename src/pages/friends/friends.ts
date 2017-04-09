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

<<<<<<< HEAD
  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(Page2, {
  //     item: item
  //   });
  // }

=======
  itemTapped(item) {
    let friendDetailsModal = this.modalCtrl.create(FriendDetails,
      item.name);
    friendDetailsModal.present();
  }
>>>>>>> f27930491cfcb3616b15682dc861c5270c7241dd
}

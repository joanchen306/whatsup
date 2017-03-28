import {Component} from "@angular/core";
import {FriendProvider} from "../../providers/friend-provider";
import {NavController, NavParams} from "ionic-angular";
import {Facebook, NativeStorage} from "ionic-native";

@Component({
  selector: 'friends-list',
  templateUrl: 'friends.html',
  providers: [FriendProvider]
})
export class FriendsPage {
  selectedItem:any;
  friendsIds:string[];
  icons:string[];
  fnames:string[];
  lnames:string[];
  tf:boolean[];
  friends:Array<{name:string, active:boolean, distance:number, icon:string}>;

  constructor(public navCtrl:NavController, public navParams:NavParams, public friendProvider:FriendProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    var user = {id: "", name: "", gender: "", picture: ""};
    this.friends = [];
    this.tf = [true, false];
    let friendsData = {
      data: [
          {name: "Will Christian", id: "10155132584509579"},
          {name: "Brandi Van de Houten",id:"10211792738116830"},
          {name:"Joan Chen",id:"1490713480948336"},
          {name:"Aaron Parry", id:"1643380619020632"}
        ],
        paging:{
          cursors:{
            before:"QVFIUkc2N1VWZAXlmbzhrS3haMDBhUFEzcFpHSEQxSlc4cklNVENzelZAMMVhENjYwbjk3Qk1qZAGtRZAmdISE5YdllqVEEZD",
            after:"QVFIUnJRTEd3NnNhcUg3WTVoY2hUNkhjbHl2MEFMMzNKVkt5RmRUbmhabDhDU3c4ekZAXOEhRWG82ZAnpncnAtQlZAnZAEhqYV9udWRmX3llcnFtYl9DVFV6SXFB"
          }
        },
        summary:{
          total_count:744
        }
      };

    // NativeStorage.getItem('user')
    //   .then(function (data) {
    //     alert("data: " + JSON.stringify(data));
    //
    //     user = {
    //       id: data.id,
    //       name: data.name,
    //       gender: data.gender,
    //       picture: data.picture
    //     };
    //
    //     if (user != null) {
    //       Facebook.api("/" + user.id + "/friends", [])
    //         .then(function (friends) {
    //           alert("Provider received: " + JSON.stringify(friends));
    //           console.log(JSON.stringify(friends));
    //           // for (let i = 0; i < friends.data.length; i++) {
    //           //   this.friends.push({
    //           //     name: friends.data[i].name,
    //           //     active: this.tf[Math.floor(Math.random() * this.tf.length)],
    //           //     distance: 0,
    //           //     icon: ''
    //           //   });
    //           // }
    //         }, function (error) {
    //           alert("ERROR: " + error + " USERID: " + user.id);
    //         });
    //     }
    //   }, function (error) {
    //     console.log(error);
    //     alert("error storage: " + error);
    //   });

    for (let i = 0; i < 4; i++) {
      this.friends.push({
        name: friendsData.data[i].name,
        active: this.tf[Math.floor(Math.random() * this.tf.length)],
        distance: 0,
        icon: ''
      });
    }
  }

    // itemTapped(event, item) {
    //   // That's right, we're pushing to ourselves!
    //   this.navCtrl.push(Page2, {
    //     item: item
    //   });
    // }
  }

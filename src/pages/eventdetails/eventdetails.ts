import { NavParams }  from "ionic-angular";

import { Component } from '@angular/core';

@Component({
  selector: 'eventdetails-page',
  templateUrl: 'eventdetails.html'
})
export class EventDetails {

    constructor(params: NavParams) {
        console.log('UserId', params.get('userId'));
    }
}
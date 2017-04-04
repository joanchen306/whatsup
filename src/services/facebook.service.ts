import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class FacebookService {

  private accessToken = 'EAACEdEose0cBAMR4BmdM3kh6uYPFAYVOPZAjHZCrBB19Yaee2B9ZAialtVIfUTXaZBMpdV18W3IbLCXKXnShPmvYYWYZB4aus0vFlZCMIiFtHErsfkMAjgNQaRKf5BZCP5U5AZCnZBlozb14ObFJkoaEt2NjlUR5nuwza4eK6J6MAyKQb5xRSuAoC';

  private graphUrl = 'https://graph.facebook.com/v2.8/';
  private friendsQuery = '/friends';
  private graphQuery = `?access_token=${this.accessToken}&date_format=U&fields=posts{from,created_time,message,attachments}`;

  constructor(private http:Http) {
  }

  public getFriends(userId:string):Observable<any[]> {
    let url = this.graphUrl + userId + this.friendsQuery;

    alert("Url: " + url);
    return this.http
      .get(url)
      .map(response => {
        alert(response.json());
        return response.json().data;
      });
  }
}

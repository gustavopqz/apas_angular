import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = 'https://graph.instagram.com/me/media?access_token=IGQWROY2IwOG85ZAldPT0NibklubWoybGpWYnBtUXZAONzBqVzNFN21DMHZAqRE5GZAGhvT0p3c2R4VW1rYmY0b1RuX3NHV2FoakVXOTVBVXB4eXZA4anZAPdGF4LU1ObEoxenEzQzRpcjR5bDBPVDd2NWVSSm5ObWlnMXcZD&fields=media_url,media_type,caption,permalink'

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

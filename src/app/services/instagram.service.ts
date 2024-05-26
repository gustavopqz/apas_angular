import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = 'https://graph.instagram.com/me/media?access_token=IGQWRQYzRleUJ5VmtBWWxMbGlBWl80UXRaMXhPZA051WTU5Qk1xaWRCSEFua3ZATdzAwMnJvTHM1MDJfaHFURFVzN053UzgwZA0NncVRNWWxPOGZAnZA0x5NjRaUmNDUU93eW0xVEZADVU1SMDJnTnpvbUIwemtSeG1jODQZD&fields=media_url,media_type,caption,permalink'

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

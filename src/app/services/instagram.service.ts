import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = 'https://graph.instagram.com/me/media?access_token=IGQWRNWmFEaDVoQ3Fucmk2cFF3VktDNEZADNHBiUGJERGNMQkpTRWd4Q0tQUWZApS1hWNWtsWGNzV1VMQzZAobFVsVzFiVi05T0JwY3NmU01EdkgxanotbnhWMzlPMWtVT0V1WUdFUjNNcHp3bF9fY2xFZAjhkSG9MUDgZD&fields=media_url,media_type,caption,permalink'

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

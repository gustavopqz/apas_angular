import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = 'https://graph.instagram.com/me/media?access_token=IGQWRPTWRRQTk0NGlhVk9HaWtoeDJDV2ZABd3dacHVIOFhBTm9NVUw3WHBDZAmV5SlA3TlRfdUF0OHY3Qks2aHczbE9wX0s3WU9IM0ZALQVREQkY2SkFwZA2RHbjdMd3FnVVJZAYWxCa2RrUFNZAMFMwZAXJ5WXlmdzR3RUkZD&fields=media_url,media_type,caption,permalink'

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

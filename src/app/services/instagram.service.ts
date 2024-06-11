import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = 'https://graph.instagram.com/me/media?access_token=IGQWRPYUw4QUF3YTdTMWNRRWhwdE1PRktwNjBNZAkRISjRXQk5RekFLUXhYT2RSUzJnckpJem5HNUxKajNhTG4xWEdnYjdOcExJWlJiV3g2eG5ReXpTQ3E3NzdoUDRwckNVWkFDcTB5MFh0RnAtYWk4aE1DdG1ZATlUZD&fields=media_url,media_type,caption,permalink'

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

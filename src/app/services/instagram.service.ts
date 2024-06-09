import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = 'https://graph.instagram.com/me/media?access_token=IGQWRQYkJuMmhzaXN0ZA1g0Skp5bmg2S1dLUHFYTm9lNmFvNjNJUU5iVTQ3bDNGd203MGZAJbnM1NEYxLWItSWRLRk9hZAGtOOFkycDE3b0xJUml3QVZAnSzYtbE5UOTRRdUVhcWhOMmxqM21FbzhGUGl6Wi1wVko5cDAZD&fields=media_url,media_type,caption,permalink'

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstaData } from '../modules/InstaData.module'; 

// Enviroment variable
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private url:string = environment.apiBaseUrl + '/instagram';

  constructor(private httpCLient: HttpClient) {
    
  }

  getPosts() :Observable<InstaData> {
    return this.httpCLient.get<InstaData>(this.url)
  }
}

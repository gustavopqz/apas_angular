import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecuperaService {

  constructor(private http: HttpClient) { }

  async postEnviaRecuperaReq(email: any){
    const body = {
      email
    }

    return await this.http.post('http://localhost:9000/recupera/', body).toPromise();
  }
}

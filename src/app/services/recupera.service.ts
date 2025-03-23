import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperaService {

  constructor(private http: HttpClient) { }

  async postEnviaRecuperaReq(email: any){
    const body = {
      email
    }

    return await this.http.post( environment.apiBaseUrl + '/recupera/', body).toPromise();
  }

  async validaToken(token: any){
    const body = {
      token
    }

    return await this.http.post( environment.apiBaseUrl + '/recupera/valida-token', body).toPromise();
  }

  async conclusao(email :string, senha: string | undefined){
    const body = {
      email,
      senha
    }

    return await this.http.post( environment.apiBaseUrl + '/recupera/conclusao', body).toPromise();
  }
}

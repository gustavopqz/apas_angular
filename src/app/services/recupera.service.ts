import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperaService {

  constructor(private http: HttpClient) { }

  async postEnviaRecuperaReq(email: any) {
    const token = localStorage.getItem('token') || '';
    const body = { email };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return await this.http.post(
      `${environment.apiBaseUrl}/recupera/`,
      body,
      { headers }
    ).toPromise();
  }

  async validaToken(token: any) {
    const tokenAuth = localStorage.getItem('token') || '';
    const body = { token };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenAuth}`);

    return await this.http.post(
      `${environment.apiBaseUrl}/recupera/valida-token`,
      body,
      { headers }
    ).toPromise();
  }

  async conclusao(email: string, senha: string | undefined) {
    const token = localStorage.getItem('token') || '';
    const body = { email, senha };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return await this.http.post(
      `${environment.apiBaseUrl}/recupera/conclusao`,
      body,
      { headers }
    ).toPromise();
  }

}

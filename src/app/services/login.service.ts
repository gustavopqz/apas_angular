import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginInfo = new BehaviorSubject<any>({
    text: 'LOGIN'
  })

  get loginInfo(): any{
    return this._loginInfo.value;
  }

  set loginInfo(loginInfo: any){
    this._loginInfo.next(loginInfo);
  }

  constructor(private http: HttpClient) { }

  // LogIn
  resposta?: any;
  usuario?: any = null;

  async logar(body: any): Promise<any>{
    const response = await this.http.post( environment.apiBaseUrl + '/login', body).toPromise();
    
    this.usuario = response;

    if (!this.usuario.email){
      return false;
    }

    localStorage.setItem('nome', this.usuario.nome);
    localStorage.setItem('email', this.usuario.email);
    localStorage.setItem('privilegio', this.usuario.privilegio);
    localStorage.setItem('img', this.usuario.img);
    localStorage.setItem('logado', 'true');
    localStorage.setItem('token', this.usuario.token);

    this.loginInfo = {
      text: this.usuario.nome
    }

    return true;
  }

  async getImagem(email: string | null, privilegio: string | null) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  if (email) {
    if (privilegio === 'comum') {
      const response = await this.http.get<any>(`${environment.apiBaseUrl}/usuarios?email=${email}`, { headers }).toPromise();
      this.resposta = response;
    } else {
      const response = await this.http.get<any>(`${environment.apiBaseUrl}/administradores?email=${email}`, { headers }).toPromise();
      this.resposta = response;
    }

    if (this.resposta && this.resposta.img) {
      return this.resposta.img;
    } else {
      return 'user.png';
    }
  }

  return 'user.png';
}

  async getUsuarioPorEmail(email: string | null){
    return await this.http.get<any>(`${environment.apiBaseUrl}/usuarios?email=${email}`).toPromise();
  }
}

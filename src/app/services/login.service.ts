import { HttpClient } from '@angular/common/http';
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

    this.loginInfo = {
      text: this.usuario.nome
    }

    return true;
  }

  async getImagem(email: string | null, privilegio: string | null){
    if (email){
      if (privilegio == 'comum'){
        const response = await this.http.get(`${environment.apiBaseUrl}/usuarios?email=${email}`).toPromise();
        this.resposta = response;
      }else {
        const response = await this.http.get(`${environment.apiBaseUrl}/administradores?email=${email}`).toPromise();
        this.resposta = response;
      }
      
      if (this.resposta.img)
      return this.resposta.img;
      else 
      return 'user.png';
    }

    return 'user.png';

  }

  async getUsuarioPorEmail(email: string | null){
    return await this.http.get<any>(`${environment.apiBaseUrl}/usuarios?email=${email}`).toPromise();
  }
}

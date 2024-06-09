import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  logado?: Boolean | undefined;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    if (localStorage.getItem('logado') == 'true'){
      this.logado = true;
    }
  }

  // LogIn
  resposta?: any;
  usuario?: any = null;

  async logar(body: any): Promise<any>{
    const response = await this.http.post('http://localhost:9000/login', body).toPromise();
    
    this.usuario = response;

    if (!this.usuario.email){
      return false;
    }

    localStorage.setItem('nome', this.usuario.nome);
    localStorage.setItem('email', this.usuario.email);
    localStorage.setItem('privilegio', this.usuario.privilegio);
    localStorage.setItem('img', this.usuario.img);
    localStorage.setItem('logado', 'true');

    this.logado = true;    

    return true;
  }
}

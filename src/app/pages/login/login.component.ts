import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Enviroment
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, FormsModule],
  providers: [NgModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  container: boolean = true;
  selectedImage: any = null;
  user: {username: string, email: string, password: string, confirmPassword: string} = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  trocaCard(){
    this.container = !this.container;
  }

  inputImg = 'Escolha sua foto';

  onSelectImage(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length){
      this.selectedImage = target.files[0];
      this.inputImg = target.files[0].name;
    } else {
      this.selectedImage = null;
    }
  }

  validaEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return emailRegex.test(email);
  }

  async onSubmit(){
    if (!this.user.username || !this.user.email || !this.user.password || !this.user.confirmPassword){
      alert('Campo(s) faltantes.');
      return;
    }

    if (this.user.password != this.user.confirmPassword){
      alert('Senhas não conferem.');
      return;
    }

    if (!this.validaEmail(this.user.email)){
      alert('E-mail inválido.');
      return;
    }

    const novoUsuario = {
      nome: this.user.username,
      email: this.user.email,
      senha: this.user.password
    }

    const existeEmail = await this.loginService.getUsuarioPorEmail(this.user.email);
    if (existeEmail.mensagem){
      alert('E-mail já existe!');
      return;  
    }

    this.uploadFile(novoUsuario);
  }

  resposta?: any;

  uploadFile(body: any) {
    if (this.selectedImage) {
      const formImg = new FormData();
      formImg.append('file', this.selectedImage);
  
      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.httpClient.post(`${environment.apiBaseUrl}/profile/`, formImg, { headers })
        .subscribe(response => {
          this.resposta = response;
          body.img = this.resposta.success;

          this.httpClient.post(`${environment.apiBaseUrl}/usuarios/cadastro`, body, { headers })
            .subscribe(response => {
              this.resposta = response;
              if (this.resposta.mensagem.includes('com sucesso')) {
                localStorage.setItem('nome', this.user.username);
                localStorage.setItem('email', this.user.email);
                localStorage.setItem('img', body.img);
                localStorage.setItem('privilegio', 'comum');
                localStorage.setItem('logado', 'true');
                localStorage.setItem('token', this.resposta.token);
                this.loginService.loginInfo = {
                  text: this.user.username
                };
                this.router.navigate(['/']);
              }
            });
        });

    } else {
      this.httpClient.post(`${environment.apiBaseUrl}/usuarios/cadastro`, body)
        .subscribe(response => {
          this.resposta = response;
          if (this.resposta.mensagem.includes('com sucesso')){
            localStorage.setItem('nome', this.user.username);
            localStorage.setItem('email', this.user.email);
            localStorage.setItem('img', 'user.png'),
            localStorage.setItem('privilegio', 'comum');
            localStorage.setItem('logado', 'true');
            localStorage.setItem('token', this.resposta.token);
            this.loginService.loginInfo = {
              text: this.user.username
            }
            this.router.navigate(['/'])
          }
        })
    }
  }

  constructor(private loginService: LoginService, private router: Router, private httpClient: HttpClient){}

  email?: string;
  senha?: string;

  async logIn(){
    const loginObj = {
      email: this.email,
      senha: this.senha
    }

    try {
      await this.loginService.logar(loginObj);  

      const privilegio = localStorage.getItem('privilegio');
      if (privilegio == 'admin') this.router.navigate(['/painel/home']);
      else this.router.navigate(['/']);
    } catch (error) {
      alert('Usuário ou senha incorretos.');
    }    
  }
}



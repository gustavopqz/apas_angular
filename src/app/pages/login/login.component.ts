import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

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

  onSubmit(){
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

    const formData = new FormData();
    formData.append('nome', this.user.username);
    formData.append('email', this.user.email);
    formData.append('senha', this.user.password);
    this.uploadFile(novoUsuario);
  }

  resposta?: any;

  uploadFile(body: any) {
    if (this.selectedImage) {
      const formImg = new FormData();
      formImg.append('file', this.selectedImage);
  
      this.httpClient.post('http://localhost:9000/profile/', formImg)
      .subscribe(response =>{
        this.resposta = response;
        body.img = this.resposta.success;
        this.httpClient.post('http://localhost:9000/usuario/cadastro', body)
        .subscribe(response => {
          this.resposta = response;
          if (this.resposta.mensagem.includes('com sucesso')){
            localStorage.setItem('nome', this.user.username);
            localStorage.setItem('email', this.user.email);
            localStorage.setItem('privilegio', 'comum');
            localStorage.setItem('logado', 'true');
            this.loginService.loginInfo = {
              text: this.user.username
            }
            this.router.navigate(['/'])
          }
        })
      });
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

    const tentaLogar = await this.loginService.logar(loginObj);
    if (!tentaLogar){
      alert('Usuário ou senha incorretos.');
    }else{
      const privilegio = localStorage.getItem('privilegio');
      if (privilegio == 'admin') this.router.navigate(['/painel/home']);
      else this.router.navigate(['/']);
    }
  }
}



import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'

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
  user: {username: string, email: string, password: string} = {
    username: '',
    email: '',
    password: '',
  };
  
  trocaCard(){
    this.container = !this.container;
  }

  onSelectImage(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length){
      this.selectedImage = target.files[0];
    } else {
      this.selectedImage = null;
    }
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('image',this.selectedImage);

  constructor(private loginService: LoginService, private router: Router){}

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
    }
  }
}



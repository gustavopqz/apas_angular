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

  trocaCard(){
    this.container = !this.container;
  }

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



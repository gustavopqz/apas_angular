import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  routerLoginButton?: string;

  constructor(private loginService: LoginService){}
  async ngOnInit() {
    if (localStorage.getItem('nome')){

      const imgPath = await this.loginService.getImagem(localStorage.getItem('email'), localStorage.getItem('privilegio'));
      this.imagemUsuario = 'http://localhost:9000/profile/' + imgPath;

      this.loginService.loginInfo = {
        text: localStorage.getItem('nome')
      }

      if (localStorage.getItem('privilegio') == 'admin'){
        this.routerLoginButton = '/painel/home'
      }else{
        this.routerLoginButton = '/'
      } 
    }else{
      this.routerLoginButton = '/login'
    }
  }

  get loginText(): string{
    return this.loginService.loginInfo.text;
  }

  logoff(): void{
    localStorage.clear();
    this.loginService.loginInfo = {
      text: 'LOGIN'
    }
    this.routerLoginButton = '/login'
    this.imagemUsuario = '/assets/img/header/user.png';
  }

  imagemUsuario = '/assets/img/header/user.png';

}

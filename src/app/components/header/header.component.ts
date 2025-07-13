import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service'

// Enviroment
import { environment } from '@env/environment';
import { PerfilService } from '@raiz/app/services/perfil.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  routerLoginButton?: string;
  imagemUsuario = '/assets/img/header/user.png';

  constructor(private loginService: LoginService, private perfilService: PerfilService){}
  async ngOnInit() {
    const userName = await localStorage.getItem('nome');
    const userEmail = await localStorage.getItem('email');
    const userPrivilege = await localStorage.getItem('privilegio')

    if (userName){

      const imgPath = await this.loginService.getImagem(userEmail, userPrivilege);
      try {
        this.imagemUsuario = await this.perfilService.getImagemUrlPorPathAsync(imgPath);  
      } catch (error) {
        this.imagemUsuario = '/assets/img/header/user.png';
      }    

      this.loginService.loginInfo = {
        text: userName
      }

      if (localStorage.getItem('privilegio') == 'admin'){
        this.routerLoginButton = '/painel/home'
      }else{
        this.routerLoginButton = '/'
      } 
    }
    else{
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

}

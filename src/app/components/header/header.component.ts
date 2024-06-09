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

  logadoHeader: Boolean | undefined = false;
  loginText: String | null = 'LOGIN';

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.logadoHeader = this.loginService.logado;
    console.log(this.loginService.logado)
    if (this.logadoHeader == true){
      this.loginText = this.loginService.usuario.nome;
    }
    
  }

}

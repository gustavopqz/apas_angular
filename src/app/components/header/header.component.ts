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

  constructor(private loginService: LoginService){}
  ngOnInit(): void {
    if (localStorage.getItem('nome')){
      this.loginService.loginInfo = {
        text: localStorage.getItem('nome')
      }
    }
  }

  get loginText(): string{
    return this.loginService.loginInfo.text;
  }

}

import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecuperaService } from '@raiz/app/services/recupera.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  providers: [NgModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.scss'
})
export class EsqueciSenhaComponent {

  email?: string;

  constructor(private recuperaService: RecuperaService, private route: Router){}

  async onSubmit(){
    try {
      await this.recuperaService.postEnviaRecuperaReq(this.email);
      alert('E-mail de recuperação enviado, verifique também o lixo eletrônico.');
      
      await this.delay(700);
      this.route.navigate(['/login'])
    } catch (error) {
      alert('E-mail não encontrado.');
      return;  
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

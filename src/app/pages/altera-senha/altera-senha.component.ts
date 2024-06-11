import { Component, NgModule, OnInit } from '@angular/core';
import { RecuperaService } from '@raiz/app/services/recupera.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-altera-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [NgModule],
  templateUrl: './altera-senha.component.html',
  styleUrl: './altera-senha.component.scss'
})
export class AlteraSenhaComponent implements OnInit{

  senha?: string;
  confirmaSenha?: string;

  constructor(private recuperaService: RecuperaService, private activatedRoute: ActivatedRoute, private router: Router){}

  async ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe(async params => {
      if (params['email']){
        try {
          await this.recuperaService.validaToken(params['token']);          
        } catch (error) {
          alert('Token inválido');
        }
      }
    })
  }

  async onSubmit(){
    if (this.senha != this.confirmaSenha){
      alert('Senhas não conferem');
      return;
    }

    this.activatedRoute.queryParams
    .subscribe(async params => {
      if (params['email']){
        try {
          await this.recuperaService.conclusao(params['email'], this.senha);          
          alert('Senha alterada com sucesso!')
          await this.delay(700);
          this.router.navigate(['/login']);
        } catch (error) {
          alert('Erro ao alterar senha');
        }
      }
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

import { Component, NgModule } from '@angular/core';
import { RecuperaService } from '@raiz/app/services/recupera.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-altera-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [NgModule],
  templateUrl: './altera-senha.component.html',
  styleUrl: './altera-senha.component.scss'
})
export class AlteraSenhaComponent {

  senha?: string;
  confirmaSenha?: string;

  constructor(private recuperaService: RecuperaService){}

  onSubmit(){
    console.log(this.senha, this.confirmaSenha)
  }

}

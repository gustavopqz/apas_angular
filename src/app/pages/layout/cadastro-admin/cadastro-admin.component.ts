import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.scss']
})
export class CadastroAdminComponent {
  
  usuario: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isConfirmPasswordValid: boolean = true;
  isUsernameValid: boolean = true; 

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isEmailValid = emailPattern.test(this.email);
  }

  validatePassword() {
    this.isPasswordValid = this.senha.length >= 8;
  }

  validateConfirmPassword() {
    this.isConfirmPasswordValid = this.confirmarSenha === this.senha;
  }

  validateUsername() {
    
    this.isUsernameValid = this.usuario.trim().length > 0;
  }

  onSubmit() {
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateUsername();

    if (this.isEmailValid && this.isPasswordValid && this.isConfirmPasswordValid && this.isUsernameValid) {
      console.log('Formulário enviado com sucesso!');
    } else {
      console.log('Falha na validação do formulário!');
    }
  }
}






@NgModule({
  imports: [BrowserModule, FormsModule, MatIconModule],
  declarations: [CadastroAdminComponent],
  bootstrap: [CadastroAdminComponent]
})
export class CadastroAdminModule {}




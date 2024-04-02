import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';


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

<<<<<<< HEAD
  
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isConfirmPasswordValid: boolean = true;

  
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

  
  onSubmit() {
    
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    
    if (this.isEmailValid && this.isPasswordValid && this.isConfirmPasswordValid) {
      console.log('Formulário enviado com sucesso!');
    
    } else {
      console.log('Falha na validação do formulário!');
    }
  }
}





@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [CadastroAdminComponent],
  bootstrap: [CadastroAdminComponent]
})
export class CadastroAdminModule {}
=======
}
>>>>>>> main

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AdministradoresService } from '../../../services/administradores.service';
import { LoadingComponent } from '../../../components/loading/loading.component';


@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.scss']  
})
export class CadastroAdminComponent {

  loading = false;
  classeMain = 'main-register'

  constructor(private administradorService: AdministradoresService ){}

  cadastraAdmin(){
    const adminObj = {
      nome: this.usuario,
      email: this.email,
      senha: this.senha,
      img: ''
    }
    return this.administradorService.postNovoAdmin(adminObj);
    
  }
  
  usuario: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';


  
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

  limpaCampos(){
    this.usuario = ''
    this.email = ''
    this.senha = ''
    this.confirmarSenha = ''
  }

  resposta?: any;
  
  onSubmit() {
    
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    
    if (this.isEmailValid && this.isPasswordValid && this.isConfirmPasswordValid) {
      
      this.classeMain = 'main-register opacity';
      this.loading = true;

      this.cadastraAdmin()
      .subscribe(response =>{
        this.resposta = response;
        alert(this.resposta.mensagem)
        this.limpaCampos();
        this.classeMain = 'main-register';
        this.loading = false;
      });          
    } else {
      alert('Erro no envio dos dados cadastrais.');
    }
  }
}





@NgModule({
  imports: [BrowserModule, FormsModule, LoadingComponent],
  declarations: [CadastroAdminComponent],
  bootstrap: [CadastroAdminComponent]
})
export class CadastroAdminModule {}




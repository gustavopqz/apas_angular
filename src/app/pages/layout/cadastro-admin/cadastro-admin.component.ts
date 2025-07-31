import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AdministradoresService } from '../../../services/administradores.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Enviroment
import { environment } from '@env/environment';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  providers: [NgModule]
})
export class CadastroAdminComponent {

  selectedImage: any = null;
  inputImg = 'Escolha a foto do administrador';

  onSelectImage(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length){
      this.selectedImage = target.files[0];
      this.inputImg = target.files[0].name;
    } else {
      this.selectedImage = null;
    }
  }

  loading = false;
  classeMain = 'main-register'

  constructor(private administradorService: AdministradoresService, private http: HttpClient, private router: Router){}

  async cadastraAdmin(){
    const adminObj = {
      nome: this.usuario,
      email: this.email,
      senha: this.senha,
      img: ''
    }

    const existeEmail = await this.administradorService.getAdminPorEmail(this.email);
    if (!existeEmail.mensagem) {
      alert('E-mail já existe!');
      this.classeMain = 'main-register';
      this.loading = false;
      return;
    }
    

    try {
      if (this.selectedImage){
        const formImg = new FormData();
        formImg.append('file', this.selectedImage);

        const postImgObservable = this.http.post<any>(
          `${environment.apiBaseUrl}/profile/`,
          formImg,
          { observe: 'response' }
        );

        const response: HttpResponse<any> = await lastValueFrom(postImgObservable);

        const statusCode = response.status;
        const responseBody = response.body;

        if (statusCode > 300) {          
          return;
        } 
      
        this.resposta = responseBody;
        adminObj.img = this.resposta.success;     
                
      }
      
      this.administradorService.postNovoAdmin(adminObj).subscribe(response => {
        alert('Administrador cadastrado com sucesso.');
        this.loading = false;
        this.classeMain = 'main-register';

        this.usuario = '';
        this.email = '';
        this.senha = '';
        this.confirmarSenha = '';
      });
      
            
    } catch (error) {
      alert('Não foi possível cadastrar um novo administrador.')
    }
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
  
  async onSubmit() {
    
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    
    if (this.isEmailValid && this.isPasswordValid && this.isConfirmPasswordValid) {
      
      this.classeMain = 'main-register opacity';
      this.loading = true;

      await this.cadastraAdmin();   
    } else {
      alert('Erro no envio dos dados cadastrais.');
    }
  }
}




import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  providers: [NgModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  container: boolean = true;
  selectedImage: any = null;
  user: {username: string, email: string, password: string} = {
    username: '',
    email: '',
    password: '',
  };
  
  trocaCard(){
    this.container = !this.container;
  }
  onSelectImage(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length){
      this.selectedImage = target.files[0];
    } else {
      this.selectedImage = null;
    }
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('image',this.selectedImage);
  }
}



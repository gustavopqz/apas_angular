import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { LandingService } from '../../services/landing.service';
import { Posts } from '../../modules/posts';
import { Response1 } from '../../modules/responses'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acompanhamento',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './acompanhamento.component.html',
  styleUrl: './acompanhamento.component.scss'
})
export class AcompanhamentoComponent implements OnInit{

  response1 ?: Response1;
  

  posts: Posts[] = [];

  primeiroItem ?:Posts;

  constructor(private landingService :LandingService){
    
  }

  ngOnInit(): void {
    this.mostraPosts();
  }

  mostraPosts(){
    this.landingService.getPosts()
    .subscribe(response1 => {
      this.response1 = response1
      this.posts = this.response1.data
      console.log(this.posts)    
    })
  }
}

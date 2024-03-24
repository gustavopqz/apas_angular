import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { InstagramService } from '../../services/instagram.service';
import { Posts } from '../../modules/posts';
import { InstaData } from '../../modules/instaData'

@Component({
  selector: 'app-acompanhamento',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './acompanhamento.component.html',
  styleUrl: './acompanhamento.component.scss'
})
export class AcompanhamentoComponent implements OnInit{

  constructor(private instagramService : InstagramService){
    
  }

  instaData ?: InstaData;
  posts: Posts[] = [];
  // Loading
  loading :boolean = true

  ngOnInit(): void {
    this.mostraPosts();
  }

  mostraPosts(){
    this.instagramService.getPosts()
    .subscribe(instaData => {
      this.instaData = instaData
      this.posts = this.instaData.data 
      this.loading = false
    })
  }
}

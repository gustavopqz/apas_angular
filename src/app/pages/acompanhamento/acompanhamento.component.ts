import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { InstagramService } from '../../services/instagram.service';
import { DoacoesService } from '../../services/doacoes.service';
import { Posts } from '../../modules/posts.module';
import { InstaData } from '../../modules/InstaData.module'
import { Doadores } from '../../modules/doadores.module';
import { BtnFlutuanteComponent } from '../../components/btn-flutuante/btn-flutuante.component';

@Component({
  selector: 'app-acompanhamento',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, MatButtonModule, CommonModule, BtnFlutuanteComponent],
  templateUrl: './acompanhamento.component.html',
  styleUrl: './acompanhamento.component.scss'
})
export class AcompanhamentoComponent implements OnInit{

  constructor(private instagramService : InstagramService,private doacoesService: DoacoesService){
  }

  instaData ?: InstaData;
  posts: Posts[] = [];
  // Loading
  loading :boolean = true

  ngOnInit(): void {
    this.mostraPosts();
    this.getDoacoes();
  }

  mostraPosts(){
    this.instagramService.getPosts()
    .subscribe(instaData => {
      this.instaData = instaData
      this.posts = this.instaData.data 
      this.loading = false
    })
  }

  doador ?: Doadores;

  getDoacoes(){
    this.doacoesService.getDoacoes()
    .subscribe(doador => this.doador = doador)
  }
}

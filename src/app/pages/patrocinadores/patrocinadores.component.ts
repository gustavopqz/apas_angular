import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Patrocinadores } from '../../modules/patrocinadores.module'; 
import { PatrocinadoresService } from '../../services/patrocinadores.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { BtnFlutuanteComponent } from '../../components/btn-flutuante/btn-flutuante.component';

import { environment } from '@raiz/environments/environment';

@Component({
  selector: 'app-patrocinadores',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule, MatButtonModule, BtnFlutuanteComponent],
  templateUrl: './patrocinadores.component.html',
  styleUrl: './patrocinadores.component.scss'
})
export class PatrocinadoresComponent implements OnInit {

  patrocinador1 ?: Patrocinadores;
  patrocinadores ?: Patrocinadores[];
  apiBaseUrl ?: string;

  constructor(private patrocinadoresService: PatrocinadoresService){
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    this.getPatrocinadores();
  }
  
  // FETCHS 
  getPatrocinadores() :void{
    this.patrocinadoresService.getPatrocinadores()
    .subscribe(patrocinadores => {
      this.patrocinadores = patrocinadores as unknown as Patrocinadores[]
    })
  }

  redirencionaParaPatrocinador(url:string){
    // window.location.href = url;
    window.open(url, '_blank');
  }

}

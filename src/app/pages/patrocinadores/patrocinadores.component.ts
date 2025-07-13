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
import { PerfilService } from '@raiz/app/services/perfil.service';

@Component({
  selector: 'app-patrocinadores',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule, MatButtonModule, BtnFlutuanteComponent],
  templateUrl: './patrocinadores.component.html',
  styleUrl: './patrocinadores.component.scss'
})
export class PatrocinadoresComponent implements OnInit {

  patrocinadores ?: Patrocinadores[];
  apiBaseUrl ?: string;

  constructor(private patrocinadoresService: PatrocinadoresService, private perfilService: PerfilService){
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    this.getPatrocinadores();
  }
  
  // FETCHS 
  async getPatrocinadores(): Promise<void> {
    this.patrocinadoresService.getPatrocinadores()
      .subscribe(async patrocinadores => {
        this.patrocinadores = patrocinadores as unknown as Patrocinadores[];

        for (const patrocinador of this.patrocinadores) {
          try {
            if (patrocinador.img) {
              const splited = patrocinador.img.split('/');
              const nomeArquivo = splited[splited.length - 1];
              // Usando o método específico para patrocinadores
              patrocinador.img = await this.perfilService.getImagemPatrocinadorUrlAsync(nomeArquivo);
            } else {
              patrocinador.img = 'assets/user.png'; // imagem padrão
            }
          } catch (error) {
            console.error('Erro ao carregar imagem do patrocinador:', error);
            patrocinador.img = 'assets/user.png'; // fallback em caso de erro
          }
        }
      });
  }

  redirencionaParaPatrocinador(url:string){
    // window.location.href = url;
    window.open(url, '_blank');
  }

}

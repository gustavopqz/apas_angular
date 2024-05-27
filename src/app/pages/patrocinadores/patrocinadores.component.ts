import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Patrocinadores } from '../../modules/patrocinadores.module'; 
import { PatrocinadoresService } from '../../services/patrocinadores.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { BtnFlutuanteComponent } from '../../components/btn-flutuante/btn-flutuante.component';

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

  constructor(private patrocinadoresService: PatrocinadoresService){}

  ngOnInit(): void {
    this.getDoadores();
  }
  
  // FETCHS 
  getpatrocinador1() :void {
    this.patrocinadoresService.getPatrocinador1()
    .subscribe(patrocinador => this.patrocinador1 = patrocinador)
  }

  getDoadores() :void{
    this.patrocinadoresService.getPatrocinadores()
    .subscribe(patrocinadores => {
      this.patrocinadores = patrocinadores as unknown as Patrocinadores[]
      console.log(this.patrocinadores)
    })
  }

  redirencionaParaPatrocinador(url:string){
    // window.location.href = url;
    window.open(url, '_blank');
  }

}

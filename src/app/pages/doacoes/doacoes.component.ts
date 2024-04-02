import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'; 
import { DoacesService } from '../../services/doaces.service';
import { Doadores } from '../../modules/doadores.module';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.scss'
})
export class DoacoesComponent implements OnInit {

  doador1 ?: Doadores;
  doadores ?: Doadores[];

  constructor(private doacoesService :DoacesService){}

  ngOnInit(): void {
    this.getDoadores();
  }
  
  // FETCHS 
  getDoador1() :void {
    this.doacoesService.getDoador1()
    .subscribe(doador => this.doador1 = doador)
  }

  getDoadores() :void{
    this.doacoesService.getDoacoes()
    .subscribe(doadores => {
      this.doadores = doadores as unknown as Doadores[]
      console.log(this.doadores)
    })
  }



}

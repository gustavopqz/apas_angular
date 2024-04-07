import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'; 
import { DoacesService } from '../../services/doaces.service';
import { Doadores } from '../../modules/doadores.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule ,MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule, MatButton, MatDialogModule],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.scss'
})
export class DoacoesComponent implements OnInit {

  doador1 ?: Doadores;
  doadores ?: Doadores[];

  constructor(private doacoesService :DoacesService, public dialog: MatDialog){}

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


  // Doacao Dialog (CARD)
  abrirDialog(){
    this.dialog.open(DoacaoDialog, {
      width: '350px',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    })
  }
}

@Component({
  selector: 'doacaoDialog',
  templateUrl: 'doacaoDialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, FormsModule],
  providers: [NgModel]
})

export class DoacaoDialog {
  constructor(public dialogRef: MatDialogRef<DoacaoDialog>) {}

  valorDoacao :number = 0;

  atualizaValorDoacao(valor :number) :void{
    this.valorDoacao = valor;
  }
}

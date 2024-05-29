import { Component, OnInit, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'; 
import { DoacoesService } from '../../services/doacoes.service';
import { Doadores } from '../../modules/doadores.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule ,MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {FormsModule} from '@angular/forms';
import { BtnFlutuanteComponent } from '../../components/btn-flutuante/btn-flutuante.component';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio' 
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DadosDialog{
  tipoDoacao: String,
  valorDoacao: Number,
  mensagemDoacao: String
}

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule, MatButton, MatDialogModule, BtnFlutuanteComponent],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.scss'
})
export class DoacoesComponent implements OnInit {

  doador1 ?: Doadores;
  doadores ?: Doadores[];

  constructor(private doacoesService :DoacoesService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getDoadores();
  }
  
  // FETCHS 
  getDoadores() :void{
    this.doacoesService.getDoacoes()
    .subscribe(doadores => {
      this.doadores = doadores as unknown as Doadores[]
    })
  }

  // Dialog
  tipoDoacao: String = 'anonimo';
  valorDoacao: Number = 0;
  mensagemDoacao: String = '';

  // Doacao Dialog (CARD)
  abrirDialog(): void{
    const dialogRef = this.dialog.open(DoacaoDialog, {
      width: '400px',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
      data: {tipoDoacao: 'anonimo', valorDoacao: 0, mensagemDoacao: ''}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tipoDoacao = result.tipoDoacao;
        this.valorDoacao = result.valorDoacao;
        this.mensagemDoacao = result.mensagemDoacao;
      }
    })
  }

}

@Component({
  selector: 'doacaoDialog',
  templateUrl: 'doacaoDialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatToolbarModule, MatInputModule, MatFormFieldModule, FormsModule, MatRadioModule, CommonModule],
  providers: [
    NgModel, 
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary'} 
    }
  ]
})

export class DoacaoDialog {
  constructor(public dialogRef: MatDialogRef<DoacaoDialog>, @Inject(MAT_DIALOG_DATA) public data: DadosDialog ) {}

  atualizaValorDoacao(valor :number) :void{
    this.data.valorDoacao = valor;
  }

  enviarDoacao(): void{
    if (!this.data.valorDoacao){
      alert('Nenhum valor digitado');
    }else{
      this.dialogRef.close(this.data);
    }
  }
}

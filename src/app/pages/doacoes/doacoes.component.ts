import { Component, OnInit, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'; 
import { DoacoesService } from '../../services/doacoes.service';
import { Doacoes } from '../../modules/doacoes.model';
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
import { ActivatedRoute } from '@angular/router'
import { LoadingComponent } from '../../components/loading/loading.component';

export interface DadosDialog{
  tipoDoacao: String,
  valorDoacao: Number,
  mensagemDoacao: String
}

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule, MatButton, MatDialogModule, BtnFlutuanteComponent, LoadingComponent],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.scss'
})
export class DoacoesComponent implements OnInit {

  // Classe da Main OK
  opacity = '';

  doacoes ?: Doacoes[];

  constructor(private doacoesService :DoacoesService, public dialog: MatDialog, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getDoacoes();

    this.activatedRoute.queryParams.subscribe(params =>{
      let id = params['preference_id'] ? params['preference_id'] : null;
      if (id){
        let status = params['status'] ? params['status'] : null;
      }
    })

  }
  
  // FETCHS 
  getDoacoes() :void{
    this.doacoesService.getDoacoes()
    .subscribe(doadores => {
      this.doacoes = doadores as unknown as Doacoes[]
    })
  }

  // Dialog
  tipoDoacao: string = 'anonimo';
  valorDoacao: number = 0;
  mensagemDoacao: String = '';

  // Carregando
  loading = false;

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

        const extraInfo = {
          doadorNome: "Gustavo Pasqua",
          email: "gustavo.pasqua@teste.com",
          mensagem: this.mensagemDoacao,
          img: "./assets/img/profiles/pasqua.png"
        }
        
        this.doacoesService.postMercadoPago(this.valorDoacao, this.tipoDoacao, extraInfo);
        this.opacity = 'opacity';
        this.loading = true;
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
  constructor(public dialogRef: MatDialogRef<DoacaoDialog>, @Inject(MAT_DIALOG_DATA) public data: DadosDialog) {}

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

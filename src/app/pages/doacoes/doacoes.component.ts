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

// Enviroment
import { environment } from '@env/environment';

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
      let id_preferencia = params['preference_id'] ? params['preference_id'] : null;   
      let status = params['status'] ? params['status'] : null;

      if (status == 'rejected'){
        window.location.href = environment.frontBaseUrl + '/doacoes';
      } else
      if(id_preferencia && status){
        let id_pagamento = params['payment_id'] ? params['payment_id'] : null;   
        let tipo_pagamento = params['payment_type'] ? params['payment_type'] : null;

        const body = {
          id_pagamento,
          tipo_pagamento,
          id_preferencia,
          status
        };

        this.doacoesService.patchAprovaDoacao(body)
        .subscribe(response => {
          this.getDoacoes();
          // window.location.href = environment.frontBaseUrl + '/doacoes';
        }) 

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

        let extraInfo;

        if (this.tipoDoacao == 'usuario'){
          const getLogado = localStorage.getItem('logado');
          if (!getLogado){
            alert('Para doar como usuário é necessário realizar o login!');
            return;
          }

          extraInfo = {
            doadorNome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            mensagem: this.mensagemDoacao,
            img: `${environment.apiBaseUrl}/profile/` + (localStorage.getItem('img') ? localStorage.getItem('img') : 'user.png') 
          }
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

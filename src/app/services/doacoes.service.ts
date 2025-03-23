import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doacoes } from '../modules/doacoes.model';

// Enviroment variable
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  
  constructor(private http: HttpClient) { }

  getDoacoes(): Observable<Doacoes>{
    return this.http.get<Doacoes>( environment.apiBaseUrl + '/doacoes/feed')
  }

  // Novo método para retornar um objeto que contém um array de Doacoes
  getDoacoesCompletas(): Observable<{ doacoes: Doacoes[] }> {
    return this.http.get<{ doacoes: Doacoes[] }>( environment.apiBaseUrl + '/doacoes/concluidas');
  }  

  resposta?: any;

  postMercadoPago(valor: number, tipoDoacao: string, extraInfo?: any){

    let valorDoacao = Number(valor);

    try {
      this.http.post(`${environment.apiBaseUrl}/doacoes/mercado-pago`, {"valorDoacao": valorDoacao})
      .subscribe(
        response =>{
          this.resposta = response;
          if(environment.production){
            this.postPrimeiroPasso(this.resposta.id, valor, tipoDoacao, extraInfo, this.resposta.url);
          } else {
            this.postPrimeiroPasso(this.resposta.id, valor, tipoDoacao, extraInfo, this.resposta.sandbox_url);
          }
        }
      )

      return;
    } catch (error) {
      alert('Erro na tentativa de integrar o Mercado Pago.');
      return;
    }
  }

  postPrimeiroPasso(id: string, valor: number, tipoDoacao: string, extraInfo: any, url: string){
    let doacaoObj;

    if (extraInfo){
      doacaoObj = {
        id_preferencia: id,
        doadorNome: extraInfo.doadorNome,
        email: extraInfo.email,
        valor: valor,
        mensagem: extraInfo.mensagem,
        img: extraInfo.img,
        tipoDoacao: tipoDoacao,
        descricao: 'Doação de usuário pelo site'
      }
    } else {
      doacaoObj = {
        id_preferencia: id,
        doadorNome: 'Anônimo',
        valor: valor,
        tipoDoacao: tipoDoacao,
        descricao: 'Doação anônima pelo site'
      }
    }
    
    try {
      this.http.post( environment.apiBaseUrl + '/doacoes/cadastro', doacaoObj)
      .subscribe(
        response =>{
          window.location.href = url;
        }
      )

      return;
    } catch (error) {
      alert('Erro na tentativa de integrar o Mercado Pago.');
      return;
    }
  }

  patchAprovaDoacao(body: any): Observable<Doacoes>{
    return this.http.patch<Doacoes>( environment.apiBaseUrl + '/doacoes/aprovacao', body)
  }  
}

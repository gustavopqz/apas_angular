import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doacoes } from '../modules/doacoes.model';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  
  constructor(private http: HttpClient) { }

  getDoacoes(): Observable<Doacoes>{
    return this.http.get<Doacoes>('http://hubfin-infracommerce-hml.devit.com.br:49020/doacoes/feed')
  }

  // Novo método para retornar um objeto que contém um array de Doacoes
  getDoacoesCompletas(): Observable<{ doacoes: Doacoes[] }> {
    return this.http.get<{ doacoes: Doacoes[] }>('http://hubfin-infracommerce-hml.devit.com.br:49020/doacoes/concluidas');
  }  

  resposta?: any;

  postMercadoPago(valor: number, tipoDoacao: string, extraInfo?: any){

    let valorDoacao = Number(valor);

    let objMercadoPago = {      
      "items": [
        {
          "title": "Doação para APAS",
          "quantity": 1,
          "unit_price": valorDoacao,
          "currency_id": "BRL"        
        }
      ],
      "back_urls": {
          "success": "http://localhost:4200/#/doacoes",
          "pending": "http://localhost:4200/#/doacoes",
          "failure": "http://localhost:4200/#/doacoes"
      }
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Exemplo de header
      'Authorization': 'Bearer APP_USR-762191866288817-060113-3bee2df7d2fda44843111c8d45bce5af-1747749586', // Outro exemplo de header
    });

    const options = {
      headers: headers
    };

    try {
      this.http.post('https://api.mercadopago.com/checkout/preferences', objMercadoPago, options)
      .subscribe(
        response =>{
          this.resposta = response;         
          this.postPrimeiroPasso(this.resposta.id, valor, tipoDoacao, extraInfo, this.resposta.init_point);
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
        id_pagamento: id,
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
        id_pagamento: id,
        doadorNome: 'Anônimo',
        valor: valor,
        tipoDoacao: tipoDoacao,
        descricao: 'Doação anônima pelo site'
      }
    }
    

    try {
      this.http.post('http://hubfin-infracommerce-hml.devit.com.br:49020/doacoes/cadastro', doacaoObj)
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
    return this.http.patch<Doacoes>('http://hubfin-infracommerce-hml.devit.com.br:49020/doacoes/aprovacao', body)
  }  
}

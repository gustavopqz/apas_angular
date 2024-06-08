import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Doacoes } from '../modules/doacoes.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  
  constructor(private http: HttpClient) { }

  getDoacoes(): Observable<Doacoes>{
    return this.http.get<Doacoes>('http://localhost:9000/doacoes')
  }

  resposta?: any;

  postMercadoPago(valor: number, tipoDoacao: string, extraInfo?: any){

    let objMercadoPago = {      
      "items": [
        {
          "title": "Doação para APAS",
          "quantity": 1,
          "unit_price": valor,
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
      'Authorization': 'Bearer TEST-762191866288817-060113-f188e2ddafb8d69eaceb6bf69c57d7e0-1747749586', // Outro exemplo de header
    });

    const options = {
      headers: headers
    };

    try {
      this.http.post('https://api.mercadopago.com/checkout/preferences', objMercadoPago, options)
      .subscribe(
        response =>{
          this.resposta = response;         
          this.postPrimeiroPasso(this.resposta.id, valor, tipoDoacao, extraInfo, this.resposta.sandbox_init_point)
        }
      )

      return;
    } catch (error) {
      alert('Erro na tentativa de integrar o Mercado Pago.');
      return;
    }
  }

  postPrimeiroPasso(id: string, valor: number, tipoDoacao: string, extraInfo: any, url: string){

    const doacaoObj = {
      id_pagamento: id,
      doadorNome: extraInfo.doadorNome,
      email: extraInfo.email,
      valor: valor,
      mensagem: extraInfo.mensagem,
      img: extraInfo.img,
      tipoDoacao: tipoDoacao,
      descricao: 'Pagamento pelo site',
    }

    try {
      this.http.post('http://localhost:9000/doacoes/cadastro', doacaoObj)
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
    return this.http.patch<Doacoes>('http://localhost:9000/doacoes/aprovacao', body)
  }  
}

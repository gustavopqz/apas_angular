import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doadores } from '../modules/doadores.module';
import { Erro } from '../modules/erro.module'

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  
  constructor(private http: HttpClient) { }

  getDoacoes(): Observable<Doadores>{
    return this.http.get<Doadores>('http://localhost:9000/doacoes')
  }

  //Observable<Doadores> | Erro
  postInicioDoacao(valor: Number) {

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
        (response) => {
          console.log('HTTP POST Response:', response); // Display the response in the console
        },
        (error) => {
          console.error('HTTP POST Error:', error); // Handle any errors
        }
      );

      return 0;

      // return this.http.post<Doadores>('http://localhost:9000/doacoes', response);
    } catch (error) {
      return { "statusCode": 500, "mensagem": "Erro ao comunicar com Mercado Pago" }
    }
  }

  postAprovaDoacao(): Observable<Doadores>{
    return this.http.get<Doadores>('http://localhost:9000/doacoes')
  }  
}

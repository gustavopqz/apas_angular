import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from '../modules/gastos.module'; 

@Injectable({
  providedIn: 'root'
})
export class RelatorioGastosService {
  private apiUrl = 'http://localhost:9000/gastos';  

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gastos[]> {
    return this.http.get<Gastos[]>(this.apiUrl);
  }

  adicionarGasto(gasto: Gastos): Observable<Gastos> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Gastos>(this.apiUrl, gasto, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from './../modules/gastos.module';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = `${environment.apiBaseUrl}/gastos`;

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gastos[]> {
    return this.http.get<Gastos[]>(this.apiUrl);
  }

  addGasto(gasto: Gastos): Observable<Gastos> {
    return this.http.post<Gastos>(this.apiUrl, gasto);
  }
}

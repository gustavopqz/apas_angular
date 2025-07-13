import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Gastos[]>(this.apiUrl, { headers });
  }

  addGasto(gasto: Gastos): Observable<Gastos> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Gastos>(this.apiUrl, gasto, { headers });
}

}

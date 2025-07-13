import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Administradores } from '../modules/administrador.module';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService { 

  resposta?: any;
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getTodosAdmins(): Observable<Administradores> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Administradores>(`${environment.apiBaseUrl}/administradores`, { headers });
  }

  async getAdminPorEmail(email: string | null) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return await this.http.get<any>(`${environment.apiBaseUrl}/administradores?email=` + email, { headers }).toPromise();
  }

  postNovoAdmin(body: any) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Administradores>(`${environment.apiBaseUrl}/administradores/cadastro`, body, { headers });
  }

  checkUserPrivilege(): Observable<boolean> {
    const userEmail = localStorage.getItem('email');
    const authToken = localStorage.getItem('token');

    if (!userEmail || !authToken) {
      return of(false);
    }

    let params = new HttpParams().set('email', userEmail);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    const apiUrlWithEmail = `${this.baseUrl}/administradores`;

    return this.http.get<{ privilegio: string }>(apiUrlWithEmail, { params: params, headers: headers }).pipe(
      map(response => response.privilegio === 'admin'),
      catchError(() => of(false))
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administradores } from '../modules/administrador.module';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService { 

  resposta?: any;

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


}

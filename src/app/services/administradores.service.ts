import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Administradores } from '../modules/administrador.module';

// Enviroment
import { environment } from '@env/environment';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  email: string;
  privilegio: string; // <-- Adicione/confirme esta linha
  iat?: number;       // Opcional: Issued At
  exp?: number;       // Opcional: Expiration Time
}

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
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      // Se não houver token, o usuário não está logado ou não tem privilégio de admin
      return of(false);
    }

    try {
      // Decodifica o token para acessar o payload
      const decodedToken = jwtDecode<JwtPayload>(authToken);

      // Verifica se o token tem a propriedade 'privilegio' e se ela é 'admin'
      if (decodedToken && decodedToken.privilegio === 'admin') {
        return of(true); // O usuário tem privilégio de admin
      } else {
        return of(false); // O usuário não tem privilégio de admin
      }
    } catch (error) {
      // Erro ao decodificar o token (pode ser inválido, expirado, etc.)
      console.error('Erro ao decodificar o JWT:', error);
      return of(false);
    }
  }

  // Você pode adicionar um método auxiliar para obter o privilégio do usuário em outros lugares
  getPrivilegeFromToken(): string | null {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      return null;
    }
    try {
      const decodedToken = jwtDecode<JwtPayload>(authToken);
      return decodedToken.privilegio || null;
    } catch (error) {
      console.error('Erro ao decodificar o JWT:', error);
      return null;
    }
  }
}

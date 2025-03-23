import { HttpClient } from '@angular/common/http';
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

  getTodosAdmins(): Observable<Administradores>{
    return this.http.get<Administradores>(`${environment.apiBaseUrl}/administradores`);
  }

  async getAdminPorEmail(email: string | null){
    return await this.http.get<any>(`${environment.apiBaseUrl}/administradores?email=` + email).toPromise();
  }

  postNovoAdmin(body: any){
    return this.http.post<Administradores>(`${environment.apiBaseUrl}/administradores/cadastro`, body)    
  }

}

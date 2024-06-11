import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administradores } from '../modules/administrador.module';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService { 

  resposta?: any;

  constructor(private http: HttpClient) { }

  getTodosAdmins(): Observable<Administradores>{
    return this.http.get<Administradores>('http://localhost:9000/administrador');
  }

  async getAdminPorEmail(email: string | null){
    return await this.http.get<any>('http://localhost:9000/administrador?email=' + email).toPromise();
  }

  postNovoAdmin(body: any){
    return this.http.post<Administradores>('http://localhost:9000/administrador/cadastro', body)    
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administradores } from '../modules/administrador.module';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  constructor(private http: HttpClient) { }

  getTodosAdmins(): Observable<Administradores>{
    return this.http.get<Administradores>('http://localhost:9000/administrador');
  }

}

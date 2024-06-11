import { Injectable } from '@angular/core';
import { Patrocinadores } from '../modules/patrocinadores.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  constructor(private http: HttpClient) { }

  getPatrocinadores(): Observable<Patrocinadores>{
    return this.http.get<Patrocinadores>('http://hubfin-infracommerce-hml.devit.com.br:49020/patrocinios')
  }
}

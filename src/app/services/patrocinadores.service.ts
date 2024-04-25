import { Injectable } from '@angular/core';
import { Patrocinadores } from '../modules/patrocinadores.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  constructor(private http: HttpClient) { }

  getPatrocinador1(): Observable<Patrocinadores>{
    return this.http.get<Patrocinadores>('http://localhost:9000/patrocinadores/1')
  }


  getPatrocinadores(): Observable<Patrocinadores>{
    return this.http.get<Patrocinadores>('http://localhost:9000/patrocinadores')
  }
}

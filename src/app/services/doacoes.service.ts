import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doadores } from '../modules/doadores.module';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  
  constructor(private http: HttpClient) { }

  getDoacoes(): Observable<Doadores>{
    return this.http.get<Doadores>('http://localhost:9000/doacoes')
  }
}

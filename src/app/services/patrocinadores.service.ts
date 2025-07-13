import { Injectable } from '@angular/core';
import { Patrocinadores } from '../modules/patrocinadores.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Enviroment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  constructor(private http: HttpClient) { }

  getPatrocinadores(): Observable<Patrocinadores> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<Patrocinadores>(`${environment.apiBaseUrl}/patrocinios`, { headers });
}

}

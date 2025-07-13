import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Environment
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  async getImagemUrlPorPathAsync(path: string): Promise<string> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const blob = await this.http.get(`${environment.apiBaseUrl}/profile/${path}`, { headers, responseType: 'blob' }).toPromise();

    if (!blob) {
      throw new Error('Imagem não encontrada');
    }

    return URL.createObjectURL(blob);
  }

  async getImagemPatrocinadorUrlAsync(imageName: string): Promise<string> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const blob = await this.http.get(`${environment.apiBaseUrl}/profile/patrocinadores/${imageName}`, { headers, responseType: 'blob' }).toPromise();

    if (!blob) {
      throw new Error('Imagem de patrocinador não encontrada');
    }

    return URL.createObjectURL(blob);
  }



}

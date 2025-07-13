// src/app/services/auth.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'; // Mantido caso queira redirecionar em caso de erro

// Enviroment
import { environment } from '@env/environment';

interface AuthResponse {
  token: string;
  // Outros dados do usuário, se houver
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private apiUrl = environment.apiBaseUrl;
  private refreshTokenInterval = 60 * 60 * 1000;
  private activityTimeout = 59 * 60 * 1000;

  private userActivity$: Observable<Event>;

  private activitySubscription: Subscription | null = null;
  private refreshTokenSubscription: Subscription | null = null;

  // O BehaviorSubject agora depende do token no localStorage
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { // Injetar Router ainda é útil para redirecionar em caso de falha na renovação
    this.userActivity$ = new Observable(observer => {
      const activityEvents = ['mousemove', 'keypress'];
      const handler = (event: Event) => observer.next(event);

      activityEvents.forEach(event => document.addEventListener(event, handler));

      return () => {
        activityEvents.forEach(event => document.removeEventListener(event, handler));
      };
    });

    // Inicia os monitores apenas se já houver um token
    if (this.hasToken()) {
      this.startActivityMonitor();
      this.startRefreshTokenTimer();
    }
  }

  ngOnDestroy(): void {
    this.stopActivityMonitor();
    this.stopRefreshTokenTimer();
  }

  private hasToken(): boolean {
    // Sempre verifica o localStorage diretamente
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    // Sempre lê do localStorage
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true); // Atualiza o estado de autenticação
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Atualiza o estado de autenticação
    // Opcional: Redirecionar para a tela de login se o token for removido
    // this.router.navigate(['/login']);
  }

  // Novo método para iniciar a verificação de token após o login (chamado de fora)
  public initializeAuthMonitoring(): void {
    if (this.hasToken()) {
      this.startActivityMonitor();
      this.startRefreshTokenTimer();
      this.isAuthenticatedSubject.next(true); // Garante que o estado esteja correto
    }
  }

  refreshToken(): Observable<AuthResponse> {
    const oldToken = this.getToken();
    if (!oldToken) {      
      this.removeToken(); // Garante que o token seja removido se não existir
      // Opcional: redirecionar para login, se aplicável
      // this.router.navigate(['/login']);
      return new Observable(observer => observer.error('No token available for refresh'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${oldToken}`);

    return this.http.post<AuthResponse>(`${this.apiUrl}/refreshtoken`, {}, { headers }).pipe(
      tap(response => {
        this.setToken(response.token);        
      }),
      catchError(error => {        
        // Em caso de erro na renovação, o token antigo pode ser inválido.
        // Remova-o e desative o monitoramento.
        this.removeToken();
        this.stopActivityMonitor();
        this.stopRefreshTokenTimer();
        // Opcional: redirecionar para login
        this.router.navigate(['/login']);
        throw error;
      })
    );
  }

  private startActivityMonitor(): void {
    this.stopActivityMonitor();
    let activityTimer: any;

    this.activitySubscription = this.userActivity$
      .pipe(
        tap(() => {
          clearTimeout(activityTimer);
          activityTimer = setTimeout(() => {            
            this.stopRefreshTokenTimer();
          }, this.activityTimeout);

          if (!this.refreshTokenSubscription || this.refreshTokenSubscription.closed) {            
            this.startRefreshTokenTimer();
          }
        })
      )
      .subscribe();
  }

  private stopActivityMonitor(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
      this.activitySubscription = null;
    }
  }

  private startRefreshTokenTimer(): void {
    this.stopRefreshTokenTimer();

    this.refreshTokenSubscription = timer(0, this.refreshTokenInterval)
      .pipe(
        switchMap(() => this.refreshToken()),
        catchError(err => {          
          this.logout(); // Limpa o token se ocorrer um erro fatal
          this.router.navigate(['/login']);
          return [];
        })
      )
      .subscribe();
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
      this.refreshTokenSubscription = null;
      this.logout();
    }
  }

  logout(): void {
    localStorage.clear();
    this.stopRefreshTokenTimer();
    this.stopActivityMonitor();
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
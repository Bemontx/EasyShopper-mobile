import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
private apiUrl = 'https://easyshopper-api-jeisson-aedzgxetg2gtefas.brazilsouth-01.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data)
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id || res.userId); 
        console.log('DEBUG AuthService: Sesión guardada correctamente');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return !!token && !!userId;
  }
}

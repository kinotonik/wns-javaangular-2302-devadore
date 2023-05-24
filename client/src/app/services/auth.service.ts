import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  authenticateUser(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}/authenticate`, loginData).pipe(
      tap((response) => {
        console.log('authservice:',response)
        const token = response.token;
        this.saveToken(token);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.apiUrl}/logout`, {}, { headers: headers })
        .pipe(
          tap(() => {
            localStorage.removeItem('jwtToken');
            this.router.navigate(['/home']);
          })
        );
    }
    throw new Error("User is not logged in");
  }
}



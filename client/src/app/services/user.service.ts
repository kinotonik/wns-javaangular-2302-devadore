import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { User } from '../models/user.model';
import {AuthService} from "./auth.service";
import {Role} from "../models/role.model";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl= 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    const jwtToken = localStorage.getItem('jwt');
    console.log('Enregistrer le JWT récupéré',jwtToken);
    if (jwtToken) {
      console.log(`Bearer ${jwtToken}`);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
      return this.http.get<User[]>(`${this.baseUrl}`, { headers });

    } else {
      // Handle the case where the JWT token is missing or null
      console.log('Pas de jeton JWT trouvé');
      return throwError('Pas de jeton JWT trouvé');
    }
  }
  getUserById(userId: number): Observable<User> {
    const jwtToken = this.authService.getToken();
    const headers = jwtToken ? new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`) : {};
    const url = `${this.baseUrl}/${userId}`;

    return this.http.get<User>(url, { headers });
  }

  createUser(user: User): Observable<User> {
    const jwtToken = this.authService.getToken();
    const headers = jwtToken ? new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`) : {};

    return this.http.post<User>(this.baseUrl, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const jwtToken = this.authService.getToken();
    const headers = jwtToken ? new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`) : {};
    const url = `${this.baseUrl}/${user.id}`;

    return this.http.put<User>(url, user, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const jwtToken = this.authService.getToken();
    const headers = jwtToken ? new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`) : {};
    const url = `${this.baseUrl}/${userId}`;

    return this.http.delete(url, { headers });
  }
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }
}


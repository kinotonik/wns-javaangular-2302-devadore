import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl= 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', 'Basic QWRtaW46YWRtaW4=');
    return this.http.get<User[]>(this.baseUrl, {headers});
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
}


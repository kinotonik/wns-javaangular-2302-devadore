import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {QuizModel} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/api/quiz';

  constructor(private http: HttpClient) { }

  getQuizs(): Observable<QuizModel[]> {
    const headers = new HttpHeaders().set('Authorization', 'Basic QWRtaW46YWRtaW4=');
    return this.http.get<QuizModel[]>(this.apiUrl, {headers});
  }

  getQuizById(id: number): Observable<QuizModel[]> {
    const headers = new HttpHeaders().set('Authorization', 'Basic QWRtaW46YWRtaW4=');
    return this.http.get<QuizModel[]>(`${this.apiUrl}/${id}`, {headers});
  }

  getRandomQuiz(): Observable<QuizModel> {
    return this.http.get<QuizModel>(this.apiUrl + '/random').pipe(
      map((res) => res
      ));
  }

  createQuiz(quiz: QuizModel): Observable<QuizModel[]> {
    return this.http.post<QuizModel[]>(this.apiUrl, quiz);
  }

  updateQuiz(id: number, quiz: QuizModel): Observable<QuizModel[]> {
    return this.http.put<QuizModel[]>(`${this.apiUrl}/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<QuizModel[]> {
    return this.http.delete<QuizModel[]>(`${this.apiUrl}/${id}`);
  }
}


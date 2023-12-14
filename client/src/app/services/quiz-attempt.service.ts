import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuizAttempt } from '../models/quiz-attempt';

@Injectable({
  providedIn: 'root'
})
export class QuizAttemptService {

  private apiUrl = environment.URL + '/api/quizAttempt';

  constructor(
    private http: HttpClient
  ) { }

  createQuizAttempt(quizAttempt: QuizAttempt) {
    return this.http.post<QuizAttempt>(this.apiUrl, quizAttempt);
  }
}

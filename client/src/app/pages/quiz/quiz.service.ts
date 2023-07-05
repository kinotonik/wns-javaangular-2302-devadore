import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { QuizModel } from 'src/app/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  endpoint: String = "http://localhost:8080/api/quiz"

  constructor(private http: HttpClient) { }

  getRandomQuiz(): Observable<QuizModel> {
    return this.http.get<QuizModel>(this.endpoint + '/random').pipe(
      map((res) => res
      ));
  }

}

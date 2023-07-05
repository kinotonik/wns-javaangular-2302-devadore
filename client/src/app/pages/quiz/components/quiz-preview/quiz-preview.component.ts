import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizModel } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewComponent implements OnInit {

  randomQuiz: QuizModel;

  constructor(private quizService: QuizService){}

  ngOnInit(): void {
    this.getRandomQuiz();
  }

  getRandomQuiz(): void {
    this.quizService.getRandomQuiz().subscribe(
      res => {
        this.randomQuiz = res 
        console.log(this.randomQuiz);
      });
  }

}

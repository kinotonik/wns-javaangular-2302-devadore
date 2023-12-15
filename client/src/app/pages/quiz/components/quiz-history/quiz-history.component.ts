import { Component, OnInit } from '@angular/core';
import { QuizAttempt } from 'src/app/models/quiz-attempt';
import { QuizAttemptService } from 'src/app/services/quiz-attempt.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss'],
})
export class QuizHistoryComponent implements OnInit {

  quizAttempts: QuizAttempt[];
  userId: number | undefined;

  constructor(private quizAttemptService: QuizAttemptService) {}

  ngOnInit(): void {
    this.quizAttemptService.getAllQuizAttemptByUserId().subscribe((res) => {
      this.quizAttempts = res;
      this.userId = this.quizAttempts[0].userId;
      console.log(this.quizAttempts)
    });
  }
}

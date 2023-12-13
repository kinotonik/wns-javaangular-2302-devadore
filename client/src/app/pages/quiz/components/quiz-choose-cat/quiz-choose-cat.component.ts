import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-choose-cat',
  templateUrl: './quiz-choose-cat.component.html',
  styleUrls: ['./quiz-choose-cat.component.css'],
})
export class QuizChooseCatComponent implements OnInit {
  availableCategories: CategoryModel[] = [];
  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.availableCategories = data;
      console.log(this.availableCategories);
    });
  }

  getRandomQuizByCat(id: number) {
    this.quizService.getRandomQuizByCat(id).subscribe((data) => {
      console.log(data);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-quiz-choose-cat',
  templateUrl: './quiz-choose-cat.component.html',
  styleUrls: ['./quiz-choose-cat.component.css'],
})
export class QuizChooseCatComponent implements OnInit {
  availableCategories: CategoryModel[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAvailableCategories();
  }

  getAvailableCategories(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.availableCategories = res;
      console.log(this.availableCategories);
    });
  }
}

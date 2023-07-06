import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizPreviewComponent } from './components/quiz-preview/quiz-preview.component';


@NgModule({
  declarations: [
    QuizPreviewComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }

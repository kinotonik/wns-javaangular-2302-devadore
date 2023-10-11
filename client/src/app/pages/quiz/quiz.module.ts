import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizPreviewComponent } from './components/quiz-preview/quiz-preview.component';
import { QuizPlayComponent } from './components/quiz-play/quiz-play.component';


@NgModule({
  declarations: [
    QuizPreviewComponent,
    QuizPlayComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }

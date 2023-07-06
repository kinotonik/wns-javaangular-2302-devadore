import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPreviewComponent } from './components/quiz-preview/quiz-preview.component';

const routes: Routes = [
  {path: 'preview', component: QuizPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }

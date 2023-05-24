import {QuestionModel} from "./question.model";

export interface QuizModel {
  id: number;
  title: string;
  question: QuestionModel[];
  createdAt: Date;
  updatedAt: Date;

}

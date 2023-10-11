import {QuestionModel} from "./question.model";

export interface QuizModel {
  id: number;
  title: string;
  description: string;
  question: QuestionModel[];
  createdAt: Date;
  updatedAt: Date;

}

import {QuestionModel} from "./question.model";

export interface QuizModel {
  id: number;
  title: string;
  question: QuestionModel[];
/*  quizRoom: QuizRoom;*/
  createdAt: Date;
  updatedAt: Date;

}

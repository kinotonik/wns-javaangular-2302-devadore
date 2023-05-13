import { AnswerModel } from "./answer.model";

export interface QuestionModel {
  id: number;
  type: string;
  content: string;
  image: string;
  answers: AnswerModel[];
  timer: number;
}

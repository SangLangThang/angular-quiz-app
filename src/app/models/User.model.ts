import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export interface ILogin {
  username: string;
  password: string;
}
export interface Levels {
  name: string;
  levelId: string;
}
export interface Topics {
  name: string;
  levelId: string;
  topicId: string;
}
export interface QuestionsForm {
  question: string;
  topicId: string;
  multiAnswer: boolean;
  type?: string;
  questionId: string;
  answers: Answer[];
}

export interface Answer {
  name: string;
  status: boolean;
}
export interface ClientForm {
  id: string;
  name: string;
  school: string;
  class: string;
  topicId: string;
  levelId: string;
  score: number;
  time: number;
}
export interface SettingsForm {
  event_start: number;
  event_end: number,
  time_total: number,
  time_alert: number,
}

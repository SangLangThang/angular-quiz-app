export interface User{
    diem?: number;
    truong?: string;
    time?: Date;
    ten?: string;
    lop?: string;
}

export interface ILogin {
    username: string,
    password: string
}
export interface Levels {
    name:string;
    levelId:string;
}
export interface Topics {
    name:string;
    levelId:string;
    topicId:string;
}
export interface Questions {
    name:string;
    questionId:string;
    topicId:string;
    answer:number;
    answers:string[];
}
export interface Question {
    name:string;
    answer:number;
    type?:string;
    answers:string[];
}
export interface QuestionsForm {
    question: string;
    topicId: string;
    multiAnswer:boolean;
    type?:string;
    questionId:string;
    answers: Answer[];
  }
  
  export interface Answer {
    name: string;
    status: boolean;
  }
  export interface ClientForm {
    name: string;
    school:string;
    class:string;
    topicId:string;
    levelId:string;
    score:number;
  }
  
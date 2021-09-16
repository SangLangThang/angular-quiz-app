import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerQuestionsService {
  storage=sessionStorage;
  constructor() { }
  setLevel(level:any){
    this.storage.setItem('level',JSON.stringify(level));
  }
  getLevel(){
    return JSON.parse(this.storage.getItem('level')||'')
  }
  setTopic(topic:any){
    this.storage.setItem('topic',JSON.stringify(topic));
  }
  getTopic(){
    return JSON.parse(this.storage.getItem('topic')||'')
  }
  setQuestion(question:any){
    this.storage.setItem('question',JSON.stringify(question));
  }
  getQuestion(){
    return JSON.parse(this.storage.getItem('question')||'')
  }
  clearData(){
    this.storage.clear()
  }
}

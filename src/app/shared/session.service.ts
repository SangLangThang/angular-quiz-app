import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  storage=sessionStorage;
  clearSesstion(){
    this.storage.clear()
  }
  setClientId(id:string){
    this.storage.setItem('clientId',JSON.stringify(id));
  }
  getClientId(){
    return JSON.parse(this.storage.getItem('clientId')||'')
  }
  setClientTopicId(id:string){
    this.storage.setItem('clientTopicId',JSON.stringify(id));
  }
  getClientTopicId(){
    return JSON.parse(this.storage.getItem('clientTopicId')||'')
  }
  setClientLevelId(id:string){
    this.storage.setItem('clientLevelId',JSON.stringify(id));
  }
  getClientLevelId(){
    return JSON.parse(this.storage.getItem('clientLevelId')||'')
  }

  /* admin */
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
  setTopicIndex(index:number){
    this.storage.setItem('topicIndex',JSON.stringify(index));
  }
  getTopicIndex(){
    return JSON.parse(this.storage.getItem('topicIndex')||'')
  }
  setStartEditQuestion(status:string){
    this.storage.setItem('edit',JSON.stringify(status));
  }
  getStartEditQuestion(){
    return JSON.parse(this.storage.getItem('edit')||'')
  }

}

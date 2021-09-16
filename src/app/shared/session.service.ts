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
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}
  dataInit = {
    clientId: 'test',
    topicId: 'test',
  };
  setDataClient(clientId:string,topicId:string) {
    this.dataInit.clientId=clientId;
    this.dataInit.topicId=topicId
  }
  getDataClient(){
    return this.dataInit
  }
}


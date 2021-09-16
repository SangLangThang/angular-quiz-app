import { Injectable } from '@angular/core';
import { Levels, Topics } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class SortDataService {
  constructor() {}

  sortLevel(datas: Levels[]) {
    let newData:[any,any][] = [];
    let returnData:Levels[]=[]
    datas.forEach((data: any) => {
      newData.push([this.getNumberEnd(data.name), data]);
    });
    newData.sort(function (a, b) {
      return a[0] - b[0];
    });
    returnData=newData.map((e:any)=>{
      return e[1]
    })
    return returnData
  }
  sortTopic(datas: Topics[]) {
    let newData:[any,any][] = [];
    let returnData:Topics[]=[]
    datas.forEach((data: any) => {
      newData.push([this.getNumberEnd(data.name), data]);
    });
    newData.sort(function (a, b) {
      return a[0] - b[0];
    });
    returnData=newData.map((e:any)=>{
      return e[1]
    })
    return returnData
  }
  getNumberEnd(s: string) {
    let splitS = s.split(' ');
    let lastS = +splitS[splitS.length - 1];
    return lastS;
  }
}

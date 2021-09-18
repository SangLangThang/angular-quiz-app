import { SortDataService } from './../../shared/sort-data.service';
import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Levels, QuestionsForm, Topics } from 'src/app/models/User.model';
import { FirebaseService } from './../../shared/firebase.service';
import { SessionService } from './../../shared/session.service';

@Component({
  selector: 'app-manager-questions',
  templateUrl: './manager-questions.component.html',
  styleUrls: ['./manager-questions.component.scss'],
})
export class ManagerQuestionsComponent implements OnInit {
  @ViewChildren('test') test:QueryList<ElementRef>
  levels: Levels[];
  topicsData: Topics[];
  topics: Topics[];

  questions: QuestionsForm[];
  showQuestion: boolean = true;
  showFormQuestion: boolean = false;
  selectValue: string = '';

  currentLevelId: string = '';
  currentTopicId: string = '';

  currentTopicIndex: number = 0;
  lastTopicIndex: number = 0;

  canDelTopic = false;
  inputTopicName: string = '';

  changedIndexTopicByMat=false;

  constructor(
    private firebase$: FirebaseService,
    private router: Router,
    private session$: SessionService,
    private sortData$: SortDataService
  ) {}
  ngOnInit(): void {
    this.getLevels();
    this.getTopics();
  }
  
  private getLevels(indexLevel: number = 0) {
    this.firebase$.getLevels().subscribe((levels: any) => {
      this.levels = this.sortData$.sortLevel(levels);
      this.currentLevelId = this.levels[indexLevel].levelId;
    });
  }

  private getTopics(levelId?:string) {
    this.firebase$.getTopics().subscribe((topics: any) => {
      this.topicsData = topics;
      this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
      this.topics = this.sortData$.sortTopic(this.topics);
    });
  }
  private updateListTopics(topics: Topics) {
    this.topicsData.push(topics);
    this.topics.push(topics);
    this.topics = this.sortData$.sortTopic(this.topics);
  }
  private deleteListTopics(topicId: string, index: number) {
    this.topics.splice(index, 1);
    this.topicsData.forEach((e, i) => {
      if (e.topicId === topicId) {
        this.topicsData.splice(i, 1);
        return;
      }
    });
  }
  private getQuestions(topicId: string) {
    this.firebase$.getQuestions(topicId).subscribe((questions: any) => {
      this.questions = questions;
      this.canDelTopic = this.questions.length > 0 ? false : true;
      
    });
  }
  onChangedLevel(levelId: string) {
    this.currentLevelId = levelId;
    this.topics = this.filterTopic(levelId, this.topicsData);
    this.questions=[]
    if(this.topics.length>0){
      this.getQuestions(this.topics[this.currentTopicIndex].topicId);
    }
  }

  topicChanged(topic: MatTabChangeEvent): void {
    this.lastTopicIndex=this.currentTopicIndex
    if (this.topics.length > 0) {
      this.getQuestions(topic.tab.ariaLabel);
      this.currentTopicId = topic.tab.ariaLabel;
      this.currentTopicIndex = topic.index;
      console.log(this.test)
    }
  }
  addTopic() {
    this.topicsData=[]
    this.topics=[]
    this.questions=[]
    this.firebase$
      .addTopic(this.currentLevelId, this.inputTopicName)
      .then((value) => {
        this.getTopics()
        this.inputTopicName=''
      });
  }
  deleteTopic() {
    this.topicsData=[]
    this.topics=[]
    this.questions=[]
    this.firebase$.deleteTopic(this.currentTopicId).then((value: any) => {
      this.getTopics()
    });
  }

  filterTopic(levelId: string, topics: Topics[]): Topics[] {
    return topics.filter((topic) => topic.levelId === levelId);
  }

  getLevelWithLevelId(levelId: string, levels: Levels[]) {
    let newLevel = [...levels];
    return newLevel.filter((e) => e.levelId === levelId)[0];
  }

  deleteQuestion(questionId: string) {
    this.topics = [];
    this.firebase$.deleteQuestion(questionId).then((value) => {
      this.firebase$.getTopics().subscribe((topics: any) => {
        this.topicsData = this.sortData$.sortTopic(topics);
        this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
      });
    });
  }
}

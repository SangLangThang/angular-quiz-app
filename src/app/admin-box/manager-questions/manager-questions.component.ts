import { SortDataService } from './../../shared/sort-data.service';
import { Component, OnInit } from '@angular/core';
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
  levels: Levels[];
  topicsData: Topics[];
  topics: Topics[];

  questions: QuestionsForm[];
  showQuestion: boolean = true;
  showFormQuestion: boolean = false;
  selectValue: string = '';

  currentLevelId:string;
  currentTopicId: string;
  currentIndexTab = 0;
  constructor(
    private firebase$: FirebaseService,
    private router: Router,
    private session$: SessionService,
    private sortData$: SortDataService
  ) {}
  ngOnInit(): void {
    console.log('init manager question');
    this.startManager();
  }

  startManager() {
    this.session$.clearSesstion();
    this.session$.setQuestion('');
    this.firebase$.getLevels().subscribe((levels: any) => {
      console.log('get levels ok');
      this.levels = this.sortData$.sortLevel(levels);
      this.currentLevelId = this.levels[0].levelId;
      this.session$.setLevel(this.getLevelWithLevelId(this.currentLevelId,this.levels));
    });
    //use get all topics because get levels have delay=> cannot get topic with levelID
    this.firebase$.getTopics().subscribe((topics: any) => {
      console.log('get topics ok');
      this.topicsData = this.sortData$.sortTopic(topics);
      this.topics = this.selectedTopics(this.currentLevelId, this.topicsData);
    });
  }

  selectedTopics(levelId: string, topics: Topics[]): Topics[] {
    return topics.filter((topic) => topic.levelId === levelId);
  }
  getLevelWithLevelId(levelId: string, levels: Levels[]) {
    let newLevel = [...levels];
    return newLevel.filter((e) => e.levelId === levelId)[0];
  }

  onChangedLevel(levelId: string) {
    this.session$.setLevel(this.getLevelWithLevelId(levelId, this.levels));
    /*  */
    this.currentLevelId = levelId;
    this.topics = this.selectedTopics(levelId, this.topicsData);

    if(this.topics.length>0){
      while (
        this.topics[this.currentIndexTab] === undefined &&
        this.currentIndexTab >= 0
      ) {
        this.currentIndexTab--;
      }
      this.firebase$
      .getQuestions(this.topics[this.currentIndexTab].topicId)
      .subscribe((questions: any) => {
        console.log('get questions ok');
        this.questions = questions;
      });
      this.session$.setTopic(this.topics[this.currentIndexTab]);
    }
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if(this.topics.length>0){
      this.currentIndexTab = tabChangeEvent.index;
      this.currentTopicId = tabChangeEvent.tab.ariaLabel;
      this.session$.setTopic(this.topics[this.currentIndexTab]);
      this.firebase$
        .getQuestions(this.currentTopicId)
        .subscribe((questions: any) => {
          console.log('get questions ok');
          this.questions = questions;
        });
    }
  }

  editQuestion(question: QuestionsForm) {
    this.session$.setQuestion(question);
    this.router.navigate(['/admin/questions/edit']);
  }

  deleteQuestion(questionId: string) {
    console.log(questionId);
  }
}

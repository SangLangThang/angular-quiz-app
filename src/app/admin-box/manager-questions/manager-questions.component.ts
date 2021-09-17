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

  currentLevelId: string = '';
  currentTopicId: string = '';
  currentTopicIndex: number = 0;
  canDelTopic = false;
  inputTopicName: string = '';

  constructor(
    private firebase$: FirebaseService,
    private router: Router,
    private session$: SessionService,
    private sortData$: SortDataService
  ) {}
  ngOnInit(): void {
    console.log('init component manager');
    if (this.session$.getStartEditQuestion() === 'no') {
      this.startManager();
    }
    if (this.session$.getStartEditQuestion() === 'yes') {
      this.currentTopicIndex = +this.session$.getTopicIndex();
      this.returnManager();
    }
  }

  startManager() {
    this.session$.setQuestion('');
    this.session$.setStartEditQuestion('no');
    this.firebase$.getLevels().subscribe((levels: any) => {
      console.log('get levels ok');
      this.levels = this.sortData$.sortLevel(levels);

      this.currentLevelId =
        this.session$.getLevel() != ''
          ? this.session$.getLevel()
          : this.levels[0].levelId;
      this.session$.setLevel(this.currentLevelId);
    });
    //use get all topics because get levels have delay=> cannot get topic with levelID
    this.firebase$.getTopics().subscribe((topics: any) => {
      this.topicsData = this.sortData$.sortTopic(topics);
      this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
      console.log('filter topics:', topics);
      if (this.topics.length > 0) {
        this.session$.setTopic(this.topics[this.currentTopicIndex].topicId);
      }
    });
  }
  returnManager() {
    this.session$.setQuestion('');
    this.session$.setStartEditQuestion('no');
    this.currentTopicIndex = 1000;
    this.firebase$.getLevels().subscribe((levels: any) => {
      console.log('get levels ok');
      this.levels = this.sortData$.sortLevel(levels);
      this.currentLevelId = this.session$.getLevel();
    });
    this.firebase$.getTopics().subscribe((topics: any) => {
      this.topicsData = this.sortData$.sortTopic(topics);
      this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
      console.log('filter topics:', topics);
    });
  }
  filterTopic(levelId: string, topics: Topics[]): Topics[] {
    return topics.filter((topic) => topic.levelId === levelId);
  }

  getLevelWithLevelId(levelId: string, levels: Levels[]) {
    let newLevel = [...levels];
    return newLevel.filter((e) => e.levelId === levelId)[0];
  }

  onChangedLevel(levelId: string) {
    console.log('changed level');
    this.currentLevelId = levelId;
    this.session$.setLevel(levelId);
    this.topics = this.filterTopic(levelId, this.topicsData);

    if (this.topics.length > 0) {
      while (
        this.topics[this.currentTopicIndex] === undefined &&
        this.currentTopicIndex >= 0
      ) {
        this.currentTopicIndex--;
      }
      this.firebase$
        .getQuestions(this.topics[this.currentTopicIndex].topicId)
        .subscribe((questions: any) => {
          console.log('get questions ok');
          this.questions = questions;
          this.canDelTopic = this.questions.length > 0 ? false : true;
        });
    }
  }

  topicChanged(topic: MatTabChangeEvent): void {
    if (this.currentTopicIndex === 1000) {
      this.currentTopicIndex = +this.session$.getTopicIndex();
    } else {
      if (this.topics.length > 0) {
        console.log('changed topic');
        this.firebase$
          .getQuestions(topic.tab.ariaLabel)
          .subscribe((questions: any) => {
            console.log(questions);
            this.questions = questions;
            this.canDelTopic = this.questions.length > 0 ? false : true;
            this.currentTopicIndex = topic.index;
            this.currentTopicId = topic.tab.ariaLabel;
            this.session$.setTopic(topic.tab.ariaLabel);
            this.session$.setTopicIndex(topic.index);
          });
      }
    }
  }

  editQuestion(question: QuestionsForm) {
    this.session$.setStartEditQuestion('yes');
    this.session$.setQuestion(question);
    this.router.navigate(['/admin/questions/edit']);
  }
  newQuestion() {
    this.session$.setStartEditQuestion('yes');
    this.router.navigate(['/admin/questions/edit']);
    /* this.session$.setTopicIndex(1)
    this.currentTopicIndex= +this.session$.getTopicIndex() */
  }
  deleteQuestion(questionId: string) {
    this.topics = [];
    this.firebase$.deleteQuestion(questionId).then((value) => {
      this.firebase$.getTopics().subscribe((topics: any) => {
        console.log('get topics ok');
        this.topicsData = this.sortData$.sortTopic(topics);
        this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
      });
    });
  }
  deleteTopic() {
    this.topics = [];
    this.topicsData = [];
    console.log('start del', this.topics);
    this.firebase$.deleteTopic(this.currentTopicId).then((value: any) => {
      this.firebase$.getTopics().subscribe((topics: any) => {
        this.topicsData = this.sortData$.sortTopic(topics);
        this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
        console.log('filter', this.topics);
        if (this.topics.length === 0) {
          this.currentTopicIndex = 0;
        }
      });
    });
  }
  addTopic() {
    this.topics = [];
    this.topicsData = [];
    this.firebase$
      .addTopic(this.currentLevelId, this.inputTopicName)
      .then((value) => {
        this.firebase$.getTopics().subscribe((topics: any) => {
          this.inputTopicName = '';
          console.log('get topics ok');
          this.topicsData = this.sortData$.sortTopic(topics);
          this.topics = this.filterTopic(this.currentLevelId, this.topicsData);
        });
      });
  }
}

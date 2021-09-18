import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Levels, QuestionsForm, Topics } from 'src/app/models/User.model';
import { FirebaseService } from './../../shared/firebase.service';

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
  currentLevelId: string;
  currentTopicId: string;
  currentTopicIndex: number = 0;
  lastTopicIndex: number = 0;
  canDelTopic = false;
  inputTopicName: string = '';
  changedIndexTopicByMat=false;
  tabIndex: number;

  constructor(
    private firebase$: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getLevels();
  }

  getLevels() {
    this.firebase$.getLevels()
      .subscribe((levels: any[]) => {
        this.levels = levels.sort((a, b) => (a.name < b.name ? -1 : 1));;
        this.currentLevelId = this.levels[0].levelId;
        this.getTopics();
      });
  }

  getTopics() {
    this.firebase$.getTopicsWithLevelId(this.currentLevelId)
      .subscribe((topics: any[]) => {
        this.topics = topics.sort((a, b) => (a.name < b.name ? -1 : 1));;
        this.currentTopicId = this.topics[0].topicId
        this.getQuestions();
      });
  }

  getQuestions() {
    this.firebase$.getQuestions(this.currentTopicId)
      .subscribe((questions: any[]) => {
        this.questions = questions.sort((a, b) => (a.name < b.name ? -1 : 1));;
      });
  }

  addTopic() {
    this.firebase$
      .addTopic(this.currentLevelId, this.inputTopicName)
      .then(_ => {
        this.getTopics()
        this.inputTopicName = ''
      });
  }

  tabChange(topic: MatTabChangeEvent) {
    this.currentTopicId = topic.tab.ariaLabel;
    this.getQuestions();
  }

  deleteTopic() {
    this.firebase$.deleteTopic(this.currentTopicId)
      .then(_ => {
        this.tabIndex = 0;
        this.getTopics();
      });
  }

  deleteQuestion(questionId: string) {
    this.firebase$.deleteQuestion(questionId)
    .then(_ => this.getQuestions());
  }
}

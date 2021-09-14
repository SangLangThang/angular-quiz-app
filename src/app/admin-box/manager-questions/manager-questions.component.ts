import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Levels, QuestionsForm, Topics } from 'src/app/models/User.model';
import { FirebaseService } from './../../shared/firebase.service';
import { ManagerQuestionsService } from './../../shared/manager-questions.service';

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

  defautLevel: string;
  defaultTopic:string
  defaultIndexTab = 0;
  constructor(
    private firebase$: FirebaseService,
    private router: Router,
    private managerQuestions$: ManagerQuestionsService
  ) {}
  ngOnInit(): void {
    console.log("init manager question")
    this.startManager();
  }

  startManager(indexLevel = 2) {
    this.managerQuestions$.clearData();
    this.managerQuestions$.setQuestion('');
    this.firebase$.getLevels().subscribe((levels: any) => {
      console.log('get levels ok');
      this.levels = levels;
      this.defautLevel = this.levels[indexLevel].levelId;
      this.managerQuestions$.setLevel(
        this.addLevelToSession(this.defautLevel, this.levels)
      );
    });
    this.firebase$.getTopics().subscribe((topics: any) => {
      console.log('get topics ok');
      console.log(topics)
      this.topicsData = topics;
      this.topics = this.selectedTopics(this.defautLevel, this.topicsData);
    });
  }

  selectedTopics(levelId: string, topics: Topics[]): Topics[] {
    return topics.filter((topic) => topic.levelId === levelId);
  }
  addLevelToSession(levelId: string, levels: Levels[]) {
    let newLevel = [...levels];
    return newLevel.filter((e) => e.levelId === levelId)[0];
  }

  onChangedLevel(levelId: string) {
    this.managerQuestions$.setLevel(
      this.addLevelToSession(levelId, this.levels)
    );
    /*  */
    this.defautLevel = levelId;
    this.topics = this.selectedTopics(this.defautLevel, this.topicsData);
    while (this.topics[this.defaultIndexTab] === undefined) {
      this.defaultIndexTab--;
    }
    this.firebase$
      .getQuestions(this.topics[this.defaultIndexTab].topicId)
      .subscribe((questions: any) => {
        console.log('get questions ok');
        this.questions = questions;
      });

    this.managerQuestions$.setTopic(this.topics[this.defaultIndexTab]);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.defaultIndexTab = tabChangeEvent.index;
    this.defaultTopic = tabChangeEvent.tab.ariaLabel;

    this.managerQuestions$.setTopic(this.topics[this.defaultIndexTab]);
    this.firebase$.getQuestions(this.defaultTopic).subscribe((questions: any) => {
      console.log('get questions ok');
      this.questions = questions;
    });
  }

  editQuestion(question: QuestionsForm) {
    this.managerQuestions$.setQuestion(question);
    this.router.navigate(['/admin/questions/edit']);
  }

  deleteQuestion(questionId: string) {
    console.log(questionId);
  }

 
}

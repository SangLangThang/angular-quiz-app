import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
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
  changedIndexTopicByMat = false;
  tabIndex: number;

  toggle: boolean[] = [];

  constructor(
    private firebase$: FirebaseService,
    private renderer: Renderer2
  ) {}
  @ViewChildren('templateQuestion') templateQuestion: QueryList<ElementRef>;
  ngOnInit(): void {
    console.log('init')
    this.getLevels();
  }

  getLevels() {
    this.firebase$.getLevels().subscribe((levels: any[]) => {
      this.levels = levels.sort((a, b) => (a.name < b.name ? -1 : 1));
      this.currentLevelId = this.levels[0].levelId;
      this.getTopics();
    });
  }

  getTopics() {
    console.log('currentLevelId:', this.currentLevelId);
    this.firebase$
      .getTopicsWithLevelId(this.currentLevelId)
      .subscribe((topics: any[]) => {
        if (topics?.length <= 0) {
          this.topics = [];
          this.currentTopicId = '';
          return;
        }
        this.topics = topics.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.currentTopicId = this.topics[0].topicId;
        this.getQuestions();
      });
  }

  getQuestions() {
    console.log('currentTopicId:', this.currentTopicId);
    this.firebase$
      .getQuestions(this.currentTopicId)
      .subscribe((questions: any[]) => {
        console.log('listquestion', questions);
        this.questions = questions.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.questions.forEach((e) => this.toggle.push(true));
      });
  }

  addTopic() {
    this.firebase$
      .addTopic(this.currentLevelId, this.inputTopicName)
      .then((_) => {
        this.getTopics();
        this.inputTopicName = '';
      });
  }

  tabChange(topic: MatTabChangeEvent) {
    if (this.topics?.length > 0) {
      this.currentTopicId = topic.tab.ariaLabel;
      this.getQuestions();
    }
  }

  deleteTopic() {
    this.firebase$.deleteTopic(this.currentTopicId).then((_) => {
      this.tabIndex = 0;
      this.getTopics();
    });
  }

  deleteQuestion(questionId: string) {
    this.firebase$.deleteQuestion(questionId).then((_) => this.getQuestions());
  }
  changeLevel() {
    console.log(this.currentLevelId)
    this.questions=[] //clear question when reload because if topic length <0
    this.getTopics();
  }
  toggleAnswer(index: number) {
    let ele = this.templateQuestion.filter((e, i) => i === index)[0]
      .nativeElement;
    this.toggle[index]
      ? this.renderer.addClass(ele, 'show')
      : this.renderer.removeClass(ele, 'show');
    this.toggle[index] = !this.toggle[index];
  }
}

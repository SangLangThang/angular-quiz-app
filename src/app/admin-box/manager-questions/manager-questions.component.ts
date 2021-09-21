import {
  Component, OnInit
} from '@angular/core';
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
  currentLevelId: string;
  currentTopicId: string;
  currentTopicIndex: number = 0;
  inputTopicName: string = '';
  tabIndex: number;
  toggle: any[] = [];

  constructor(
    private firebase$: FirebaseService,
  ) {}

  ngOnInit(): void {
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
    this.firebase$
      .getQuestions(this.currentTopicId)
      .subscribe((questions: any[]) => {
        console.log(questions)
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
    this.questions = []; //clear question when reload because if topic length <0
    this.getTopics();
  }
  changeTopic(id: string) {
    this.currentTopicId = id;
    this.getQuestions();
  }
  toggleAnswer(index: number) {
    if(this.toggle.includes(index)){
      this.toggle=this.toggle.filter(x=>x!=index)
      return 
    }
    this.toggle.push(index)
  }
}

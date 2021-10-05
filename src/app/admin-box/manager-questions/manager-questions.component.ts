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
  inputTopicName: string = '';
  tabIndex: number;
  toggle: any[] = [];
  // cacheObject: any = {
  //   currentLevelId: '',
  //   currentTopicId: ''
  // };

  constructor(
    private firebase$: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.getLevels();
  }

  // ngOnDestroy(): void {
  //   localStorage.removeItem('cacheObject');
  // }

  // getLocalStorage() {
  //   const cache = localStorage.getItem('cacheObject');
  //   if(localStorage.getItem('cacheObject'))
  //     this.cacheObject = JSON.parse(cache ?? '')
  //   this.getLevels();
  // }

  // setLocalStorage() {
  //   this.cacheObject.currentLevelId = this.currentLevelId;
  //   this.cacheObject.currentTopicId = this.currentTopicId;
  //   localStorage.setItem('cacheObject', JSON.stringify(this.cacheObject));
  // }

  getLevels() {
    this.firebase$.getLevels().subscribe((levels: any[]) => {
      this.levels = levels.sort((a, b) => (a.name < b.name ? -1 : 1));
      // if(this.cacheObject && this.cacheObject.currentLevelId) {
      //   this.currentLevelId = this.cacheObject.currentLevelId;
      // } else {
      //  this.cacheObject.currentLevelId = this.currentLevelId;
      // }
      // this.cacheObject.currentLevelId = this.currentLevelId;
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
        // if(this.cacheObject && this.cacheObject.currentTopicId) {
        //   this.currentTopicId = this.cacheObject.currentTopicId;
        // } else {
        //   this.currentTopicId = this.topics[0].topicId;
        // }
        // this.cacheObject.currentTopicId = this.currentTopicId;
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
    // this.cacheObject.currentTopicId = this.currentTopicId;
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

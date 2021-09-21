import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsForm, SettingsForm } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { GameService } from '../shared/game.service';
@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.scss'],
})
export class GameBoxComponent implements OnInit {
  /* UI */
  showBackground = true;
  showResult = false;
  showGame = true;
  /* Data from sever */
  questions: QuestionsForm[] = [];
  dataInit = {
    clientId: '',
    topicId: '',
  };
  config:SettingsForm
  client: any;

  start: any;
  time_start = 0;
  time_alert=0;
  percent_time = '0%';
  ques_total = 0;
  user_select: number[] = [];
  currentQuestion: number = 0;
  score = 0;
  result_info = [
    ['🎉', 'Thật tuyệt!'],
    ['😎', 'Chúc mừng!'],
    ['😐', 'Thật tiếc!'],
  ];
  seletSlogan = 0;

  constructor(
    private router: Router,
    private firebase$: FirebaseService,
    private game$: GameService
  ) {}

  ngOnInit(): void {
    this.dataInit = this.game$.getDataClient();
    this.getConfig()
    this.getQuestions();
    this.getClient();
  }

  getConfig(){
    this.firebase$.getConfig().subscribe((config:any)=>{
      this.config=config[0]
      this.time_start=this.config.time_total;
      this.time_alert=this.config.time_alert
    })
  }

  getClient() {
    this.firebase$
      .getClient(this.dataInit.clientId)
      .subscribe((client: any) => {
        this.client = client;
      });
  }

  getQuestions() {
    this.firebase$
      .getQuestions(this.dataInit.topicId)
      .subscribe((questions: any) => {
        if (questions?.length <= 0) this.router.navigate(['/']);
        this.questions = questions;
        this.ques_total = questions.length;
        if (this.ques_total > 0) {
          this.startGame();
          this.questions.forEach((e) => this.user_select.push(-100));
          //use -100 as default answer of question, when you click ,-100 will change by index of answer
        }
      });
  }
 
  startGame() {
    this.start = setInterval(() => {
      this.time_start--;
      this.percent_time = `${((35 - this.time_start) * 100) / 35}%`;
      if (this.time_start === 0) {
        clearInterval(this.start);
        this.endGame();
      }
    }, 60000);
  }

  endGame() {
    this.showBackground = false;
    this.calculatorScore();
    this.showGame = false;
    this.showResult = true;
    this.firebase$.updateClient(this.dataInit.clientId, this.score, Date.now());
  }

  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion === this.ques_total) {
      this.endGame();
    }
  }

  optionSelected(questionIndex: number, select: number) {
    this.user_select[questionIndex] = select;
  }
  
  calculatorScore() {
    this.user_select.forEach((e, i) => {
      if(e!==-100){
        if (this.questions[i].answers[e].status === true) this.score++;
      }
    });

    let percent = (this.score * 100) / this.ques_total;
    //  < 10% => nood, <60% => medium, >60 % =>good
    if (percent < 10) {
      this.seletSlogan = 2;
    } else {
      if (percent < 60) {
        this.seletSlogan = 1;
      } else {
        this.seletSlogan = 0;
      }
    }
  }
}

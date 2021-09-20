import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsForm } from 'src/app/models/User.model';
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

  client: any;

  start: any;
  time_start = 35;
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
    console.log(this.dataInit)
    this.getQuestions();
    this.getClient();
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
          this.questions.forEach((e) => this.user_select.push(-1));
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
    this.firebase$.updateClient(this.dataInit.topicId, this.score, Date.now());
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
      if (this.questions[i].answers[e].status === true) this.score++;
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

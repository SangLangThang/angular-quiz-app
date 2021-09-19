import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsForm } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { SessionService } from '../shared/session.service';
@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.scss'],
})
export class GameBoxComponent implements OnInit {
  /* UI */
  showBackground=true
  /* load data for game */
  showResult = false;
  showGame = true;
  questions: QuestionsForm[] = [];
  ques_total = 0;
  multiAnswer = false;
  /* variable start game */
  clientId: string;
  topicId: string;
  text_btn_next = 'Câu tiếp theo';
  time_start = 15;
  percent = '0%';
  ques_start = 0;
  hasSelected: { index: number; status: boolean }[] = [];
  score = 0;
  correct = 0;
  start: any;
  result_icon = '🎉';
  result_slogan = 'Thật tuyệt!';
  client: any;
  can_next_question = false;
  /* game function */

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private firebase$: FirebaseService,
    private session$:SessionService
  ) {}

  @ViewChildren('option') options: QueryList<ElementRef>;

  ngOnInit(): void {
    this.clientId = this.session$.getClientId();
    this.topicId = this.session$.getClientTopicId();
    this.getQuestions();
    this.getClient();
  }

  getQuestions() {
    this.firebase$.getClient(this.clientId)
      .subscribe((client: any) => {
        this.client = client;
      });
  }

  getClient() {
    this.firebase$.getQuestions(this.topicId)
      .subscribe((questions: any) => {
        if(questions?.length <= 0)
          this.router.navigate(['/'])
        this.questions = questions;
        this.ques_total = questions.length;
        if(this.ques_total>0){
          this.startGame();
        }
      });
  }

  startGame() {
    this.time_start = 15;
    this.percent = '0%';
    this.start = setInterval(() => {
      this.time_start--;
      this.percent = `${((15 - this.time_start) * 100) / 15}%`;
      if (this.time_start === 0) {
        clearInterval(this.start);
        this.optionSelected(this.ques_start,1000, false);
      }
    }, 1000);
  }

  endGame() {
    this.showBackground=false
    if (this.score > 3) {
      this.result_icon = '🎉';
      this.result_slogan = 'Thật tuyệt!';
    } else {
      if (this.score > 1) {
        this.result_icon = '😎';
        this.result_slogan = 'Chúc mừng!';
      } else {
        this.result_icon = '😐';
        this.result_slogan = 'Thật tiếc!';
      }
    }
    this.showGame = false;
    this.showResult = true;
    this.firebase$.updateClient(this.clientId, this.score, Date.now());
  }
  nextQuestion() {
    if (this.ques_start < this.ques_total) {
      this.startGame();
      this.ques_start++;
    }
    if (this.ques_start === this.ques_total - 1) {
      this.text_btn_next = 'Hoàn thành';
    }
    if (this.ques_start === this.ques_total) {
      this.endGame();
    }
    this.can_next_question = false;
  }
  optionSelected(questionIndex: number, select: number, answer: boolean) {
    if (this.multiAnswer === true) {
      /* this.options.forEach((ele: ElementRef, i: number) => {
        if (i === select) this.renderer.addClass(ele.nativeElement, 'select');
        this.hasSelected.push({ index: select, status: answer });
      }); */
    } else {
      this.hasSelected.push({ index: select, status: answer });
      this.can_next_question = true;
      clearInterval(this.start);
      this.options.forEach((ele: ElementRef, i: number) => {
        if (select === i) {
          if (answer) {
            this.score++;
            this.renderer.addClass(ele.nativeElement, 'correct');
          } else {
            this.renderer.addClass(ele.nativeElement, 'incorrect');
            this.optionSelectedFull(this.questions[questionIndex])
          }
        }else{
          this.optionSelectedFull(this.questions[questionIndex])
        }
      });
    }
  }
  optionSelectedFull(question: QuestionsForm) {
    this.options.forEach((ele: ElementRef, i: number) => {
      this.hasSelected.forEach((e) => {
        if (e.index != i && question.answers[i].status === true) {
          this.renderer.addClass(ele.nativeElement, 'correct');
        }
      });
    });
  }
}

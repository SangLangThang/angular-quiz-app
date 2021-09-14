import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-quiz-box',
  templateUrl: './quiz-box.component.html',
  styleUrls: ['./quiz-box.component.scss'],
})
export class QuizBoxComponent implements OnInit {
  constructor() {}
  showInfo: boolean = true;
  showGame: boolean = false;
  ngOnInit(): void {}
  startGame(){
    this.showInfo=!this.showInfo;
    this.showGame=!this.showGame
  }
}

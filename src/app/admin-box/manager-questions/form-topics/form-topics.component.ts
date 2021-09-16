import { SortDataService } from './../../../shared/sort-data.service';
import { ManagerQuestionsService } from './../../../shared/manager-questions.service';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Topics } from 'src/app/models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-topics',
  templateUrl: './form-topics.component.html',
  styleUrls: ['./form-topics.component.scss'],
})
export class FormTopicsComponent implements OnInit {
  constructor(
    private firebase$: FirebaseService,
    private managerQuestions$: ManagerQuestionsService,
    private router: Router,
    private sortData$:SortDataService
  ) {}
  topics: Topics[] = [];
  level: any;
  inputNameTopic:string
  ngOnInit(): void {
    this.level = this.managerQuestions$.getLevel();
    console.log(this.level)
    this.firebase$.getTopicsWithId(this.level.levelId).subscribe((topics: any) => {
      this.topics = this.sortData$.sortTopic(topics)
    });
  }
  addTopic(){
    this.firebase$.addTopic(this.level.levelId,this.inputNameTopic)
    this.router.navigate(['admin/questions']);
  }
  deleteTopic(){
    
  }
}

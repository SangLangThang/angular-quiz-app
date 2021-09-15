import { ManagerQuestionsService } from './../shared/manager-questions.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Levels, Topics } from '../models/User.model';
import { FirebaseService } from './../shared/firebase.service';
@Component({
  selector: 'app-start-box',
  templateUrl: './start-box.component.html',
  styleUrls: ['./start-box.component.scss'],
})
export class StartBoxComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebase$: FirebaseService,
    private router: Router
  ) {}
  clientForm: FormGroup;
  levels: Levels[] = [];
  topicsData: Topics[] = [];
  topics: Topics[] = [];
  defaultLevel: string;

  defaultTopic: string;
  ngOnInit(): void {
    this.buildForm();
    this.firebase$.getLevels().subscribe((levels: any) => {
      console.log('get levels finish');
      this.levels = levels;
      this.defaultLevel = this.levels[2].levelId;
      this.clientForm.get('levelId')?.setValue(this.defaultLevel);
      //use 2 because levels[2]={name:Cấp 1}
    });
    this.firebase$.getTopics().subscribe((topics: any) => {
      console.log('get topics finish');
      this.topicsData = topics;
      this.topics = this.selectedTopics(this.defaultLevel, this.topicsData);
      this.clientForm.get('topicId')?.setValue(this.topics[0].topicId);
    });
  }

  buildForm() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      school: ['', [Validators.required]],
      class: ['', [Validators.required]],
      topicId: [null, [Validators.required]],
      levelId: [null, [Validators.required]],
    });
  }
  selectedTopics(levelId: string, topics: Topics[]): Topics[] {
    let result = topics.filter((topic) => topic.levelId === levelId);
    this.clientForm.get('topicId')?.setValue(result[0].topicId);
    return result;
  }
  getNameLevel(levelId: string) {
    let result = '';
    this.levels.forEach((e) => {
      if (e.levelId === levelId) {
        result = e.name;
      }
    });
    return result;
  }
  getNameTopic(topicId: string) {
    let result = '';
    this.topics.forEach((e) => {
      if (e.topicId === topicId) {
        result = e.name;
      }
    });
    return result;
  }
  onLevelChange(levelId: any) {
    this.topics = this.selectedTopics(levelId, this.topicsData);
  }

  onSubmit() {
    const newClient = {
      ...this.clientForm.value,
      time: Date.now(),
      score: 0,
      topicId: this.getNameTopic(this.clientForm.value.topicId),
      levelId: this.getNameLevel(this.clientForm.value.levelId),
    };
    console.log(newClient);

    this.firebase$.addClient(newClient).then((value) => {
      this.router.navigate([
        'start',
        value.id,
        this.clientForm.value.levelId,
        this.clientForm.value.topicId,
      ]);
    });
  }
}

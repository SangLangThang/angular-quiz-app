import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Levels, Questions, Topics } from '../models/User.model';
import { FirebaseService } from './../shared/firebase.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-start-box',
  templateUrl: './start-box.component.html',
  styleUrls: ['./start-box.component.scss'],
})
export class StartBoxComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  clientForm: FormGroup;
  levels: Levels[] = [];
  topicsData: Topics[] = [];
  topics: Topics[] = [];
  questions: Questions[] = [];
  levelDefault = '';
  ngOnInit(): void {
    this.buildForm();
    this.firebaseService
      .getLevels()
      .pipe(take(1))
      .subscribe((levels: any) => {
        console.log('get data levels finish');
        this.levels = levels;
        this.clientForm.get('levelId')?.setValue(this.levels[2].levelId);
        //use 2 because levels[2]={name:Cấp 1}
      });
    this.firebaseService
      .getTopics()
      .pipe(take(1))
      .subscribe((topics: any) => {
        console.log('get data topics finish:');
        this.topicsData = topics;
        this.topics = this.selectedTopics(
          this.levels[2].levelId,
          this.topicsData
        );
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
    return topics.filter((topic) => topic.levelId === levelId);
  }
  onLevelChange(levelId: string) {
    this.topics = this.selectedTopics(levelId, this.topicsData);
  }

  onSubmit() {
    const newClient = { score: 0, ...this.clientForm.value };
    this.firebaseService.addClient(newClient).then((value) => {
      this.router.navigate([
        'start',
        value.id,
        this.clientForm.value.levelId,
        this.clientForm.value.topicId,
      ]);
    });
  }
}

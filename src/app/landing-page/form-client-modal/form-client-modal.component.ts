import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Levels, Topics } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { SessionService } from './../../shared/session.service';

@Component({
  selector: 'app-form-client-modal',
  templateUrl: './form-client-modal.component.html',
  styleUrls: ['./form-client-modal.component.scss'],
})
export class FormClientModalComponent implements OnInit {
  isCreating = false;
  clientForm: FormGroup;
  levels: Levels[] = [];
  topicsData: Topics[] = [];
  topics: Topics[] = [];
  currentLevelId: string;
  defaultTopic: string;

  constructor(
    private fb: FormBuilder,
    private firebase$: FirebaseService,
    private router: Router,
    private session$: SessionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.session$.clearSesstion();
    this.getLevels();
  }

  getLevels() {
    this.firebase$.getLevels()
      .subscribe((levels: any[]) => {
        this.levels = levels.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.currentLevelId = this.levels[0].levelId;
        this.getTopics();
        // this.clientForm.get('levelId')?.setValue(this.currentLevelId);
      });
  }

  getTopics() {
    this.firebase$.getTopicsWithLevelId(this.currentLevelId)
      .subscribe((topics: any[]) => {
        this.topics = topics.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.defaultTopic = this.topics[0].topicId;
        this.buildForm();
        // this.topics = this.selectedTopics(this.currentLevelId, this.topicsData);
        // this.clientForm.get('topicId')?.setValue(this.topics[0].topicId);
      });
  }

  buildForm() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      school: ['', [Validators.required]],
      class: ['', [Validators.required]],
      topicId: [this.defaultTopic ?? null, [Validators.required]],
      levelId: [this.currentLevelId ?? null, [Validators.required]],
    });
  }
  // selectedTopics(levelId: string, topics: Topics[]): Topics[] {
  //   let result = topics.filter((topic) => topic.levelId === levelId);
  //   this.clientForm.get('topicId')?.setValue(result[0].topicId);
  //   return result;
  // }

  // onLevelChange(levelId: any) {
  //   this.topics = this.selectedTopics(levelId, this.topicsData);
  // }
  onSubmit() {
    this.isCreating = true;
    const newClient = {
      ...this.clientForm.value,
      time: Date.now(),
      score: 0,
      topicId: this.getNameTopic(this.clientForm.value.topicId),
      levelId: this.getNameLevel(this.clientForm.value.levelId),
    };
    this.session$.setClientTopicId(this.clientForm.value.topicId);
    this.session$.setClientLevelId(this.clientForm.value.levelId);
    this.firebase$.addClient(newClient)
      .then((value) => {
        this.session$.setClientId(value.id);
        this.isCreating = false;
        this.firebase$.isCreatedClient=true
        this.dialog.closeAll();
        this.router.navigate(['play'])
      });
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
}

import { SessionService } from './../../shared/session.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Levels, Topics } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { SortDataService } from 'src/app/shared/sort-data.service';

@Component({
  selector: 'app-form-client-modal',
  templateUrl: './form-client-modal.component.html',
  styleUrls: ['./form-client-modal.component.scss'],
})
export class FormClientModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebase$: FirebaseService,
    private router: Router,
    private session$: SessionService,
    private dialog: MatDialog,
    private sortData$: SortDataService
  ) {}
  isCreating = false;
  clientForm: FormGroup;
  levels: Levels[] = [];
  topicsData: Topics[] = [];
  topics: Topics[] = [];
  currentLevelId: string;

  defaultTopic: string;
  ngOnInit(): void {
    this.session$.clearSesstion();
    this.buildForm();
    this.firebase$.getLevels().subscribe((levels: any) => {
      // console.log('get levels finish');
      this.levels = this.sortData$.sortLevel(levels);;
      this.currentLevelId = this.levels[0].levelId;
      this.clientForm.get('levelId')?.setValue(this.currentLevelId);
      //use 2 because levels[2]={name:Cấp 1}
    });
    this.firebase$.getTopics().subscribe((topics: any) => {
      // console.log('get topics finish');
      this.topicsData = this.sortData$.sortTopic(topics);
      this.topics = this.selectedTopics(this.currentLevelId, this.topicsData);
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
  @Output() created = new EventEmitter();
  onSubmit() {
    const newClient = {
      ...this.clientForm.value,
      time: Date.now(),
      score: 0,
      topicId: this.getNameTopic(this.clientForm.value.topicId),
      levelId: this.getNameLevel(this.clientForm.value.levelId),
    };
    this.isCreating = true;
    this.session$.setClientTopicId(this.clientForm.value.topicId);
    this.session$.setClientLevelId(this.clientForm.value.levelId);
    this.firebase$.addClient(newClient).then((value) => {
      this.session$.setClientId(value.id);
      this.isCreating = false;
      this.firebase$.isCreatedClient=true
      this.dialog.closeAll();
      this.router.navigate(['play'])
    });
  }
}

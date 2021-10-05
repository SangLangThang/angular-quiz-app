import { GameService } from './../../shared/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Levels, Topics } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';

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
    private dialog: MatDialog,
    private game$:GameService
  ) {}

  ngOnInit(): void {
    this.getLevels();
  }

  getLevels() {
    this.firebase$.getLevels()
      .subscribe((levels: any[]) => {
        this.levels = levels.sort((a, b) => (a.name < b.name ? -1 : 1));
        if(this.levels.length > 0)
          this.currentLevelId = this.levels[0].levelId;
        this.getTopics();
      });
  }

  changeLevel() {
    this.firebase$.getTopicsWithLevelId(this.clientForm.value.levelId)
      .subscribe((topics: any[]) => {
        this.topics = topics.sort((a, b) => (a.name < b.name ? -1 : 1));
        if(this.topics.length > 0)
          this.clientForm.get('topicId')?.setValue(this.topics[0].topicId);
      });
  }

  getTopics() {
    this.firebase$.getTopicsWithLevelId(this.currentLevelId)
      .subscribe((topics: any[]) => {
        this.topics = topics.sort((a, b) => (a.name < b.name ? -1 : 1));
        if(this.topics.length > 0)
          this.defaultTopic = this.topics[0].topicId;
        this.buildForm();
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

  onSubmit() {
    this.isCreating = true;
    const newClient = {
      ...this.clientForm.value,
      time: Date.now(),
      score: 0,
      topicId: this.getNameTopic(this.clientForm.value.topicId),
      levelId: this.getNameLevel(this.clientForm.value.levelId),
    };
    this.firebase$.addClient(newClient)
      .then((value) => {
        this.game$.setDataClient(value.id,this.clientForm.value.topicId)
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

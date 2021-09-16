import { SessionService } from './../../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionsForm } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { DialogService } from '../../../shared/dialog.service';
@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialog$: DialogService,
    private session$: SessionService,
    private firebase$: FirebaseService,
    private router: Router
  ) {}
  questionForm: FormGroup;
  dataFromSession: any;
  topicId: string;
  questionId: string;
  havePicture=false;
  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }
  ngOnInit(): void {
    this.buildForm();
    this.dataFromSession = this.session$.getQuestion();
    if (this.dataFromSession !== '') {
      this.questionId = this.dataFromSession.questionId;
      this.updateForm(this.dataFromSession);
    } else {
      this.topicId = this.session$.getTopic().topicId;
    }
  }

  updateForm(form: any) {
    for (let i = 1; i < form.answers.length; i++) {
      this.answers.push(this.createAnswer());
    }

    this.questionForm.patchValue({
      question: form.question,
      multiAnswer: form.multiAnswer,
      answers: [...form.answers],
    });
  }
  buildForm() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      multiAnswer: [false, Validators.required],
      picture: [false, Validators.required],
      answers: new FormArray([this.createAnswer()]),
    });
  }
  createAnswer(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      status: [false, Validators.required],
    });
  }
  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }
  onSelectMultiAnswer(value: any) {
    console.log(value);
  }
  clearCheckbox(index: number) {
    if (this.questionForm.value.multiAnswer == false) {
      for (let i = 0; i < this.answers.controls.length; i++) {
        i != index
          ? this.answers.at(i).patchValue({ status: false })
          : this.answers.at(i).patchValue({ status: true });
      }
    } else {
      this.answers
        .at(index)
        .patchValue({ status: !this.answers.at(index).value.status });
    }
  }
  onSubmit(value: any) {
    if (this.dataFromSession === '') {
      let newQuestionsForm: QuestionsForm = {
        topicId: this.topicId,
        ...value,
      };
      this.firebase$.addQuestions(newQuestionsForm).then((value) => {
        this.dialog$.openSnackBar();
        this.router.navigate(['admin/questions']);
      });
    } else {
      this.firebase$.editQuestions(this.questionId, value).then((value) => {
        this.dialog$.openSnackBar();
        this.router.navigate(['admin/questions']);
      });
    }
  }
}

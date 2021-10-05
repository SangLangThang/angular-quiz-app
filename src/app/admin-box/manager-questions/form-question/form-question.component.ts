import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsForm } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebase$: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot.params['questionID']) {
      this.questionId = this.route.snapshot.params['questionID'];
    }
    if (this.route.snapshot.params['topicId']) {
      this.topicId = this.route.snapshot.params['topicId'];
    }
  }
  submitted = false;
  isSuccess: boolean = false;
  message: string;
  questionForm: FormGroup;
  topicId: string;
  questionId: string;
  question: any;

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  ngOnInit(): void {
    if (this.questionId) {
      this.firebase$.getQuestion(this.questionId).subscribe((data: any) => {
        this.question = data;
        this.buildForm();
      });
    } else {
      this.buildForm();
      this.answers.at(0).patchValue({ status: true });
    }
  }

  buildForm() {
    this.questionForm = this.fb.group({
      question: [this.question?.question ?? '', Validators.required],
      questionImg: [this.question?.questionImg ?? '', null],
      multiAnswer: [this.question?.multiAnswer ?? false, Validators.required],
      type: [this.question?.type ?? 'text', Validators.required],
      answers: new FormArray(
        this.question?.answers?.length > 0
          ? this.question?.answers.map((item: any) => this.createAnswer(item))
          : [this.createAnswer()]
      ),
    });
  }

  createAnswer(item?: any): FormGroup {
    return this.fb.group({
      name: [item?.name ?? '', Validators.required],
      status: [item?.status ?? false, Validators.required],
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
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

  reset() {
    this.questionForm.reset();
    this.questionForm.patchValue({ type: 'text' });
    this.answers.at(0).patchValue({ status: true });
  }

  onSubmit(value: any) {
    if(this.questionId){
      this.editQuestion(this.questionId,value)
      return
    }
    this.createQuestion(value);
  }

  private createQuestion(valueForm: any) {
    let newQuestionsForm: QuestionsForm = {
      topicId: this.topicId,
      ...valueForm,
    };
    this.firebase$.addQuestions(newQuestionsForm)
      .then(()=>{
        this.message = `Thêm ${this.questionForm.value.question} thành công`;
        this.isSuccess = true;
        this.submitted = true;
        this.reset();
        this.hideAlert();
      });
  }

  private editQuestion(questionID: string, valueForm: any) {
    this.firebase$.editQuestions(questionID, valueForm)
      .then(() => {
        this.message = `Chỉnh sửa ${this.questionForm.value.question} thành công`;
        this.isSuccess = true;
        this.submitted = true;
        this.hideAlert();
        // this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

  hideAlert() {
    setTimeout(() => {
      this.isSuccess = false;
      this.message = '';
    }, 3000);
  }
}

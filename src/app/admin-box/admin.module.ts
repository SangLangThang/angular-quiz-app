import { AdminBoxComponent } from './admin-box.component';
import { ManagerClientsComponent } from './manager-clients/manager-clients.component';
import { ManagerQuestionsComponent } from './manager-questions/manager-questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormQuestionComponent } from './manager-questions/form-question/form-question.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { FormTopicsComponent } from './manager-questions/form-topics/form-topics.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule, FormsModule,
    AdminRoutingModule,
  ],
  declarations: [
    ManagerQuestionsComponent,
    ManagerClientsComponent,
    AdminBoxComponent,
    FormQuestionComponent,
    FormTopicsComponent
  ],
})
export class AdminModule {}

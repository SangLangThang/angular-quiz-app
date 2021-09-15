import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { AdminBoxComponent } from './admin-box.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagerClientsComponent } from './manager-clients/manager-clients.component';
import { ReportBoxGridComponent } from './manager-clients/report-box-grid/report-box-grid.component';
import { FormQuestionComponent } from './manager-questions/form-question/form-question.component';
import { FormTopicsComponent } from './manager-questions/form-topics/form-topics.component';
import { ManagerQuestionsComponent } from './manager-questions/manager-questions.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
  ],
  declarations: [
    ManagerQuestionsComponent,
    ManagerClientsComponent,
    AdminBoxComponent,
    FormQuestionComponent,
    FormTopicsComponent,
    ReportBoxGridComponent,
  ],
})
export class AdminModule {}

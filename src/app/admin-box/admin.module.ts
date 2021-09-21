import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { UploadFileComponent } from './manager-questions/upload-file/upload-file.component';
import { AdminBoxComponent } from './admin-box.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagerClientsComponent } from './manager-clients/manager-clients.component';
import { FormQuestionComponent } from './manager-questions/form-question/form-question.component';
import { ManagerQuestionsComponent } from './manager-questions/manager-questions.component';
import { SettingComponent } from './setting/setting.component';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { NgxMatDatetimePickerModule,NgxMatNativeDateModule,NgxMatTimepickerModule,} from '@angular-material-components/datetime-picker';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  declarations: [
    ManagerQuestionsComponent,
    ManagerClientsComponent,
    AdminBoxComponent,
    FormQuestionComponent,
    UploadFileComponent,
    SettingComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB',},
  ],
})
export class AdminModule {}


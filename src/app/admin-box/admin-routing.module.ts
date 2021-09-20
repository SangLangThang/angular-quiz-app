import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoxComponent } from './admin-box.component';
import { ManagerClientsComponent } from './manager-clients/manager-clients.component';
import { FormQuestionComponent } from './manager-questions/form-question/form-question.component';
import { ManagerQuestionsComponent } from './manager-questions/manager-questions.component';
import { SettingComponent } from './setting/setting.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminBoxComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questions',
      },
      {
        path: 'questions/new/:topicId',
        component: FormQuestionComponent,
      },
      { path: 'questions/edit/:questionID', component: FormQuestionComponent },
      { path: 'clients', component: ManagerClientsComponent },
      { path: 'questions', component: ManagerQuestionsComponent },
      { path: 'settings', component: SettingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBoxComponent } from './login-box/login-box.component';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import { StartBoxComponent } from './start-box/start-box.component';

const routes: Routes = [
  { path: '', component: StartBoxComponent },
  { path: 'login', component: LoginBoxComponent },
  { path: 'start/:client/:level/:topic', component: QuizBoxComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin-box/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

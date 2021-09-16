import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'login', component: LoginBoxComponent },
  { path: 'play', canActivate:[AuthGuardService], component: QuizBoxComponent },
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

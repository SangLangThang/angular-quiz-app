import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoxComponent } from './game-box/game-box.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'play',canActivate:[AuthGuardService], component: GameBoxComponent },
/*   { path: 'play', canActivate:[AuthGuardService], component: GameBoxComponent },
 */  {
    path: 'admin',canActivate:[AuthGuardService],
    loadChildren: () => import('./admin-box/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

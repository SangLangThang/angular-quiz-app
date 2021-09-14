import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportBoxGridComponent } from './report-box/report-box-grid/report-box-grid.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { StartBoxComponent } from './start-box/start-box.component';
import { DialogComponent } from './dialog/dialog.component';

import { MaterialModule } from './material-module';
import { AdminModule } from './admin-box/admin.module';
import { InfoBoxComponent } from './quiz-box/info-box/info-box.component';
import { GameBoxComponent } from './quiz-box/game-box/game-box.component';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    StartBoxComponent,
    LoginBoxComponent,
    ReportBoxGridComponent,
    DialogComponent,
    InfoBoxComponent,
    GameBoxComponent,
    QuizBoxComponent,
    SnackBarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MaterialModule,
    AdminModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

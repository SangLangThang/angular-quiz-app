import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AdminModule } from './admin-box/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { MaterialModule } from './material-module';
import { GameBoxComponent } from './game-box/game-box.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RulesModalComponent } from './landing-page/rules-modal/rules-modal.component';
import { FormClientModalComponent } from './landing-page/form-client-modal/form-client-modal.component';
import { LoginModalComponent } from './landing-page/login-modal/login-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponent,

    DialogComponent,
    GameBoxComponent,
    SnackBarComponent,
    LandingPageComponent,
    RulesModalComponent,
    FormClientModalComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

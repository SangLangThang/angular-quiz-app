import { FirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionService } from './../shared/session.service';
import { FormClientModalComponent } from './form-client-modal/form-client-modal.component';
import { RulesModalComponent } from './rules-modal/rules-modal.component';
import { SettingsForm } from '../models/User.model';
import { CountdownConfig } from 'ngx-countdown';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private session$: SessionService,
    private firebase$: FirebaseService
  ) {}
  config: SettingsForm;

  time_left:number=0
  ngOnInit(): void {
    this.session$.clearSesstion();
    this.firebase$.getConfig().subscribe((config: any) => {
      this.config = {
        ...config[0],
        event_start: config[0].event_start.toDate(),
        event_end: config[0].event_end.toDate(),
      };
      this.time_left=this.getDifferenceInDays(new Date(),config[0].event_end.toDate())
    });
  }
  getDifferenceInDays(date1: any, date2: any) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
  }
  openRules() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-login';
    dialogConfig.maxWidth = '100vw';
    this.dialog.open(RulesModalComponent, dialogConfig);
  }
  openFormClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-login';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.height = '60vh';
    this.dialog.open(FormClientModalComponent, dialogConfig);
  }

  getDateTime() {
    return new Date();
  }
}

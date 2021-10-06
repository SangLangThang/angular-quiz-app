import { FirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionService } from './../shared/session.service';
import { FormClientModalComponent } from './form-client-modal/form-client-modal.component';
import { RulesModalComponent } from './rules-modal/rules-modal.component';
import { SettingsForm } from '../models/User.model';
import { CountdownConfig } from 'ngx-countdown';
import { DialogComponent } from '../dialog/dialog.component';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

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
  canTest = false;
  time_left: number = 0;
  ngOnInit(): void {
    this.session$.clearSesstion();
    this.firebase$.getConfig().subscribe((config: any) => {
      this.config = {
        ...config[0],
        event_start: config[0].event_start.toDate(),
        event_end: config[0].event_end.toDate(),
      };
      this.time_left = this.getDifferenceInDays(
        new Date(),
        config[0].event_end.toDate()
      );
      this.countdownConfig = this.setCountdownConfig(this.time_left);
      this.checkCanTest(
        new Date(),
        config[0].event_start.toDate(),
        config[0].event_end.toDate()
      );
    });
  }
  getDifferenceInDays(date1: any, date2: any) {
    const diffTime = date2.getTime() - date1.getTime();
    return diffTime / 1000;
  }
  openRules() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-login';
    dialogConfig.maxWidth = '100vw';
    this.dialog.open(RulesModalComponent, dialogConfig);
  }
  openFormClient() {
    if (this.canTest) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'dialog-login';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.height = '60vh';
      this.dialog.open(FormClientModalComponent, dialogConfig);
    } else {
      this.openAlert();
    }
  }
  checkCanTest(currentDate: any, dateStart: any, dateEnd: any) {
    if (
      currentDate.getTime() < dateStart.getTime() ||
      currentDate.getTime() > dateEnd.getTime()
    ) {
      this.canTest = false;
    } else {
      this.canTest = true;
    }
  }
  countdownConfig: CountdownConfig = this.setCountdownConfig(0);
  setCountdownConfig(time: number = 0) {
    const countdownConfig: CountdownConfig = {
      leftTime: time,
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);
        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(
              new RegExp(`${name}+`, 'g'),
              (match: string) => {
                return v.toString().padStart(match.length, '0');
              }
            );
          }
          return current;
        }, formatStr);
      },
    };
    return countdownConfig;
  }
  setFormatCountdownConfig(countdownConfig: CountdownConfig, format: string) {
    countdownConfig.format = format;
    return countdownConfig;
  }
  openAlert() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-login';
    dialogConfig.maxWidth = '100vw';
    this.dialog.open(DialogComponent, dialogConfig);
  }
}

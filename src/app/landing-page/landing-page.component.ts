import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionService } from './../shared/session.service';
import { FormClientModalComponent } from './form-client-modal/form-client-modal.component';
import { RulesModalComponent } from './rules-modal/rules-modal.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog, private session$:SessionService) { }

  ngOnInit(): void {
    this.session$.clearSesstion()
  }

  openRules(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass="dialog-login"
    dialogConfig.maxWidth='100vw'
    this.dialog.open(RulesModalComponent,dialogConfig)
  }
  openFormClient(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass="dialog-login"
    dialogConfig.maxWidth='100vw'
    dialogConfig.height='60vh';
    this.dialog.open(FormClientModalComponent,dialogConfig)
  }

  getDateTime() {
    return new Date();
  }
}

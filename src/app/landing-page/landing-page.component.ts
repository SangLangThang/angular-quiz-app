import { SessionService } from './../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RulesModalComponent } from './rules-modal/rules-modal.component';
import { FormClientModalComponent } from './form-client-modal/form-client-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
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
  
}

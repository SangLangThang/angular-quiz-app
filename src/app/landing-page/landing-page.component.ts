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
    this.dialog.open(RulesModalComponent)
  }
  openFormClient(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='100%';
    dialogConfig.height='80vh';
    this.dialog.open(FormClientModalComponent,dialogConfig)
  }
  
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RulesModalComponent } from './rules-modal/rules-modal.component';
import { FormClientModalComponent } from './form-client-modal/form-client-modal.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openRules(){
    this.dialog.open(RulesModalComponent)
  }
  openFormClient(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='100%';
    this.dialog.open(FormClientModalComponent,dialogConfig)
  }
}

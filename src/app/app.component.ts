import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginModalComponent } from './landing-page/login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( public dialog: MatDialog){

  }
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='50%';
    this.dialog.open(LoginModalComponent,dialogConfig)
  }
}

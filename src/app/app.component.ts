import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginModalComponent } from './landing-page/login-modal/login-modal.component';
import { IS_LOGGED } from './shared/consts';
import { deleteCookie, getCookie } from './shared/cookie';
import { FirebaseService } from './shared/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
  ){

  }

  ngOnInit(): void {
    if(getCookie(IS_LOGGED))
      this.isLogged = true;
  }

  ngOnDestroy(): void {
    deleteCookie(IS_LOGGED)
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass="dialog-login"
    dialogConfig.maxWidth='100vw'
    let dialogRef = this.dialog.open(LoginModalComponent,dialogConfig)
    dialogRef.afterClosed()
      .subscribe(_ => {
        this.isLogged = this.firebaseService.isLogin
      })
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) {}

  /* openDialog(text: string) {
    const dialogRef = this.dialog.open(DialogComponent, { data: text });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    });
  } */

  defaultConfigMatSnack: MatSnackBarConfig = {
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
    duration: 1000,
  };
  openSnackBar(message:string,style:string) {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data:message,
      ...this.defaultConfigMatSnack,
      panelClass: style,
    });
  }
}

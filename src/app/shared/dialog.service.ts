import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) {}

  openDialog(text: string) {
    const dialogRef = this.dialog.open(DialogComponent, { data: text });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
    });
  }
  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 2000,
    });
  }
}

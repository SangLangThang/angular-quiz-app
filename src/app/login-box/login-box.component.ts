import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../models/User.model';
import { FirebaseService } from '../shared/firebase.service';
@Component({
  selector: 'app-report-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
})
export class LoginBoxComponent implements OnInit {
  dataSource: User[] = [];
  isLogged: boolean = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(post: any) {
    this.firebaseService.login(post).subscribe((response: any) => {
      if (response && response.length > 0) {
        /* this.getUsers();
        this.isLogged = true; */
        console.log("Check user")
        this.router.navigate(['/admin']);
      } else {
        this.dialog.open(DialogComponent,{data :'Sai tài khoản hoặc mật khẩu'});
      }
    });
  }

  getUsers() {
    this.firebaseService
      .getUsers()
      .subscribe((users: User[]) => (this.dataSource = users));
  }

  reportPDF() {}

  printPDF() {}
}

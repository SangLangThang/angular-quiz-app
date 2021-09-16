import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebase$: FirebaseService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  isLoging = false;
  hasError=false
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
    this.isLoging = true;
    this.firebase$.login(post).subscribe((response: any) => {
      this.isLoging = false;
      if (response && response.length > 0) {
        this.firebase$.isLogin = true;
        this.dialog.closeAll();
        this.router.navigate(['/admin']);
      }else{
        this.hasError=true
      }
    });
  }
}

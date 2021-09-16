import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  constructor(private firebase$:FirebaseService) {}

  ngOnInit(): void {}
  public imagePath: string;
  imgURL: any;
  public message: string;

  preview(e: any) {
    /* this.firebase$.uploadFile(e.target.files[0])  */
    let files=e.target.files
    if (files.length === 0) return;
    let reader = new FileReader();
    this.imagePath = files;
    
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'app-admin-box',
  templateUrl: './admin-box.component.html',
  styleUrls: ['./admin-box.component.scss'],
})
export class AdminBoxComponent implements OnInit {
  constructor( private session$: SessionService,) {}
  ngOnInit(): void {
    this.session$.setLevel('');
    this.session$.setStartEditQuestion('no')
   
  }
  title="quản lý câu hỏi"

}

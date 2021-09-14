import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-report-box-grid',
  templateUrl: './report-box-grid.component.html',
  styleUrls: ['./report-box-grid.component.scss']
})
export class ReportBoxGridComponent implements OnInit {
  displayedColumns: string[] = ['ten', 'truong', 'lop', 'diem', 'time'];

  @Input() dataSource: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

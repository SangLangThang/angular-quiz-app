import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showStartBox=true
  showReportBox=false;
  toggleShow(){
    this.showReportBox=!this.showReportBox;
    this.showStartBox=!this.showStartBox;
  }
}

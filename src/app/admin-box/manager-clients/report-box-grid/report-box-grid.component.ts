import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ClientForm, Levels, Topics } from 'src/app/models/User.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report-box-grid',
  templateUrl: './report-box-grid.component.html',
  styleUrls: ['./report-box-grid.component.scss'],
})
export class ReportBoxGridComponent implements OnInit {
  @ViewChild('pdfTable') pdftable: ElementRef;
  @Input() clients: ClientForm[] = [];
  @Input() levels: string[] = [];
  @Input() topics: string[] = [];
  school:string[]=[];
  time:string;
  selectedLevel='Tất cả'
  selectedTopic='Tất cả'
  constructor() {}
  
  ngOnInit(): void {
    this.school=this.deduplicate(this.clients.map(e=>e.school))
  }
  printPdf() {
    let data = this.pdftable.nativeElement;
    console.log(data);
    let pdf = new jsPDF('p', 'mm', 'a4');
    /*     html2pdf(report_table,{margin:5,filename: 'Report.pdf',});
     */ html2canvas(data).then((canvas) => {
      let imgWidth = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL();
      let position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('ReportPdf.pdf');
    });
  }
  onChangeName(){
    
  }
  deduplicate(arr:string[]) {
    let set = new Set(arr);
    return [...set];
  }
}

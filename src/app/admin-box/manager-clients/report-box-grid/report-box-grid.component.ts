// import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { ClientForm } from 'src/app/models/User.model';

// @Component({
//   selector: 'app-report-box-grid',
//   templateUrl: './report-box-grid.component.html',
//   styleUrls: ['./report-box-grid.component.scss'],
// })
// export class ReportBoxGridComponent implements OnInit {
//   @ViewChild('pdfTable') pdftable: ElementRef;
//   @Input() clients: ClientForm[] = [];
//   @Input() levels: string[] = [];
//   @Input() topics: string[] = [];
//   school:string[]=[];
//   time:string;
//   selectedLevel='all'
//   selectedTopic='all'
//   clientsCache: ClientForm[] = [];

//   constructor(private firebase$: FirebaseService) {}

//   ngOnInit(): void {
//     this.school = this.deduplicate(this.clients.map(e=>e.school))
//   }
//   ngOnChanges(changes: SimpleChanges): void {
//     this.clientsCache = [...this.clients];
//   }

//   printPdf() {
//     let data = this.pdftable.nativeElement;
//     let pdf = new jsPDF('p', 'mm', 'a4');
//     /*     html2pdf(report_table,{margin:5,filename: 'Report.pdf',});
//      */ html2canvas(data).then((canvas) => {
//       let imgWidth = 208;
//       let imgHeight = (canvas.height * imgWidth) / canvas.width;
//       const contentDataURL = canvas.toDataURL();
//       let position = 0;

//       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
//       pdf.save('ReportPdf.pdf');
//     });
//   }

//   filterLevel(){
//     if(this.selectedLevel === 'all' && this.selectedTopic === 'all') {
//       this.clients = [...this.clientsCache];
//       return;
//     }
//     if(this.selectedLevel === 'all') {
//       this.clients = this.clientsCache.filter((x: any) => x.topicId===this.selectedTopic);
//       return;
//     }
//     if(this.selectedTopic !== 'all') {
//       this.clients = this.clientsCache.filter((x: any) => x.levelId===this.selectedLevel && x.topicId===this.selectedTopic);
//       return;
//     }
//     this.clients = this.clientsCache.filter((x: any) => x.levelId===this.selectedLevel);
//   }

//   filterTopic(){
//     if(this.selectedLevel === 'all' && this.selectedTopic === 'all') {
//       this.clients = [...this.clientsCache];
//       return;
//     }
//     if(this.selectedTopic === 'all') {
//       this.clients = this.clientsCache.filter((x: any) => x.levelId===this.selectedLevel);
//       return;
//     }
//     if(this.selectedLevel !== 'all') {
//       this.clients = this.clientsCache.filter((x: any) => x.topicId===this.selectedTopic && x.levelId===this.selectedLevel);
//       return;
//     }
//     this.clients = this.clientsCache.filter((x: any) => x.topicId===this.selectedTopic);
//   }

//   deduplicate(arr:string[]) {
//     let set = new Set(arr);
//     return [...set];
//   }

//   deleteClient(id: any) {
//     console.log('debugger: ', id)
//     this.firebase$.deleteClient(id).subscribe((clients: any) => {
//       this.clients=clients
//     });
//   }
// }

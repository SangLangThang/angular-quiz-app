import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { ClientForm } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-manager-clients',
  templateUrl: './manager-clients.component.html',
  styleUrls: ['./manager-clients.component.scss'],
})
export class ManagerClientsComponent implements OnInit {
  clients: ClientForm[] = [];
  levels: any[];
  topics: any[];
  selectedLevel = 'all';
  selectedTopic = 'all';
  clientsCache: ClientForm[] = [];

  @ViewChild('pdfTable') pdftable: ElementRef;

  constructor(private firebase$: FirebaseService) {}

  ngOnInit(): void {
    this.getClients();
    this.getLevels();
    this.getTopics();
  }

  getLevels() {
    this.firebase$.getLevels().subscribe((levels: any[]) => {
      this.levels = levels.reverse().map((e: any) => e.name);
    });
  }

  getTopics() {
    this.firebase$.getTopics().subscribe((topics: any[]) => {
      this.topics = this.deduplicate(topics.map((e: any) => e.name));
    });
  }

  deduplicate(arr: string[]) {
    let set = new Set(arr);
    return [...set];
  }

  getClients() {
    this.firebase$.getClients()
      .subscribe((clients: any) => {
        this.clients = clients;
        this.clientsCache=  clients
      });
  }

  filterAll(){
    this.clients=this.clientsCache.filter(e=>{
      let filterByLevel=e.levelId===this.selectedLevel || this.selectedLevel==='all' //true or false
      let filterByTopic=e.topicId===this.selectedTopic || this.selectedTopic==='all'
      return filterByLevel && filterByTopic
    })
  }

  deleteClients() {
    this.clients.map((x: any) => {
      this.deleteClient(x.id);
    });
  }

  deleteClient(id: string) {
    this.firebase$.deleteClient(id).then((_) => this.getClients());
  }

  printPdf() {
    let data = this.pdftable.nativeElement;
    let pdf = new jsPDF('p', 'mm', 'a4');
    html2canvas(data).then((canvas) => {
      let imgWidth = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL();
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('ReportPdf.pdf');
    });
  }

  printExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.pdftable.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}

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
  constructor(private firebase$: FirebaseService) {}
  clients: ClientForm[] = [];
  levels: string[];
  topics: string[];
  school: string[] = [];
  time: string;
  selectedLevel = 'all';
  selectedTopic = 'all';
  clientsCache: ClientForm[] = [];

  @ViewChild('pdfTable') pdftable: ElementRef;

  ngOnInit(): void {
    this.getClients();
    this.getLevels();
    this.getTopics();
  }

  getClients() {
    this.firebase$.getClients().subscribe((clients: any) => {
      this.clients = clients;
      this.school = this.deduplicate(this.clients.map((e) => e.school));
    });
  }

  getLevels() {
    this.firebase$.getLevels().subscribe((levels: any) => {
      this.levels = this.deduplicate(levels.map((e: any) => e.name));
    });
  }

  getTopics() {
    this.firebase$.getTopics().subscribe((topics: any) => {
      this.topics = this.deduplicate(topics.map((e: any) => e.name));
    });
  }

  filterLevel() {
    if (this.selectedLevel === 'all' && this.selectedTopic === 'all') {
      this.clients = [...this.clientsCache];
      return;
    }
    if (this.selectedLevel === 'all') {
      this.clients = this.clientsCache.filter(
        (x: any) => x.topicId === this.selectedTopic
      );
      return;
    }
    if (this.selectedTopic !== 'all') {
      this.clients = this.clientsCache.filter(
        (x: any) =>
          x.levelId === this.selectedLevel && x.topicId === this.selectedTopic
      );
      return;
    }
    this.clients = this.clientsCache.filter(
      (x: any) => x.levelId === this.selectedLevel
    );
  }

  filterTopic() {
    if (this.selectedLevel === 'all' && this.selectedTopic === 'all') {
      this.clients = [...this.clientsCache];
      return;
    }
    if (this.selectedTopic === 'all') {
      this.clients = this.clientsCache.filter(
        (x: any) => x.levelId === this.selectedLevel
      );
      return;
    }
    if (this.selectedLevel !== 'all') {
      this.clients = this.clientsCache.filter(
        (x: any) =>
          x.topicId === this.selectedTopic && x.levelId === this.selectedLevel
      );
      return;
    }
    this.clients = this.clientsCache.filter(
      (x: any) => x.topicId === this.selectedTopic
    );
  }

  deleteClients() {
    this.clients.map((x: any) => {
      this.deleteClient(x.id)
    })
  }

  deleteClient(id: string) {
    this.firebase$.deleteClient(id).then((_) => this.getClients());
  }

  deduplicate(arr: string[]) {
    let set = new Set(arr);
    return [...set];
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

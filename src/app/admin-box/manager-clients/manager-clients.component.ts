import { FirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ClientForm, Levels, Topics } from 'src/app/models/User.model';

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
  ngOnInit(): void {
    this.firebase$.getClients().subscribe((clients: any) => {
      this.clients=clients
    });
    this.firebase$.getLevels().subscribe((levels:any)=>{
      this.levels=this.deduplicate(levels.map((e:any)=>e.name))
    })
    this.firebase$.getTopics().subscribe((topics:any)=>{
      this.topics=this.deduplicate(topics.map((e:any)=>e.name))
    })
  }
  deduplicate(arr:string[]) {
    let set = new Set(arr);
    return [...set];
  }
}

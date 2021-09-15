import { FirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ClientForm } from 'src/app/models/User.model';

@Component({
  selector: 'app-manager-clients',
  templateUrl: './manager-clients.component.html',
  styleUrls: ['./manager-clients.component.scss'],
})
export class ManagerClientsComponent implements OnInit {
  constructor(private firebase$: FirebaseService) {}
  clients: ClientForm[] = [];
  ngOnInit(): void {
    this.firebase$.getClients().subscribe((clients: any) => {
      this.clients=clients
      console.log(clients)
    });
  }
}

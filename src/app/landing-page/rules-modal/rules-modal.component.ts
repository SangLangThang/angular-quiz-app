import { SettingsForm } from './../../models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules-modal.component.html',
  styleUrls: ['./rules-modal.component.scss']
})
export class RulesModalComponent implements OnInit {

  constructor(private firebase$:FirebaseService) { }
  time:number
  ngOnInit(): void {
    this.firebase$.getConfig().subscribe((config:any)=>{
      this.time=config[0].time_total
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsForm } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingsForm: FormGroup;
  config: SettingsForm;

  constructor(private fb: FormBuilder, private firebase$: FirebaseService) {}
  ngOnInit(): void {
    this.firebase$.getConfig().subscribe((config: any) => {
      this.config = {
        ...config[0],
        event_start: config[0].event_start.toDate(),
        event_end: config[0].event_end.toDate()
      };


      this.buildForm();
    });
  }
  buildForm() {
    this.settingsForm = this.fb.group({
      event_start: [this.config?.event_start ?? null, Validators.required],
      event_end: [this.config?.event_end ?? null, Validators.required],
      time_total: [this.config?.time_total ?? null, Validators.required],
      time_alert: [this.config?.time_alert ?? null, Validators.required],
    });
  }
  onSubmit(valueForm: any) {
    this.firebase$.editConfig(valueForm);
  }
}

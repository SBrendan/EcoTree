import { Component, Input } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private appService: AppService) { }

  title = 'EcoTree';
  robotRunning = false;
  lastBattery = null;

  @Input() newMap: string = '';
  @Input() files: string[] = [];

  form = new FormGroup({
    files: new FormControl('', [Validators.required])
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.lastBattery = setInterval(() => {
      if (this.robotRunning) {
        this.appService.getLastBattery().then(res => { this.lastBattery = res.result })
      }
    }, 180000);
  }

  onFileChange(event) {
    this.files = []; // reset array
    if (event.target.files.length === 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    } else {
      this.f.files.setErrors({ length: true });
    }
  }

  // Upload files to back service
  launchMrRobot() {
    this.robotRunning = true;
    this.appService.uploadFiles(this.files);
  }
}

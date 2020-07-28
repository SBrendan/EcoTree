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

  @Input() newMap: string = '';
  @Input() files: string[] = [];

  form = new FormGroup({
    files: new FormControl('', [Validators.required])
  });

  get f() {
    return this.form.controls;
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  // Upload files to back service
  launchMrRobot() {
    this.appService.uploadFiles(this.files);
  }
}

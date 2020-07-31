import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://localhost:3000/';

  uploadFiles(files: string[]) {

    let formData = new FormData();
    formData.append("files", files[0]);
    formData.append("files", files[1]);

    this.http.post(this.url + "upload", formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  getLastBattery(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "consummed-battery").subscribe(res => { resolve(res) })
    });
  }
}

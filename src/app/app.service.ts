import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private url: string = 'http://localhost:3000/upload';

  uploadFiles(files: string[]) {

    let formData = new FormData();
    formData.append("files", files[0]);
    formData.append("files", files[1]);

    this.http.post(this.url, formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}

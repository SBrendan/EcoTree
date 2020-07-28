import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

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

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    this.http.post(this.url, formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}

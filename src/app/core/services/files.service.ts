import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { RequestOptions } from '../http/http.types';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private rest: ApiService, private http: HttpClient) { }

  postFile(fileUpload: File) {
    const options: RequestOptions = {};
    const formData: FormData = new FormData();
    formData.append('Image', fileUpload, fileUpload.name);
    options.body = formData;
    return this.rest.post('/UploadFile', options);
  }

  getDataFiles() {
    const options: RequestOptions = {};
    return this.rest.get('/GetDataFile', options);
  }
}

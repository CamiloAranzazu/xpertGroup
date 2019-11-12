import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilesService } from 'src/app/core/services/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  myForm: FormGroup;
  fileUpload: File = null;
  constructor(  private fb: FormBuilder,
                private fileService: FilesService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required]
      ],
    });
  }

  ImageAdd() {
    if (this.fileUpload !== null) {
      this.fileService.postFile(this.fileUpload).then(data => {
        console.log(data);
      });
    } else {
      console.log('not data.-.-');
    }
  }

  fileInput(file: FileList) {
    this.fileUpload = file.item(0);
  }

  GetDataFiles() {
    this.fileService.getDataFiles().then(data => {
      console.log('GETdata', data);
    });
  }

}

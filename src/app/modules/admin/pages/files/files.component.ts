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
  respuesta: any;
  fileUpload: File = null;
  contenido: boolean = false;
  registrados: boolean = false;
  nameFile: string = 'Sin Archivo';
  save: boolean = false;
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
        this.save = true;
      });
    } else {
      this.nameFile = "SIN ARCHIVO"
    }
  }

  fileInput(file: FileList) {
    this.nameFile = file[0].name;
    this.fileUpload = file.item(0);
  }

  GetDataFiles() {
    this.fileService.getDataFiles().then(rest => {
      if(rest[0] == 0) {
       this.contenido = true;
       this.registrados = false;
       this.save = false;
      } else if(rest[0] == 1) {
        this.registrados = true;
        this.contenido = false;
        this.save = false;
      } else {
          this.respuesta = this.fileService.DataResponse(rest[0], rest[1]);
          this.contenido = false;
          this.registrados = false;
      }
    });
  }

  SaveResult() {
    if(this.respuesta) {
      this.fileService.postResult(this.respuesta);
    }
  }

}

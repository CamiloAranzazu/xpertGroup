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
  respuesta: any = [];
  calificacion: any;
  estrellas: any;
  tiempo: any;
  fileUpload: File = null;
  conversacion: boolean = false;
  existFile: boolean = false;
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

  AddFile() {
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
      if(rest[0] === 1) {
        this.existFile = true;
        this.save = false;
      
      } else if(rest[0].length === 1) {
        this.conversacion = true;
      } else {
          this.respuesta = this.fileService.DataResponse(rest[0]);
          this.calificacion = this.fileService.calificacionDelServicio(rest[0]);
          this.estrellas = this.fileService.conteoEstrellas(this.calificacion);
          this.tiempo = this.fileService.getTime(rest[0]);
          this.conversacion = false;
      }
    });
  }


}

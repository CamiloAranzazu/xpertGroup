import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { RequestOptions } from '../http/http.types';
import { HttpClient } from '@angular/common/http';
import { ContenidoLetra } from '../class/ContenidoLetra';
import { Estado } from '../class/Estado';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private rest: ApiService,
              private http: HttpClient,
              ) { }

  postFile(fileUpload: File) {
    let options: RequestOptions = {};
    let formData: FormData = new FormData();
    formData.append('Image', fileUpload, fileUpload.name);
    options.body = formData;
    return this.rest.post('/UploadFile', options);
  }

  postResult(resultados: any) {
    let options: RequestOptions = {};
    options.body = resultados;
    return this.rest.post('/UploadResult', options);
  }

  getDataFiles() {
    let options: RequestOptions = {};
    return this.rest.get('/GetDataFile', options);
  }

  DataResponse(contenido: any, registrados: any) {
    let letras: ContenidoLetra[] = [];
    let resultados: any[] = [];
    contenido.forEach(item => {
      let va = new ContenidoLetra();
      va.letra = item;
      letras.push(va);
    });
    
    for (let palabras = 0; palabras < registrados.length; palabras++) {
      // console.log('registrados[palabras]', registrados[palabras]);
    
      let word: string = registrados[palabras];
      let letters: any[] = word.split('');

      let existeLaPalabra: boolean = true;
    
      for (let i = 0; i < letters.length; i++) {
        let letter: any = letters[i];
        let encontrado: boolean = false;
        for (let j = 0; j < letras.length; j++)
        {
          if (this.existeLaLetra(letter, letras[j].getLetra()) && letras[j].getEstaUsada() === Estado.NO_USADO) {
            letras[j].setEstaUsada(Estado.USADO);
            encontrado = true;
            break;
          }

        }

        if (!encontrado) {
          //console.log("No existe la letra:", letter);
          existeLaPalabra = false;
          break;
        } else {
          //console.log("Si existe la letra:",letter);
        }
      }
      if (existeLaPalabra) {
        resultados.push(word + " Si existe");
        // console.log(word," Si existe");
      } else {
        resultados.push(word + " No existe");
        // console.log(word, " No existe");
      }
    }

    // console.log('resultados', resultados);
    return resultados;

  }

  existeLaLetra(letter: any, letterDelArray: any): boolean {
    return letter == letterDelArray;
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { RequestOptions } from '../http/http.types';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  tiempoService: any = '';

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

  getDataFiles() {
    let options: RequestOptions = {};
    return this.rest.get('/GetDataFile', options);
  }

  DataResponse(conversacion: any) {
    let resultados: any[] = [];
    conversacion.forEach(item => {
      resultados.push(item);
    });
    // console.log('resultados', resultados);
    return resultados;

  }

  getTime(conversacion: any) {
    let primerChat = conversacion[0];
    let ultimoChat = conversacion.pop();
    let start = primerChat.substring(0,8);
    let end = ultimoChat.substring(0,8);
    let b = moment('2001-01-01T'+start);//now
    let a = moment('2001-01-01T'+end);
    return  " HORAS: " +a.diff(b, 'hours') + " MINUTOS: " +a.diff(b, 'minutes') + " SEG: " +a.diff(b, 'seconds');
  }

  calificacionDelServicio(conversacion: any) {
    let es: number = -1;
    let calificacion: number = 0;
    conversacion.forEach(item => { 
    let es = item.indexOf("EXCELENTE SERVICIO");
      if (es !== -1){
        return calificacion += 100; 
     }
    });
    if (calificacion !== 100){
      calificacion += this.primeraRegla(conversacion);
      calificacion += this.segundaRegla(conversacion);
      calificacion += this.terceraRegla(conversacion);
      calificacion += this.cuartaRegla(conversacion);
    }
    console.log(calificacion);
    return calificacion;
  }

  //   Obtener el número de mensajes enviados en la conversación, se identifican por un salto de
  // línea [enter], los puntos se redistribuyen de la siguiente manera:
  primeraRegla(conversacion: any){
   let resultado: number = 0;
   if (conversacion.length > 5) {
      resultado += 10; 
   } else if(conversacion.length <= 5) {
      resultado += 20; 
   }
   return resultado;
  }

  // Número de coincidencias de la palabra URGENTE por registro:
  segundaRegla(conversacion: any) {
    let resultado: number = 0;
    let countUrgente: number = 0;
    let palabraUrgente = "URGENTE";

    conversacion.forEach(item => {
      let palabras = item.replace(".", "").split(" ");
      palabras.forEach(pal => {
        if(pal.replace(",", "").toLowerCase() === palabraUrgente.toLowerCase()){
          countUrgente += 1;
        }
      });
    });
    if(countUrgente > 2) {
      resultado = -10;
    } else if(countUrgente <= 2) {
      resultado = -5;
    }
    return resultado;
  }

  // Lista de palabras que exclaman el buen servicio en la conversación:
  terceraRegla(conversacion: any) {
    let resultado: number = 0;
    conversacion.forEach(item => { 
      let g = item.indexOf("Gracias");
      if (g !== -1){
         resultado += 10; 
      }
    });
    conversacion.forEach(item => { 
      let ba = item.indexOf("Buena Atención");
      if (ba !== -1){
        resultado += 10; 
     }
    });
    conversacion.forEach(item => { 
      let mg = item.indexOf("Muchas Gracias");
      if (mg !== -1){
        resultado += 10; 
     }
    });
    return resultado;
  }

  // Cuánto tiempo duró la conversación expresada en minutos y segundos:
  cuartaRegla(conversacion: any) {
    let resultado: number = 0;

    let primerChat = conversacion[0];
    let ultimoChat = conversacion.pop();

    let start = primerChat.substring(0,8);
    let end = ultimoChat.substring(0,8);

    let b = moment('2001-01-01T'+start);//now
    let a = moment('2001-01-01T'+end);

    this.tiempoService = " HORAS: " +a.diff(b, 'hours') + " MINUTOS: " +a.diff(b, 'minutes') + " SEG: " +a.diff(b, 'seconds')
    if((a.diff(b, 'minutes')) >= 1) {
      resultado += 25;
    } else {
      resultado += 50;
    }
    return resultado;
  }

  conteoEstrellas(calificaion: any) {
    if (calificaion < 0) {
      return "Sin Estrellas"
    } else if (calificaion < 25) {
      return " * "
    } else if (calificaion >= 25 && calificaion < 50) {
      return " ** "
    } else if (calificaion >= 50 && calificaion < 75) {
      return " *** "
    } else if (calificaion >= 75 && calificaion < 90) {
      return " **** "
    } else if (calificaion >= 90) {
      return " ***** "
    } else {
      return "Sin Estrellas"
    }
  }

}

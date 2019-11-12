import {Estado}  from './Estado';

export class ContenidoLetra {
  public letra: any;
  public estaUsada: Estado;

  constructor() {
    this.estaUsada = Estado.NO_USADO;
  }

  public getLetra() {
    return this.letra;
  }

  public getEstaUsada(): Estado  {
    return this.estaUsada;
  }

  public setEstaUsada(estaUsada: Estado) {
    this.estaUsada = estaUsada;
  }
  
}

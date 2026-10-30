import { Injectable } from '@angular/core';
import { Ocorrencia } from '../models/ocorrencia';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private chave = 'mobiliza_ocorrencias';

  listar(): Ocorrencia[] {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : [];
  }

  adicionar(ocorrencia: Ocorrencia): void {
    const ocorrencias = this.listar();
    ocorrencias.push(ocorrencia);

    localStorage.setItem(
      this.chave,
      JSON.stringify(ocorrencias)
    );
  }

  remover(id: number): void {
    const ocorrencias = this.listar()
      .filter(ocorrencia => ocorrencia.id !== id);

    localStorage.setItem(
      this.chave,
      JSON.stringify(ocorrencias)
    );
  }
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrenciaService } from '../../services/ocorrencia.service';
import { Ocorrencia } from '../../models/ocorrencia';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ocorrencias',
imports: [CommonModule, RouterLink],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css'
})
export class Ocorrencias implements OnInit {

  ocorrencias: Ocorrencia[] = [];

  constructor(private ocorrenciaService: OcorrenciaService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.ocorrencias = this.ocorrenciaService.listar();
  }

  remover(id: number): void {
    this.ocorrenciaService.remover(id);
    this.listar();
  }
}
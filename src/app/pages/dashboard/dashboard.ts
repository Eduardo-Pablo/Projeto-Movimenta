import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrenciaService } from '../../services/ocorrencia.service';
import { Ocorrencia } from '../../models/ocorrencia';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  ocorrencias: Ocorrencia[] = [];

  total = 0;
  alta = 0;
  acessibilidade = 0;

  ngOnInit(): void {
    this.ocorrencias = this.ocorrenciaService.listar();

    this.total = this.ocorrencias.length;

    this.alta = this.ocorrencias.filter(
      o => o.gravidade === 'Alta'
    ).length;

    this.acessibilidade = this.ocorrencias.filter(
      o => o.categoria === 'Falta de acessibilidade'
    ).length;
  }

  constructor(private ocorrenciaService: OcorrenciaService) {}
}
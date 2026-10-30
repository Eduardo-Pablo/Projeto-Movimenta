import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OcorrenciaService } from '../../services/ocorrencia.service';
import { Ocorrencia } from '../../models/ocorrencia';

@Component({
  selector: 'app-cadastrar-ocorrencia',
  imports: [FormsModule],
  templateUrl: './cadastrar-ocorrencia.html',
  styleUrl: './cadastrar-ocorrencia.css'
})
export class CadastrarOcorrencia {

  local = '';
  categoria = '';
  descricao = '';
  gravidade = 'Média';

  foto = '';

selecionarFoto(event: Event): void {
  const arquivo = (event.target as HTMLInputElement).files?.[0];

  if (arquivo) {
    const leitor = new FileReader();

    leitor.onload = () => {
      this.foto = leitor.result as string;
    };

    leitor.readAsDataURL(arquivo);
  }
}

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private router: Router
  ) {}

  salvar(): void {
    const novaOcorrencia: Ocorrencia = {
      
      id: Date.now(),
      local: this.local,
      categoria: this.categoria,
      descricao: this.descricao,
      gravidade: this.gravidade,
      foto: this.foto,
      data: new Date().toISOString()
    };

    this.ocorrenciaService.adicionar(novaOcorrencia);
    this.router.navigate(['/ocorrencias']);
  }
}
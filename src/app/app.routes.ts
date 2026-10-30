
import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Ocorrencias } from './pages/ocorrencias/ocorrencias';
import { CadastrarOcorrencia } from './pages/cadastrar-ocorrencia/cadastrar-ocorrencia';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'ocorrencias', component: Ocorrencias },
  { path: 'cadastrar', component: CadastrarOcorrencia },
  { path: 'dashboard', component: Dashboard },
  { path: '**', redirectTo: '' }
];

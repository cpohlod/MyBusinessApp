import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpreendimentoFormComponent } from './components/empreendimento-form/empreendimento-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'novo', component: EmpreendimentoFormComponent },
  { path: 'editar/:id', component: EmpreendimentoFormComponent },
];

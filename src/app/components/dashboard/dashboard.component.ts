import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmpreendimentoService } from '../../services/empreendimento.service';
import { Empreendimento } from '../../models/empreendimento.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styles: [`
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #f4f4f4; }
    .btn { padding: 8px 16px; margin-right: 8px; cursor: pointer; text-decoration: none; border-radius: 4px; }
    .btn-primary { background-color: #007bff; color: white; border: none; }
    .btn-danger { background-color: #dc3545; color: white; border: none; }
    .btn-success { background-color: #28a745; color: white; border: none; margin-bottom: 20px; display: inline-block; }
    .container { padding: 20px; }
  `]
})
export class DashboardComponent implements OnInit {
  empreendimentos: Empreendimento[] = [];

  constructor(private service: EmpreendimentoService) {}

  ngOnInit(): void {
    this.loadEmpreendimentos();
  }

  loadEmpreendimentos(): void {
    this.service.getEmpreendimentos().subscribe(data => {
      this.empreendimentos = data;
    });
  }

  deleteEmpreendimento(id: number | undefined): void {
    if (id !== undefined && window.confirm('Deseja realmente excluir este empreendimento?')) {
      this.service.deleteEmpreendimento(id).subscribe(() => {
        this.loadEmpreendimentos();
      });
    }
  }
}

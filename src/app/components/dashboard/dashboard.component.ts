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
  styleUrl: './dashboard.component.css'
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

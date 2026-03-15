import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empreendimento } from '../models/empreendimento.model';

@Injectable({
  providedIn: 'root'
})
export class EmpreendimentoService {
  private apiUrl = 'http://localhost:3000/empreendimentos';

  // Dados mockados para fallback em caso de erro
  private mockData: Empreendimento[] = [
    { id: 1, nome_empreendimento: 'Mock: Edifício Aurora', nome_responsavel: 'Carlos Oliveira', email: 'carlos@aurora.com', status: 'Ativo' },
    { id: 2, nome_empreendimento: 'Mock: Solar das Palmeiras', nome_responsavel: 'Ana Costa', email: 'ana@solar.com', status: 'Ativo' }
  ];

  constructor(private http: HttpClient) { }

  getEmpreendimentos(): Observable<Empreendimento[]> {
    return this.http.get<Empreendimento[]>(this.apiUrl).pipe(
      catchError(error => {
        console.warn('Erro ao buscar dados da API. Retornando dados mockados.', error);
        return of(this.mockData);
      })
    );
  }

  getEmpreendimento(id: number): Observable<Empreendimento> {
    return this.http.get<Empreendimento>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.warn(`Erro ao buscar empreendimento ${id}. Retornando do mock.`, error);
        const item = this.mockData.find(m => m.id === id) || this.mockData[0];
        return of(item);
      })
    );
  }

  createEmpreendimento(empreendimento: Empreendimento): Observable<Empreendimento> {
    return this.http.post<Empreendimento>(this.apiUrl, empreendimento).pipe(
      catchError(error => {
        console.warn('Erro ao criar na API. Simulando sucesso com mock.', error);
        const newId = Math.max(...this.mockData.map(m => m.id || 0)) + 1;
        const newItem = { ...empreendimento, id: newId };
        this.mockData.push(newItem);
        return of(newItem);
      })
    );
  }

  updateEmpreendimento(id: number, empreendimento: Empreendimento): Observable<Empreendimento> {
    return this.http.put<Empreendimento>(`${this.apiUrl}/${id}`, empreendimento).pipe(
      catchError(error => {
        console.warn('Erro ao atualizar na API. Simulando sucesso com mock.', error);
        const index = this.mockData.findIndex(m => m.id === id);
        if (index !== -1) this.mockData[index] = { ...empreendimento, id };
        return of({ ...empreendimento, id });
      })
    );
  }

  deleteEmpreendimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.warn('Erro ao deletar na API. Simulando sucesso com mock.', error);
        this.mockData = this.mockData.filter(m => m.id !== id);
        return of(undefined);
      })
    );
  }
}

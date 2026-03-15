import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EmpreendimentoService } from '../../services/empreendimento.service';
import { of } from 'rxjs';
import { Empreendimento } from '../../models/empreendimento.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: EmpreendimentoService;

  const mockEmpreendimentos: Empreendimento[] = [
    { 
      id: 1, 
      nome_empreendimento: 'Test Empreendimento', 
      nome_responsavel: 'Responsavel Test', 
      email: 'test@email.com', 
      status: 'Ativo',
      data_cadastro: new Date().toISOString(),
      data_atualizacao: new Date().toISOString()
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: EmpreendimentoService,
          useValue: {
            getEmpreendimentos: () => of(mockEmpreendimentos),
            deleteEmpreendimento: (id: number) => of(void 0)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmpreendimentoService);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar empreendimentos ao iniciar', () => {
    expect(component.empreendimentos.length).toBe(1);
    expect(component.empreendimentos[0].nome_empreendimento).toBe('Test Empreendimento');
  });

  it('deve chamar o serviço para deletar um empreendimento', () => {
    spyOn(service, 'deleteEmpreendimento').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.deleteEmpreendimento(1);
    
    expect(service.deleteEmpreendimento).toHaveBeenCalledWith(1);
  });

  it('deve exibir o título correto no HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Dashboard de Empreendimentos');
  });

  it('deve renderizar a tabela com os dados do mock', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const row = compiled.querySelector('tbody tr');
    expect(row?.textContent).toContain('Test Empreendimento');
    expect(row?.textContent).toContain('Responsavel Test');
  });
});

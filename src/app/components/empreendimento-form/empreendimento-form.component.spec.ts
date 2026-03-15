import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpreendimentoFormComponent } from './empreendimento-form.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EmpreendimentoService } from '../../services/empreendimento.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

describe('EmpreendimentoFormComponent', () => {
  let component: EmpreendimentoFormComponent;
  let fixture: ComponentFixture<EmpreendimentoFormComponent>;
  let service: EmpreendimentoService;
  let router: Router;

  const mockEmpreendimento = { 
    id: 1, 
    nome_empreendimento: 'Edifício Teste', 
    nome_responsavel: 'João Responsável', 
    email: 'joao@teste.com', 
    status: 'Ativo' 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpreendimentoFormComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: EmpreendimentoService,
          useValue: {
            getEmpreendimento: () => of(mockEmpreendimento),
            createEmpreendimento: () => of(mockEmpreendimento),
            updateEmpreendimento: () => of(mockEmpreendimento)
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpreendimentoFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmpreendimentoService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com formulário inválido', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('deve validar e-mail incorreto', () => {
    const email = component.form.controls['email'];
    email.setValue('email_invalido');
    expect(email.errors?.['email']).toBeTruthy();
  });

  it('deve validar nome de empreendimento mínimo 3 caracteres', () => {
    const nome = component.form.controls['nome_empreendimento'];
    nome.setValue('Ed');
    expect(nome.errors?.['minlength']).toBeTruthy();
  });

  it('deve habilitar botão salvar quando formulário for válido', () => {
    component.form.patchValue(mockEmpreendimento);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeFalsy();
  });

  it('deve chamar createEmpreendimento ao submeter novo registro', () => {
    spyOn(service, 'createEmpreendimento').and.callThrough();
    spyOn(router, 'navigate');
    
    component.form.patchValue(mockEmpreendimento);
    component.onSubmit();
    
    expect(service.createEmpreendimento).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

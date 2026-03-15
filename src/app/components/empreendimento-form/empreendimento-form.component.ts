import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpreendimentoService } from '../../services/empreendimento.service';
import { Empreendimento } from '../../models/empreendimento.model';

@Component({
  selector: 'app-empreendimento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './empreendimento-form.component.html',
  styles: [`
    .container { padding: 20px; max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h2 { margin-top: 0; color: #333; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #555; }
    input, select { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 16px; }
    input:focus, select:focus { outline: none; border-color: #007bff; box-shadow: 0 0 0 2px rgba(0,123,255,0.25); }
    .actions { display: flex; gap: 12px; margin-top: 30px; }
    .btn { padding: 12px 24px; cursor: pointer; border-radius: 4px; text-decoration: none; font-size: 16px; text-align: center; border: none; flex: 1; transition: background-color 0.2s; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-primary:hover:not(:disabled) { background-color: #0056b3; }
    .btn-primary:disabled { background-color: #ccc; cursor: not-allowed; }
    .btn-secondary { background-color: #6c757d; color: white; }
    .btn-secondary:hover { background-color: #5a6268; }
    .error { color: #dc3545; font-size: 14px; margin-top: 6px; }

    @media (max-width: 576px) {
      .container { margin: 20px; padding: 15px; }
      .actions { flex-direction: column; }
      .btn { width: 100%; margin-right: 0; }
    }
  `]
})
export class EmpreendimentoFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: EmpreendimentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome_empreendimento: ['', [Validators.required, Validators.minLength(3)]],
      nome_responsavel: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['Ativo', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.id = Number(idParam);
      this.service.getEmpreendimento(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const empreendimento: Empreendimento = this.form.value;

    if (this.isEditMode && this.id) {
      this.service.updateEmpreendimento(this.id, empreendimento).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.service.createEmpreendimento(empreendimento).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

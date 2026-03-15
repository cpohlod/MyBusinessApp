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
  styleUrl: './empreendimento-form.component.css'
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

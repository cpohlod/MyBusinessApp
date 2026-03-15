export interface Empreendimento {
  id?: number;
  nome_empreendimento: string;
  nome_responsavel: string;
  email: string;
  status: 'Ativo' | 'Inativo';
}

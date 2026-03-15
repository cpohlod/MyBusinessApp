export interface Empreendimento {
  id?: number;
  nome_empreendimento: string;
  nome_responsavel: string;
  email: string;
  status: 'Ativo' | 'Inativo';
  data_cadastro?: string;
  data_atualizacao?: string;
}

# MyBusinessApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-endod testing framework by default. You can choose one that suits your needs.

## Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

### Listagem de Empreendimentos (Dashboard)
- **Desktop (>= 992px):** Exibição em formato de tabela clássica para melhor aproveitamento de telas grandes.
- **Tablet (768px - 991px):** Exibição em formato de cards dispostos em grade (grid).
- **Mobile (< 768px):** Exibição em formato de cards empilhados verticalmente para facilitar a leitura em telas estreitas.

### Formulários (Criação e Edição)
- **Desktop:** Container centralizado com largura máxima de 600px para foco na tarefa.
- **Mobile (< 576px):** Layout adaptado para ocupar a largura total da tela, com botões de ação empilhados verticalmente para facilitar o toque e preenchimento.

## Loader Global

A aplicação possui um sistema de loader (spinner) global que:
- É ativado automaticamente em qualquer requisição HTTP (via `HttpInterceptor`).
- Bloqueia a interação do usuário com uma sobreposição (overlay) semi-transparente durante o processamento.
- Gerencia múltiplas requisições simultâneas, fechando apenas quando todas forem concluídas.

## API Endpoints

A aplicação utiliza um mock backend através do `json-server` (ou similar) no endereço `http://localhost:3000`.

### Empreendimentos

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/empreendimentos` | Retorna todos os empreendimentos |
| `GET` | `/empreendimentos/:id` | Retorna um empreendimento específico |
| `POST` | `/empreendimentos` | Cria um novo empreendimento |
| `PUT` | `/empreendimentos/:id` | Atualiza um empreendimento existente |
| `DELETE` | `/empreendimentos/:id` | Remove um empreendimento |

**Modelo de Dados:**

```json
{
  "id": 1,
  "nome_empreendimento": "String",
  "nome_responsavel": "String",
  "email": "String (Obrigatório, formato válido)",
  "status": "Ativo | Inativo (Obrigatório)",
  "data_cadastro": "ISO String (Automático na criação)",
  "data_atualizacao": "ISO String (Automático na criação e edição)"
}
```

### Regras de Negócio e Validação
- **E-mail:** Campo de preenchimento obrigatório que deve seguir um formato de e-mail válido (ex: usuario@dominio.com).
- **Status:** Campo obrigatório que define a situação do empreendimento, permitindo apenas os valores "Ativo" ou "Inativo". O valor padrão para novos registros é "Ativo".
- **Data de Cadastro:** Definida automaticamente com a data/hora atual no momento da criação do registro. Não pode ser alterada manualmente.
- **Data de Atualização:** Definida inicialmente na criação e atualizada automaticamente para a data/hora atual sempre que qualquer campo do registro for modificado. No formulário de edição, é exibida apenas para consulta.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

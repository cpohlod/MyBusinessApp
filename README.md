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

A listagem de empreendimentos no Dashboard é totalmente responsiva:

- **Desktop (>= 992px):** Exibição em formato de tabela clássica para melhor aproveitamento de telas grandes.
- **Tablet (768px - 991px):** Exibição em formato de cards dispostos em grade (grid).
- **Mobile (< 768px):** Exibição em formato de cards empilhados verticalmente para facilitar a leitura em telas estreitas.

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
  "email": "String (validado)",
  "status": "Ativo | Inativo"
}
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

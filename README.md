# World Forge API

API construída com [NestJS](https://nestjs.com/) para gerenciar mundos ficcionais, suas entidades e o fluxo de autenticação de usuários. O projeto está preparado para documentação automática com Swagger, permitindo inspecionar e testar todos os endpoints de forma interativa.

## Sumário
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Execução](#execução)
- [Documentação com Swagger](#documentação-com-swagger)
- [Fluxos principais](#fluxos-principais)
- [Estrutura de pastas](#estrutura-de-pastas)

## Arquitetura
- **NestJS 11** com TypeScript.
- **TypeORM** para acesso ao banco de dados PostgreSQL.
- **JWT** para autenticação.
- **Swagger** disponibilizado via `@nestjs/swagger` e `swagger-ui-express` em `/docs`.

## Pré-requisitos
- Node.js 20 ou superior.
- Banco PostgreSQL acessível (local ou remoto).

## Instalação
```bash
npm install
```
> Caso encontre erros de rede ao instalar dependências namespaced (por exemplo `@nestjs/swagger`), configure o registro do npm ou tente novamente mais tarde. Essas bibliotecas são necessárias para a geração da documentação Swagger.

## Variáveis de ambiente
Crie um arquivo `.env` com as configurações abaixo ou defina-as no ambiente de execução:

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta HTTP da aplicação (padrão: `3000`). |
| `JWT_SECRET` | Segredo usado para assinar tokens JWT. |
| `DATABASE_URL` ou parâmetros isolados (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`) | Configuração de conexão com o PostgreSQL. |

## Execução
```bash
# Desenvolvimento com recarregamento automático
npm run start:dev

# Produção (após build)
npm run build
npm run start:prod
```

A API ficará disponível em `http://localhost:3000` (ou na porta definida em `PORT`).

## Testes
Nenhum teste automatizado específico está configurado. Utilize o comando abaixo para garantir que a aplicação compila e que os testes existentes (se adicionados futuramente) sejam executados:
```bash
npm run test
```

## Documentação com Swagger
Assim que a aplicação estiver em execução, acesse `http://localhost:3000/docs` para visualizar a documentação interativa. Ela inclui:
- Descrição de todos os endpoints disponíveis.
- Exemplos de payloads de entrada e respostas de sucesso/erro.
- Autenticação através de JWT (utilize o botão **Authorize** para informar o token gerado no endpoint `/auth/signin`).

## Fluxos principais
### Autenticação
- `POST /auth/signup` — cria um novo usuário.
- `POST /auth/signin` — autentica um usuário e retorna um token JWT.

### Mundos
- `POST /worlds` — cria um mundo (requere JWT).
- `GET /worlds` — lista os mundos do usuário autenticado.
- `GET /worlds/{id}` — consulta detalhes de um mundo específico.

### Entidades
- `POST /worlds/{worldId}/entities` — cria uma entidade dentro de um mundo.
- `GET /worlds/{worldId}/entities` — lista todas as entidades criadas pelo usuário autenticado.
- `POST /worlds/{worldId}/entities/{id}/relations` — cria uma relação com outra entidade.
- `DELETE /worlds/{worldId}/entities/{id}/relations` — remove uma relação existente.
- `PATCH /worlds/{worldId}/entities/{id}` — atualiza dados básicos da entidade.
- `PATCH /worlds/{worldId}/entities/{id}/attributes` — substitui o conjunto de atributos da entidade.

Todos os endpoints protegidos exigem envio do header `Authorization: Bearer <token>`.

## Estrutura de pastas
```
src/
├── auth/                # Autenticação, DTOs e entidades de usuário
├── worlds/              # Módulo de mundos e DTOs correspondentes
├── world_entities/      # Módulo de entidades e relacionamentos
├── app.module.ts        # Módulo raiz da aplicação
└── main.ts              # Ponto de entrada com configuração do Swagger
```

A documentação Swagger e este README devem ser usados em conjunto para explorar e integrar a API ao seu cliente ou frontend preferido.

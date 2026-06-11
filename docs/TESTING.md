# Testes e validacao

## Comandos

- Instalacao: `npm install`
- Build: `npm run build`
- Testes: `npm run test -w @rh/api`
- Lint: nao identificado.
- Typecheck: coberto pelo build dos workspaces principais.

## Estrategia

- Priorizar isolacao entre empresas, permissoes, dados sensiveis, exportacoes e fluxos de admissao/desligamento.
- Cobrir primeiro o slice inicial: tenant, cadastro, ponto, auditoria e consulta de resumo.
- Evoluir de testes de build para testes de integracao assim que o Postgres local estiver disponivel.

## Casos criticos

- Isolamento entre empresas.
- Permissoes por papel.
- Dados sensiveis.
- Relatorios/exportacoes.
- Fluxos de admissao/desligamento.
- Ferias/afastamentos/ponto quando existirem.

## Atualizacao tecnica

- `npm run build` passou para `@rh/api`, `@rh/web`, `@rh/worker` e `@rh/shared`.
- O slice inicial agora possui suite automatizada de integracao em `apps/api/test/authz.http.test.ts`, `apps/api/test/authz.oidc.test.ts` e `apps/api/test/slice.store.test.ts`.
- Build local confirmou o contrato de API em `api/v1` compilando com Prisma.
- Smoke test local com Postgres ativo confirmou `GET /api/health`, `POST /api/v1/tenants`, `POST /api/v1/tenants/:tenantId/companies`, `POST /api/v1/tenants/:tenantId/persons`, `POST /api/v1/tenants/:tenantId/employees`, `POST /api/v1/tenants/:tenantId/point-marks`, `GET /api/v1/tenants/:tenantId/summary` e `GET /api/v1/tenants/:tenantId/audit-events`.
- `npm run test -w @rh/api` passou com quatorze testes verdes cobrindo auth hibrida, tenant access local, grants entre subjects, tenant scope, OIDC/JWKS e persistencia relacional.
- A suite de integracao de `slice.store` agora cobre tambem prazo de pagamento da rescisao e bloqueio de fechamento enquanto houver documentos sem assinatura.
- Smoke runtime no compose validou o fluxo completo com token do Keycloak sem `x-rh-tenant-id` no caminho feliz.
- Smoke runtime do `@rh/web` validou login OIDC via BFF, cookie HttpOnly, `GET /api/session`, `POST /api/session/active-tenant`, timeout por inatividade e `POST /api/v1/tenants` proxado pelo portal.
- O `@rh/web` agora foi atualizado para carregar tenants acessiveis, selecionar tenant ativo e persistir esse contexto localmente.
- O `@rh/web` agora executa o login OIDC via BFF, guarda sessao em cookie HttpOnly e usa logout com redirecionamento para o Keycloak local.
- A suite de testes da API depende de Postgres local acessivel; quando o banco ou o Docker local nao estao disponiveis, a execucao dos testes de integracao fica bloqueada mesmo com o build passando.


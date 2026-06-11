# Testes e validacao

## Comandos

- Instalacao: `npm install`
- Build: `npm run build`
- Testes: `npm run test -w @rh/api`
- Lint: nao identificado.
- Typecheck: coberto pelo build dos workspaces principais.

## Estrategia

- A separacao formal de ambientes esta documentada em [docs/ENVIRONMENTS.md](/F:/projetos/RH/docs/ENVIRONMENTS.md).
- Priorizar isolacao entre empresas, permissoes, dados sensiveis, exportacoes e fluxos de admissao/desligamento.
- Cobrir primeiro o slice inicial: tenant, cadastro, ponto, auditoria e consulta de resumo.
- Evoluir de testes de build para testes de integracao assim que o Postgres local estiver disponivel.
- Tratar o compose local como ambiente de desenvolvimento e o Portainer do host `172.17.0.3` como ambiente de homologacao para smokes de runtime.
- Nao usar o Docker Desktop local do Windows como referencia autoritativa para homologacao.

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
- A stack de homologacao deve ser validada no host Docker compartilhado do ambiente, atualmente identificado como `172.17.0.3`; o Portainer e o alvo autoritativo para esses smokes.
- Smoke runtime do `@rh/web` validou login OIDC via BFF, cookie HttpOnly, `GET /api/session`, `POST /api/session/active-tenant`, timeout por inatividade e `POST /api/v1/tenants` proxado pelo portal.
- O `@rh/web` agora foi atualizado para carregar tenants acessiveis, selecionar tenant ativo e persistir esse contexto localmente.
- O `@rh/web` agora executa o login OIDC via BFF, guarda sessao em cookie HttpOnly e usa logout com redirecionamento para o Keycloak local.
- A suite de testes da API depende de Postgres local acessivel; quando o banco ou o Docker local nao estao disponiveis, a execucao dos testes de integracao fica bloqueada mesmo com o build passando.
- Quando o host Docker compartilhado nao estiver acessivel, os smokes de homologacao ficam bloqueados mesmo com o build passando.


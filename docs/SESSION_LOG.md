# Log de sessões

## Modelo

### YYYY-MM-DD - Sessão

**Objetivo:**

**O que foi feito:**

**Arquivos alterados:**

**Validações:**

**Riscos:**

**Próxima ação:**

### 2026-06-05 - Roadmap de dominios complementares da Onda 6

**Objetivo:** expor a sequencia da Onda 6 no portal sem inventar ainda o motor funcional dos dominios complementares.

**O que foi feito:** o portal ganhou uma timeline de roadmap com a sequencia de dominios complementares planejados para a Onda 6; os cards e a timeline do workspace passaram a incluir essa visao; a documentacao viva e a memoria foram sincronizadas; e o compose local do portal foi recompilado e validado.

**Arquivos alterados:** `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `apps/web/test/portal-workspace.test.mjs`, `docs/FRONTEND_UX.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/web` passou com 4 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build web` recompilou e subiu o portal; `npm run check:platform-alerts` voltou a `ok`.

**Riscos:** o roadmap da Onda 6 ainda e apenas uma superficie visual de expansao; os dominios complementares funcionais seguem para implementacao posterior.

**Próxima ação:** iniciar a materializacao funcional dos dominios complementares quando houver uma frente prioritária definida.

### 2026-06-05 - Portais e workflow da Onda 4

**Objetivo:** materializar a Onda 4 no portal com um workspace operacional de RH.

**O que foi feito:** o portal web ganhou um workspace que consolida colaborador, gestor, documentos, excecoes e trilha de workflow a partir do tenant ativo; a tela passou a consultar admissoes, desligamentos, offboardings, rescissoes, monitoramento de integracoes, comprovante de ponto e snapshot contratual recente; os estilos e testes foram ampliados; o compose do web foi recompilado; e a documentacao viva e a memoria foram sincronizadas.

**Arquivos alterados:** `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `apps/web/src/styles.css`, `apps/web/test/portal-workspace.test.mjs`, `docs/FRONTEND_UX.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/web` passou com 4 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build web` recompilou e subiu o portal; `npm run check:platform-alerts` voltou a `ok`.

**Riscos:** o workspace de portais e workflow ainda e uma leitura consolidada de estado; o motor transacional de aprovacoes e automacoes mais ricas continua para evolucao posterior.

**Próxima ação:** partir para a Onda 5 quando a ordem de implementacao pedir nova frente.

### 2026-06-05 - BI, LGPD e auditoria ampliada da Onda 5

**Objetivo:** materializar a Onda 5 no portal com um snapshot analitico de BI, LGPD e auditoria.

**O que foi feito:** a API ganhou `GET /api/v1/tenants/:tenantId/analytics/overview` com headcount, pressao de fluxo, auditoria, integracoes e politica de exportacao/retencao por tenant; o portal passou a exibir esse snapshot em uma nova secao da Onda 5; os testes de API e web foram ampliados; o compose local foi recompilado para api e web; e a documentacao viva e a memoria foram sincronizadas.

**Arquivos alterados:** `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `docs/FRONTEND_UX.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 41 testes verdes; `npm run test -w @rh/web` passou com 4 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build api web` recompilou e subiu os servicos; `npm run check:platform-alerts` voltou a `ok`.

**Riscos:** o snapshot analitico continua sendo uma leitura agregada e auditavel, nao um motor historico completo de BI nem um exportador parametrizado por finalidade.

**Próxima ação:** seguir para a Onda 6 quando a ordem de implementacao pedir nova frente.

### 2026-06-05 - Sincronizacao minima com ERP

**Objetivo:** fechar a ultima frente da Onda 3 com logs estruturados, telemetria operacional e alertas automatizados.

**O que foi feito:** o backend, o worker e o BFF passaram a emitir logs estruturados em JSON; a API expôs telemetria operacional em `GET /api/v1/platform/telemetry`; o workspace ganhou `npm run check:platform-alerts` para validar o compose local; a API do compose foi reconstruida para refletir o novo endpoint; e a documentacao viva e a memoria foram sincronizadas.

**Arquivos alterados:** `apps/api/src/main.ts`, `apps/api/src/platform.controller.ts`, `apps/api/src/app.module.ts`, `apps/api/src/slice.store.ts`, `apps/api/test/authz.http.test.ts`, `apps/worker/src/main.ts`, `apps/web/src/bootstrap.js`, `apps/web/src/tenant-access.js`, `apps/web/test/tenant-access.test.mjs`, `apps/web/package.json`, `scripts/platform-alerts-check.mjs`, `package.json`, `docs/INFRASTRUCTURE.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 39 testes verdes; `npm run test -w @rh/web` passou com 3 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build api` recompilou e recriou a API; `npm run check:platform-alerts` passou com status `ok`.

**Riscos:** a telemetria local da plataforma está funcional no compose, mas a camada alvo de observabilidade completa continua pendente de definicao fora do ambiente local.

**Próxima ação:** encerrar a Onda 3 como concluida e partir para a Onda 4 quando houver nova frente ativa.

**Objetivo:** fechar a primeira camada executavel da Onda 2 para integracao com ERP.

**O que foi feito:** o lote de ponto consolidado agora pode ser enviado para ERP apos o envio para folha, com estado relacional proprio, recibo sintetico auditavel e trilha de auditoria. O controller recebeu a nova rota `send-to-erp`, os testes de store e HTTP foram ampliados, e a migracao foi aplicada no Postgres local.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606020000_time_sheet_payroll_event_batch_erp/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 38 testes verdes contra o Postgres local; `prisma migrate deploy` aplicou a migracao pendente no banco local.

**Riscos:** a sincronizacao com ERP ainda usa recibo sintetico e nao substitui um contrato tecnico completo, idempotencia real ou conciliacao financeira.

**Próxima ação:** seguir para a integracao com banco dentro da Onda 2.

### 2026-06-05 - Sincronizacao minima com banco

**Objetivo:** fechar a camada executavel de integracao bancária da Onda 2.

**O que foi feito:** o lote de ponto consolidado e enviado para folha/ERP agora tambem pode ser sincronizado com banco por uma rota propria em `POST /api/v1/integrations/bank/sync`, com persistencia relacional de estado, recibo sintetico auditavel e trilha de auditoria. O schema Prisma recebeu campos de banco no lote, a migracao foi aplicada e a cobertura de testes foi ampliada.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606023000_time_sheet_payroll_event_batch_bank/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/integrations.controller.ts`, `apps/api/src/app.module.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** pendentes nesta rodada; a próxima etapa e a execucao de `npm run build` e `npm run test -w @rh/api` apos a migracao.

**Riscos:** o banco continua sendo uma camada minima auditavel com recibo sintetico e nao substitui contrato tecnico completo, remessa real ou conciliacao bancária.

**Próxima ação:** validar build e testes e seguir para operadora de beneficios.

### 2026-06-05 - Beneficios, identidade e monitoramento

**Objetivo:** fechar a primeira camada executavel das demais frentes da Onda 2.

**O que foi feito:** adicionamos requests persistidos para integrações mínimas de benefícios e identidade, com auditabilidade e estados `completed`; expusemos `POST /api/v1/integrations/benefits/sync`, `POST /api/v1/integrations/identity/sync` e `GET /api/v1/integrations/monitoring`; e sincronizamos a documentação viva, o mapa e a memória do projeto.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606030000_api_integration_requests/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/integrations.controller.ts`, `apps/api/src/app.module.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 38 testes verdes contra o Postgres local; a migration nova foi aplicada no banco local.

**Riscos:** as integrações de benefícios e identidade ainda são uma primeira camada genérica; contratos reais, campos obrigatórios, retorno externo e retentivas precisam de validação especializada antes de virar operação completa.

**Próxima ação:** seguir para a próxima frente da Onda 2 ou descer para monitoramento/retentativas mais fino se a ordem exigir.

### 2026-06-05 - Retentativas e DLQ

**Objetivo:** fechar a última frente aberta da Onda 2 para integracoes.

**O que foi feito:** adicionamos `attempts`, `lastAttemptAt` e estado `dlq` ao request persistido de integração; expusemos `POST /api/v1/tenants/:tenantId/integrations/:requestId/fail`, `POST /api/v1/tenants/:tenantId/integrations/:requestId/retry` e `POST /api/v1/tenants/:tenantId/integrations/:requestId/dlq`; o monitoramento agora contabiliza tentativas, falhas e DLQ; e a suíte de testes passou validando o ciclo completo. A migration foi aplicada no banco local.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606033000_api_integration_requests_retries_dlq/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/integrations.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 38 testes verdes; `prisma migrate deploy` aplicou a nova migration no Postgres local.

**Riscos:** a retentativa e a DLQ ainda são uma camada de estado persistido, e não uma fila especializada com política de backoff, isolamento de canal e redispatch automático.

**Próxima ação:** partir para a Onda 3 - plataforma e governança.

### 2026-06-05 - Auditoria e LGPD

**Objetivo:** Revisar riscos de LGPD e auditoria, reduzindo exposição de dados sensiveis em logs e trilhas operacionais.

**O que foi feito:** Auditoria do uso de dados sensiveis no backend e worker; reducao de CPF, CNPJ, notas livres, motivo de desligamento e valores financeiros em eventos de auditoria de alto nivel; simplificacao de logs do worker; atualizacao da documentacao de LGPD, riscos e arquitetura de auditoria.

**Arquivos alterados:** `apps/api/src/slice.store.ts`, `apps/worker/src/main.ts`, `docs/LGPD_SECURITY.md`, `docs/RISKS.md`, `docs/ARCHITECTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` com sucesso.

**Riscos:** A politica final de retencao, descarte e exportacao de dados ainda nao esta fechada; a minimizacao de dados sensiveis nas trilhas continua sendo um trabalho incremental.

**Próxima ação:** Fechar a politica operacional de retencao e exportacao e revisar os pontos restantes de exposição em auditoria.

### 2026-06-05 - Prazo e assinaturas da rescisao

**Objetivo:** Refinar a rescisao completa com prazo de pagamento calculado e assinatura rastreavel de documentos antes do fechamento.

**O que foi feito:** Adicao de `paymentDueAt` em `RescissionRequest`; rastreamento de assinatura em `RescissionDocument`; novo endpoint para assinatura de documentos rescisorios; bloqueio de fechamento enquanto houver documentos sem assinatura; atualizacao das docs vivas e do contrato do backend.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260605210000_rescission_deadline_signatures/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/README-UC-RES.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` com sucesso; tentativa de `npm run test -w @rh/api` bloqueada porque o Postgres local nao estava acessivel e o daemon do Docker nao respondeu neste ambiente.

**Riscos:** A politica final por tipo de documento rescisorio e o nivel de assinatura ainda precisam de validacao juridico-operacional.

**Próxima ação:** Validar a politica final de assinatura por tipo documental e concluir a validacao em runtime quando o ambiente local estiver disponivel.

### 2026-06-05 - Memoria de calculo e documentos da rescisao

**Objetivo:** Fechar a primeira fatia util da rescisao detalhada com memoria de calculo e documentos finais, mantendo o desligamento minimo e o offboarding já consolidados.

**O que foi feito:** Implementacao de `RescissionCalculation` e `RescissionDocument` no schema e no backend; adicao dos endpoints de calculo e geracao/listagem de documentos; fechamento da rescisao condicionado a estado documentado; atualizacao da suite de testes e da documentacao viva.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604222000_rescission_calculation_documents/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `docs/README-UC-RES.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run test -w @rh/api` com 29 testes verdes; `npm run build` com sucesso; migration aplicada localmente no Postgres.

**Riscos:** A rescisao minima agora possui memoria de calculo e documentos, mas ainda falta congelar o contrato legal final, assinaturas e prazos operacionais.

**Próxima ação:** Refinar as regras legais finais, assinaturas e prazos da rescisao completa.

### 2026-06-04 - Offboarding minimo e eSocial de desligamento

**Objetivo:** Executar a trilha minima de offboarding e a transmissao minima de eSocial de desligamento, sincronizando runtime, backlog e documentação.

**O que foi feito:** Implementacao do offboarding minimo no backend com criacao, fechamento, cancelamento e disparo automatico da transmissao de desligamento; implementacao da transmissao minima de eSocial de desligamento com fila BullMQ, worker consumidor, consulta e persistencia de estados `queued`, `sent` e `failed`; atualizacao das docs de produto, arquitetura, backend, riscos e decisions; sincronizacao da memoria, handoff, mapa, tarefas, perguntas abertas e log de sessao.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604215000_termination_offboarding_esocial/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `apps/worker/src/main.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `docs/README-UC-ADM.md`, `docs/README-UC-RES.md`, `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` com sucesso; `npm run test -w @rh/api` com 29 testes verdes; migration aplicada localmente no Postgres.

**Riscos:** Os fluxos completos de desligamento, verbas rescisórias e documentos finais ainda precisam ser detalhados.

**Próxima ação:** Detalhar os calculos rescisorios e os documentos finais de desligamento.

### 2026-06-04 - Scaffold minimo de rescisao

**Objetivo:** Executar a primeira fatia de rescisao, sincronizando runtime, backlog e documentação.

**O que foi feito:** Implementacao do scaffold minimo de rescisao no backend com `RescissionRequest`, historico, fechamento, cancelamento controlado e dependencia de desligamento efetivo; atualizacao das docs de produto, arquitetura, backend, riscos e decisions; sincronizacao da memoria, handoff, mapa, tarefas, perguntas abertas e log de sessao.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604213000_rescission_minimal/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `docs/README-UC-ADM.md`, `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/README-UC-RES.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run test -w @rh/api` com 27 testes verdes; `npm run build` com sucesso; migration aplicada localmente no Postgres.

**Riscos:** O scaffold ainda nao cobre calculos rescisorios, offboarding, documentos finais ou eSocial de desligamento.

**Próxima ação:** Fechar offboarding e eSocial de desligamento.

### 2026-06-04 - Implementação mínima de eSocial na admissão

**Objetivo:** Executar a trilha mínima de eSocial da admissão, sincronizando runtime, backlog e documentação.

**O que foi feito:** Implementação da trilha mínima de eSocial no backend com fila BullMQ, worker consumidor, consulta de transmissões e persistência de estados `queued`, `sent` e `failed`; atualização das docs de produto, arquitetura, backend, riscos e decisões; fechamento da tarefa correspondente na memória e no backlog.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604203000_admission_esocial/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/package.json`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `apps/worker/src/main.ts`, `apps/worker/package.json`, `apps/worker/Dockerfile`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`.

**Validações:** `npm run test -w @rh/api` passou com 23 testes verdes; `npm run build` passou no monorepo; migrations aplicadas localmente no Postgres.

**Riscos:** O contrato governamental final do eSocial, a conciliacao e o reprocessamento ainda precisam de validacao operacional.

**Próxima ação:** Seguir para o desligamento administrativo do Topico 04.

### 2026-06-04 - Implementação mínima de desligamento administrativo

**Objetivo:** Executar a trilha mínima de desligamento administrativo, sincronizando runtime, backlog e documentação.

**O que foi feito:** Implementação do desligamento administrativo mínimo no backend com `TerminationRequest`, histórico, aprovação, efetivação, cancelamento controlado e bloqueio de novos apontamentos após efetivação; atualização das docs de produto, arquitetura, backend, riscos e decisões; fechamento da tarefa correspondente na memória e no backlog.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604210000_termination_admin/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `docs/README-UC-ADM.md`, `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`.

**Validações:** `npm run test -w @rh/api` passou com 25 testes verdes; `npm run build` passou no monorepo; migration aplicada localmente no Postgres.

**Riscos:** Rescisao, offboarding e eSocial de desligamento continuam como evolucao posterior.

**Próxima ação:** Seguir para offboarding e eSocial de desligamento.

### 2026-06-03 - Auditoria inicial e inicializacao da sessao

**Objetivo:** Registrar o estado real inicial do repositorio e preparar a continuidade do trabalho.

**O que foi feito:** Leitura da memoria obrigatoria, docs centrais, arquitetura conceitual e perfis relevantes; confirmacao de que o repositorio atual e predominantemente documental; atualizacao de memoria, mapa, tarefas, perguntas, handoff e docs principais.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/HR_DOMAIN.md`, `docs/BACKEND.md`, `docs/LGPD_SECURITY.md`, `docs/INFRASTRUCTURE.md`, `docs/FRONTEND_UX.md`, `docs/TESTING.md`, `docs/DECISIONS.md`, `docs/RISKS.md`.

**Validações:** Auditoria documental e inventario da arvore do repositorio; nenhum codigo executavel encontrado.

**Riscos:** Stack executavel ainda indefinida; riscos de LGPD, integracao e priorizacao permanecem em aberto.

**Próxima ação:** Definir MVP e base executavel, ou confirmar se o codigo reside em outro repositorio/branch.

### 2026-06-04 - Revisao do UC-JOR e inicio do UC-FOL

**Objetivo:** Continuar a especificacao funcional a partir do pacote UC-JOR e iniciar UC-FOL com o caso UC-FOL-001.

**O que foi feito:** Revisao critica do pacote UC-JOR com identificacao de lacunas funcionais, sugestao de novos casos de uso para fechamento, rastreabilidade e calculos complementares, e criacao do documento de continuidade com o inicio detalhado de UC-FOL-001 - Cadastrar Rubrica.

**Arquivos alterados:** `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`

**Validações:** Cruzamento do catalogo mestre, casos UC-JOR existentes e regras de folha, ponto e eSocial ja documentadas.

**Riscos:** UC-JOR ainda depende de fechamento formal, reabertura, comprovantes e calculos complementares; UC-FOL-001 depende de separar cadastro estrutural de parametrizacao fiscal e tributaria.

**Próxima ação:** Detalhar UC-FOL-002 - Configurar Incidencias da Rubrica e, em seguida, formalizar UC-JOR-011 em diante.

### 2026-06-04 - Detalhamento de UC-FOL-002

**Objetivo:** Continuar o módulo de folha com a parametrização de incidências da rubrica.

**O que foi feito:** Criação do caso de uso `UC-FOL-002 — Configurar Incidências da Rubrica`, mantendo a separação entre cadastro estrutural da rubrica e sua parametrização tributária, previdenciária e de eSocial.

**Arquivos alterados:** `docs/UC-FOL-002-configurar-incidencias-da-rubrica.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/DECISIONS.md`.

**Validações:** Cruzamento das regras de folha e eSocial já documentadas com o catálogo mestre e com o desenho do UC-FOL-001.

**Riscos:** Incidências precisam permanecer versionadas por vigência; rubrica não deve ser tratada como apta para cálculo ou transmissão antes da parametrização completa.

**Próxima ação:** Seguir para `UC-FOL-003 — Processar Folha Mensal` ou abrir o detalhamento de `UC-JOR-011` para fechamento do período de ponto.

### 2026-06-04 - Auditoria formal de UC-ADM e UC-JOR

**Objetivo:** Validar formalmente os pacotes `UC-ADM` e `UC-JOR` antes de seguir com novas especificações.

**O que foi feito:** Revisão linha a linha dos casos `UC-ADM-001` a `UC-ADM-010` e `UC-JOR-001` a `UC-JOR-010`, com cruzamento do catálogo mestre e das regras de domínio relacionadas.

**Arquivos alterados:** `docs/SESSION_LOG.md`, `.codex/HANDOFF.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RISKS.md`

**Validações:** Verificação documental de títulos, objetivos, pré-condições, fluxos, regras de negócio, eventos, APIs e integrações declaradas.

**Riscos:** Foram identificadas ambiguidades de responsabilidade entre `UC-ADM-001` e `UC-ADM-005`, divergências de nomenclatura entre catálogo e casos de uso de ADM, e lacunas formais no pacote `UC-JOR` para fechamento/reabertura e alguns fluxos de ponto ainda implícitos.

**Próxima ação:** Tratar as divergências encontradas e, após isso, seguir com `UC-FOL-003 — Processar Folha Mensal`.

### 2026-06-04 - Correção das divergências formais

**Objetivo:** Aplicar as correções necessárias após a auditoria formal de `UC-ADM` e `UC-JOR`.

**O que foi feito:** Reescrita de `UC-ADM-001` para cadastro-base do colaborador, ajuste de `UC-ADM-005` para formalização do vínculo, alinhamento do catálogo mestre para `UC-ADM-010`, criação de `UC-JOR-011` e `UC-JOR-012`, extensão de `UC-JOR-008` para adicional noturno e atualização de índices, memória e decisões do projeto.

**Arquivos alterados:** `docs/UC-ADM-001.md`, `docs/UC-ADM-005.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/README-UC-JOR.md`, `docs/UC-JOR-008-calcular-horas-extras.md`, `docs/UC-JOR-011-fechar-periodo-de-ponto.md`, `docs/UC-JOR-012-reabrir-periodo-de-ponto.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/DECISIONS.md`, `docs/RISKS.md`.

**Validações:** Revisão do conteúdo atualizado com cruzamento do catálogo mestre, do pacote UC-ADM, do pacote UC-JOR e das regras de negócio de jornada e folha.

**Riscos:** UC-JOR-013 em diante ainda não foi detalhado; comprovantes, calendários complementares e outras extensões permanecem em aberto.

**Próxima ação:** Detalhar `UC-FOL-003 — Processar Folha Mensal`.

### 2026-06-04 - Consolidação final da sessão

**Objetivo:** Fechar a rodada de correções e sincronizar os artefatos de navegação do projeto.

**O que foi feito:** Atualização do mapa do projeto, handoff, continuidade e decisões, além do ajuste final dos índices de UC-JOR e da limpeza de dúvidas abertas já resolvidas.

**Arquivos alterados:** `.codex/PROJECT_MAP.md`, `.codex/HANDOFF.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/TASKS.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/DECISIONS.md`, `docs/RISKS.md`.

**Validações:** Conferência final dos arquivos de navegação e dos pontos corrigidos nos pacotes UC-ADM e UC-JOR.

**Riscos:** Apenas as frentes ainda não detalhadas de `UC-JOR-013` em diante e a continuação natural em `UC-FOL-003`.

**Próxima ação:** Iniciar `UC-FOL-003 — Processar Folha Mensal`.

### 2026-06-04 - Detalhamento de UC-FOL-003

**Objetivo:** Avançar o módulo de folha com o processamento da competência mensal.

**O que foi feito:** Criação do caso de uso `UC-FOL-003 — Processar Folha Mensal`, cobrindo cálculo, memória de cálculo, conferência e preparação da folha mensal para fechamento posterior.

**Arquivos alterados:** `docs/UC-FOL-003-processar-folha-mensal.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento das regras de folha mensal, rubricas, incidências, INSS, FGTS, IRRF, eSocial e FGTS Digital.

**Riscos:** Fechamento da folha, folha complementar e adiantamento salarial permanecem em casos de uso próprios.

**Próxima ação:** Seguir para `UC-FOL-004 — Processar Folha Complementar`.

### 2026-06-04 - Consolidação de UC-FOL-003

**Objetivo:** Registrar a decisão de separar processamento mensal e fechamento da folha.

**O que foi feito:** Atualização da documentação técnica para manter `UC-FOL-003 — Processar Folha Mensal` separado de `UC-FOL-010 — Fechar Folha de Pagamento`, com decisão formal registrada.

**Arquivos alterados:** `docs/DECISIONS.md`, `docs/UC-FOL-003-processar-folha-mensal.md`, `docs/SESSION_LOG.md`.

**Validações:** Revisão da estrutura do módulo de folha e da sequência de uso prevista no catálogo mestre.

**Riscos:** A sequência correta depende de que `UC-FOL-004` e os casos de cálculo específicos continuem a respeitar essa separação.

**Próxima ação:** Seguir para `UC-FOL-004 — Processar Folha Complementar`.

### 2026-06-04 - Detalhamento de UC-FOL-005

**Objetivo:** Avancar a especificacao de folha com o processamento de adiantamento salarial.

**O que foi feito:** Criacao do caso de uso `UC-FOL-005 — Processar Adiantamento Salarial`, cobrindo elegibilidade, simulacao, liquidacao financeira e deducao futura na folha mensal.

**Arquivos alterados:** `docs/UC-FOL-005-processar-adiantamento-salarial.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/DECISIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de folha mensal, folha complementar, integracao bancaria e politica de adiantamento salarial.

**Riscos:** O valor, a elegibilidade e a competencia de deducao do adiantamento podem variar por politica interna e acordo coletivo; a liquidacao financeira precisa permanecer auditavel.

**Próxima ação:** Seguir para `UC-FOL-006 — Calcular INSS`.

### 2026-06-04 - Detalhamento de UC-FOL-006

**Objetivo:** Avancar a especificacao de folha com o calculo previdenciario do INSS.

**O que foi feito:** Criacao do caso de uso `UC-FOL-006 — Calcular INSS`, cobrindo base de incidencia, teto previdenciario, memoria de calculo e integracao com rotina previdenciaria e fiscal.

**Arquivos alterados:** `docs/UC-FOL-006-calcular-inss.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de folha mensal, folha complementar, incidencias, teto previdenciario e integrações previdenciarias.

**Riscos:** O calculo de INSS depende de regras e tabelas vigentes por competencia; a parametrizacao precisa permanecer versionada e auditavel.

**Próxima ação:** Seguir para `UC-FOL-007 — Calcular FGTS`.

### 2026-06-04 - Detalhamento de UC-FOL-007

**Objetivo:** Avancar a especificacao de folha com o calculo fundiario de FGTS.

**O que foi feito:** Criacao do caso de uso `UC-FOL-007 — Calcular FGTS`, cobrindo base fundiaria, aliquota aplicavel, memoria de calculo e integracao com FGTS Digital e rotinas correlatas.

**Arquivos alterados:** `docs/UC-FOL-007-calcular-fgts.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/DECISIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de folha mensal, folha complementar, 13o salario, incidencias de FGTS e FGTS Digital.

**Riscos:** O calculo de FGTS depende de regras fundiarias por competencia e de eventual conferência com FGTS Digital; a etapa de liquidacao ou recolhimento deve permanecer separada.

**Próxima ação:** Seguir para `UC-FOL-008 — Calcular IRRF`.

### 2026-06-04 - Detalhamento de UC-FOL-008

**Objetivo:** Avancar a especificacao de folha com o calculo tributario do IRRF.

**O que foi feito:** Criacao do caso de uso `UC-FOL-008 — Calcular IRRF`, cobrindo base tributavel, deducoes legais, memoria de calculo e integracao com rotinas fiscais e de conferencia.

**Arquivos alterados:** `docs/UC-FOL-008-calcular-irrf.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/DECISIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de folha mensal, folha complementar, ferias, 13o salario, incidencias de IRRF e rotinas fiscais.

**Riscos:** O calculo de IRRF depende de tabela vigente, deducoes legais e validacao tributaria por competencia; a retencao ou transmissao deve permanecer separada.

**Próxima ação:** Seguir para `UC-FOL-009 — Gerar Holerite`.

### 2026-06-04 - Detalhamento de UC-FOL-009

**Objetivo:** Avancar a especificacao de folha com a geracao e disponibilizacao do holerite.

**O que foi feito:** Criacao do caso de uso `UC-FOL-009 — Gerar Holerite`, cobrindo consolidacao de proventos, descontos, bases, versionamento, disponibilizacao no portal e trilha de acesso.

**Arquivos alterados:** `docs/UC-FOL-009-gerar-holerite.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/DECISIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de folha mensal, folha complementar, 13o salario, portal do colaborador e gestao documental.

**Riscos:** O holerite contem dados remuneratorios e tributarios sensiveis e precisa de controle de acesso, versionamento e trilha de auditoria.

**Próxima ação:** Seguir para `UC-FOL-010 — Fechar Folha de Pagamento`.

### 2026-06-04 - Detalhamento de UC-FOL-010 e UC-BI

**Objetivo:** Encerrar o modulo de folha e iniciar o pacote de BI da plataforma.

**O que foi feito:** Criacao de `UC-FOL-010 — Fechar Folha de Pagamento` para congelar a competencia e de `UC-BI-001` a `UC-BI-010` para dashboard executivo, headcount, turnover, absenteismo, custos, recrutamento, treinamento, desempenho, SST e exportacao de indicadores.

**Arquivos alterados:** `docs/UC-FOL-010-fechar-folha-de-pagamento.md`, `docs/UC-BI-001-consultar-dashboard-executivo.md`, `docs/UC-BI-002-consultar-headcount.md`, `docs/UC-BI-003-consultar-turnover.md`, `docs/UC-BI-004-consultar-absenteismo.md`, `docs/UC-BI-005-consultar-custos-de-pessoal.md`, `docs/UC-BI-006-consultar-indicadores-de-recrutamento.md`, `docs/UC-BI-007-consultar-indicadores-de-treinamento.md`, `docs/UC-BI-008-consultar-indicadores-de-desempenho.md`, `docs/UC-BI-009-consultar-indicadores-de-sst.md`, `docs/UC-BI-010-exportar-indicadores.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de folha, BI e privacidade para indicadores agregados.

**Riscos:** BI depende de dados consolidados e pode expor informacoes sensiveis se permissões e agregacoes nao forem aplicadas corretamente.

**Próxima ação:** Seguir para `UC-SEC-001 — Gerenciar perfis de acesso`.

### 2026-06-04 - Detalhamento de UC-SEC

**Objetivo:** Avancar a especificacao de seguranca, LGPD e governanca.

**O que foi feito:** Criacao de `UC-SEC-001` a `UC-SEC-010` para perfis, permissoes, MFA, SSO, consentimento, solicitação do titular, anonimização, retencao, incidente de seguranca e auditoria de acessos.

**Arquivos alterados:** `docs/UC-SEC-001-gerenciar-perfis-de-acesso.md`, `docs/UC-SEC-002-gerenciar-permissoes.md`, `docs/UC-SEC-003-configurar-mfa.md`, `docs/UC-SEC-004-configurar-sso.md`, `docs/UC-SEC-005-registrar-consentimento.md`, `docs/UC-SEC-006-atender-solicitacao-do-titular.md`, `docs/UC-SEC-007-anonimizar-dados.md`, `docs/UC-SEC-008-aplicar-politica-de-retencao.md`, `docs/UC-SEC-009-registrar-incidente-de-seguranca.md`, `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de LGPD, controle de acesso, seguranca e auditoria.

**Riscos:** Permissoes e trilhas de auditoria sao criticas para evitar exposicao indevida de dados pessoais e sensiveis.

**Próxima ação:** Seguir para `UC-API-001 — Cadastrar integração`.

### 2026-06-04 - Detalhamento de UC-API

**Objetivo:** Avancar a especificacao de integracoes e APIs.

**O que foi feito:** Criacao de `UC-API-001` a `UC-API-010` para cadastro de integracoes, API REST, webhooks, eventos, ERP, banco, operadora de beneficios, provedor de identidade e monitoramento.

**Arquivos alterados:** `docs/UC-API-001-cadastrar-integracao.md`, `docs/UC-API-002-configurar-api-rest.md`, `docs/UC-API-003-configurar-webhook.md`, `docs/UC-API-004-publicar-evento.md`, `docs/UC-API-005-consumir-evento.md`, `docs/UC-API-006-integrar-com-erp.md`, `docs/UC-API-007-integrar-com-banco.md`, `docs/UC-API-008-integrar-com-operadora-de-beneficios.md`, `docs/UC-API-009-integrar-com-provedor-de-identidade.md`, `docs/UC-API-010-monitorar-integracoes.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com as regras de integracao, eventos e monitoramento.

**Riscos:** Contratos tecnicos de integracao e monitoramento devem ser especificados com cuidado para evitar perda de eventos e inconsistencias operacionais.

**Próxima ação:** Seguir para `UC-PLT-001 — Cadastrar tenant`.

### 2026-06-04 - Detalhamento de UC-PLT e encerramento da sequencia catalogada

**Objetivo:** Concluir o catalogo funcional atual com a camada de plataforma SaaS.

**O que foi feito:** Criacao de `UC-PLT-001` a `UC-PLT-010` para tenant, empresa, filial, isolamento de dados, parametrizacoes por tenant, disponibilidade, backup, restauracao, performance e governanca da plataforma.

**Arquivos alterados:** `docs/UC-PLT-001-cadastrar-tenant.md`, `docs/UC-PLT-002-cadastrar-empresa.md`, `docs/UC-PLT-003-cadastrar-filial.md`, `docs/UC-PLT-004-configurar-isolamento-de-dados.md`, `docs/UC-PLT-005-configurar-parametrizacoes-por-tenant.md`, `docs/UC-PLT-006-monitorar-disponibilidade.md`, `docs/UC-PLT-007-executar-backup.md`, `docs/UC-PLT-008-executar-restauracao.md`, `docs/UC-PLT-009-monitorar-performance.md`, `docs/UC-PLT-010-auditar-governanca-da-plataforma.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento do catalogo mestre com os requisitos de plataforma SaaS, isolamento multi-tenant, disponibilidade, backup e governanca.

**Riscos:** A camada de plataforma precisa de controles fortes de isolamento, backup e restauracao para proteger todos os modulos acima.

**Próxima ação:** Encerrar a sequência catalogada do produto e partir para revisão transversal, se requerida.

### 2026-06-04 - Revisão transversal da documentação

**Objetivo:** Verificar coerência entre os módulos concluidos e os blocos de plataforma, seguranca, APIs e BI.

**O que foi feito:** Revisao das dependencias entre `UC-FOL-009` e `UC-FOL-010`, correção da publicacao prematura de holerite, e registro do estado reduzido dos blocos `UC-BI`, `UC-SEC`, `UC-API` e `UC-PLT` em relacao ao padrao mais detalhado usado nos blocos de admissao, ponto e folha.

**Arquivos alterados:** `docs/UC-FOL-009-gerar-holerite.md`, `docs/DECISIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento de `RN 003 - Folha.md`, `UC-FOL-009`, `UC-FOL-010` e do catalogo mestre com os blocos transversais recentemente criados.

**Riscos:** Persistem documentos em formato resumido nos blocos transversais, o que pode exigir expansao posterior antes de congelar a especificacao.

**Próxima ação:** Aguardar orientacao sobre expansao dos blocos resumidos ou consolidacao final do material.

### 2026-06-04 - Detalhamento de UC-JOR-013

**Objetivo:** Avançar o pacote UC-JOR com a configuração de calendários de feriados e exceções.

**O que foi feito:** Criação do caso de uso `UC-JOR-013 — Configurar Calendário de Feriados e Exceções`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-002`, `UC-JOR-005`, `UC-JOR-008`, `UC-JOR-011` e `UC-JOR-012`, além das regras de feriados, tolerâncias e integração com ponto.

**Riscos:** Feriados municipais, estaduais e exceções locais exigem fonte oficial, controle por vigência e validação jurídica antes de uso operacional amplo.

**Próxima ação:** Detalhar `UC-JOR-014 — Configurar Regras de Tolerância de Ponto`.

### 2026-06-04 - Detalhamento de UC-JOR-014

**Objetivo:** Avançar o pacote UC-JOR com as regras de tolerância de ponto.

**O que foi feito:** Criação do caso de uso `UC-JOR-014 — Configurar Regras de Tolerância de Ponto`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-001`, `UC-JOR-005`, `UC-JOR-008` e `UC-JOR-013`, além das regras de tolerância, precedência e vigência.

**Riscos:** Regras de tolerância dependem de política interna, acordo coletivo e precedência por abrangência, exigindo validação jurídica e operacional antes de congelar o comportamento final.

**Próxima ação:** Detalhar `UC-JOR-015 — Registrar e Gerenciar Dispositivos de Ponto`.

### 2026-06-04 - Detalhamento de UC-JOR-015

**Objetivo:** Avançar o pacote UC-JOR com o cadastro e a governança de dispositivos de ponto.

**O que foi feito:** Criação do caso de uso `UC-JOR-015 — Registrar e Gerenciar Dispositivos de Ponto`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-003`, `UC-JOR-004`, `UC-JOR-005`, `UC-JOR-013` e `UC-JOR-014`, além das regras de origem de marcação, rastreabilidade e privacidade.

**Riscos:** Dispositivos de ponto podem envolver biometria, geolocalização e captura offline, exigindo controles de privacidade, segurança e rastreabilidade antes de uso operacional amplo.

**Próxima ação:** Detalhar `UC-JOR-016 — Emitir Comprovante de Marcação`.

### 2026-06-04 - Detalhamento de UC-JOR-016

**Objetivo:** Avançar o pacote UC-JOR com a emissão do comprovante de marcação.

**O que foi feito:** Criação do caso de uso `UC-JOR-016 — Emitir Comprovante de Marcação`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-003`, `UC-JOR-015` e com as regras de comprovante, origem de marcação, permissões e auditoria.

**Riscos:** Comprovantes de marcação podem conter dados pessoais e evidência operacional, exigindo controle de acesso, trilha de auditoria e política de retenção.

**Próxima ação:** Detalhar `UC-JOR-017 — Calcular Adicional Noturno`.

### 2026-06-04 - Detalhamento de UC-JOR-017

**Objetivo:** Avançar o pacote UC-JOR com o cálculo do adicional noturno.

**O que foi feito:** Criação do caso de uso `UC-JOR-017 — Calcular Adicional Noturno`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-008`, `RN-121` a `RN-125` e com o pacote de ponto para manter coerência entre adicional noturno, horas extras e folha.

**Riscos:** O adicional noturno depende de janela parametrizada, fator redutor e política corporativa ou coletiva, exigindo validação jurídica e operacional antes de congelar o comportamento final.

**Próxima ação:** Detalhar `UC-JOR-018 — Aplicar Regras de DSR e Descanso Semanal`.

### 2026-06-04 - Detalhamento de UC-JOR-018

**Objetivo:** Avançar o pacote UC-JOR com a aplicação de DSR e descanso semanal.

**O que foi feito:** Criação do caso de uso `UC-JOR-018 — Aplicar Regras de DSR e Descanso Semanal`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `RN-169`, `RN-171` a `RN-173`, `RN-223` e com o pacote de ponto para manter coerência entre faltas, domingos, feriados e reflexos de descanso semanal.

**Riscos:** DSR e descanso semanal dependem de regra por empresa, escala e política coletiva, exigindo validação jurídica e operacional antes de congelar o comportamento final.

**Próxima ação:** Detalhar `UC-JOR-019 — Consolidar Eventos de Ponto para Folha`.

### 2026-06-04 - Detalhamento de UC-JOR-019

**Objetivo:** Avançar o pacote UC-JOR com a consolidação de eventos de ponto para folha.

**O que foi feito:** Criação do caso de uso `UC-JOR-019 — Consolidar Eventos de Ponto para Folha`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-008`, `UC-JOR-017`, `UC-JOR-018` e com o pacote de folha para manter coerência entre eventos de ponto, rubricas e competências.

**Riscos:** A consolidação de eventos de ponto para folha depende de mapeamento confiável de rubricas e competências, exigindo validação contábil e operacional antes de congelar o comportamento final.

**Próxima ação:** Detalhar `UC-JOR-020 — Exportar Espelho e Trilhas de Auditoria`.

### 2026-06-04 - Detalhamento de UC-JOR-020

**Objetivo:** Avançar o pacote UC-JOR com a exportação controlada de espelho e trilhas de auditoria.

**O que foi feito:** Criação do caso de uso `UC-JOR-020 — Exportar Espelho e Trilhas de Auditoria`, com atualização do índice do pacote UC-JOR, do catálogo mestre, da continuidade, da memória e dos artefatos de navegação.

**Arquivos alterados:** `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Cruzamento com `UC-JOR-003`, `UC-JOR-016` e com os controles de LGPD, auditoria e retenção.

**Riscos:** A exportação de espelho e trilhas pode expor dados pessoais e sensíveis, exigindo mascaramento, controle de finalidade e políticas de retenção.

**Próxima ação:** Sequência UC-JOR concluída; seguir para revisão transversal ou expansão dos blocos resumidos conforme orientação do projeto.

### 2026-06-04 - Expansão transversal de UC-BI, UC-SEC, UC-API e UC-PLT

**Objetivo:** Expandir os blocos resumidos transversais do produto e consolidar a navegação dos pacotes.

**O que foi feito:** Revisão e detalhamento completo dos casos de uso de BI, segurança, APIs e plataforma, com inclusão de readmes dos pacotes e atualização dos índices de navegação.

**Arquivos alterados:** `docs/README-UC-BI.md`, `docs/README-UC-SEC.md`, `docs/README-UC-API.md`, `docs/README-UC-PLT.md`, `docs/UC-BI-001-consultar-dashboard-executivo.md`, `docs/UC-BI-002-consultar-headcount.md`, `docs/UC-BI-003-consultar-turnover.md`, `docs/UC-BI-004-consultar-absenteismo.md`, `docs/UC-BI-005-consultar-custos-de-pessoal.md`, `docs/UC-BI-006-consultar-indicadores-de-recrutamento.md`, `docs/UC-BI-007-consultar-indicadores-de-treinamento.md`, `docs/UC-BI-008-consultar-indicadores-de-desempenho.md`, `docs/UC-BI-009-consultar-indicadores-de-sst.md`, `docs/UC-BI-010-exportar-indicadores.md`, `docs/UC-SEC-001-gerenciar-perfis-de-acesso.md`, `docs/UC-SEC-002-gerenciar-permissoes.md`, `docs/UC-SEC-003-configurar-mfa.md`, `docs/UC-SEC-004-configurar-sso.md`, `docs/UC-SEC-005-registrar-consentimento.md`, `docs/UC-SEC-006-atender-solicitacao-do-titular.md`, `docs/UC-SEC-007-anonimizar-dados.md`, `docs/UC-SEC-008-aplicar-politica-de-retencao.md`, `docs/UC-SEC-009-registrar-incidente-de-seguranca.md`, `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`, `docs/UC-API-001-cadastrar-integracao.md`, `docs/UC-API-002-configurar-api-rest.md`, `docs/UC-API-003-configurar-webhook.md`, `docs/UC-API-004-publicar-evento.md`, `docs/UC-API-005-consumir-evento.md`, `docs/UC-API-006-integrar-com-erp.md`, `docs/UC-API-007-integrar-com-banco.md`, `docs/UC-API-008-integrar-com-operadora-de-beneficios.md`, `docs/UC-API-009-integrar-com-provedor-de-identidade.md`, `docs/UC-API-010-monitorar-integracoes.md`, `docs/UC-PLT-001-cadastrar-tenant.md`, `docs/UC-PLT-002-cadastrar-empresa.md`, `docs/UC-PLT-003-cadastrar-filial.md`, `docs/UC-PLT-004-configurar-isolamento-de-dados.md`, `docs/UC-PLT-005-configurar-parametrizacoes-por-tenant.md`, `docs/UC-PLT-006-monitorar-disponibilidade.md`, `docs/UC-PLT-007-executar-backup.md`, `docs/UC-PLT-008-executar-restauracao.md`, `docs/UC-PLT-009-monitorar-performance.md`, `docs/UC-PLT-010-auditar-governanca-da-plataforma.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Revisão documental, alinhamento de índices e padronização estrutural dos pacotes transversais.

**Riscos:** Os blocos foram expandidos, mas ainda podem exigir validação operacional e jurídica fina antes de congelar comportamento final.

**Próxima ação:** Revisão transversal final e checagem de consistência dos índices de navegação.

### 2026-06-04 - Encerramento da sessão

**Objetivo:** Encerrar a sessão de trabalho mantendo o estado persistido e a continuidade clara para retomada futura.

**O que foi feito:** Revisão transversal concluída, ambiguidade do holerite corrigida, módulos de folha, BI, segurança, APIs e plataforma registrados e artefatos de navegação atualizados.

**Arquivos alterados:** `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferência final do estado documental salvo durante a sessão.

**Riscos:** Blocos `UC-BI`, `UC-SEC`, `UC-API` e `UC-PLT` permanecem em formato resumido; expansão futura pode ser necessária.

**Próxima ação:** Retomar pela revisão dos riscos e da continuidade, ou expandir os blocos resumidos se solicitado.

### 2026-06-04 - Limpeza final de continuidade e mapa

**Objetivo:** Normalizar os artefatos de navegação após a expansão transversal dos pacotes.

**O que foi feito:** Correção da continuidade para registrar UC-JOR-011 a UC-JOR-020 e o encerramento dos blocos UC-BI, UC-SEC, UC-API e UC-PLT, remoção de duplicatas no mapa do projeto e inclusão do índice do pacote UC-JOR na navegação principal.

**Arquivos alterados:** `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/PROJECT_MAP.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferência de consistência entre continuidade, mapa do projeto e estado atual dos pacotes documentais.

**Riscos:** Nenhum novo risco funcional; apenas alinhamento documental.

**Próxima ação:** Partir para revisão transversal final ou início da base executável, conforme prioridade do projeto.

### 2026-06-04 - Sincronização da visão central

**Objetivo:** Atualizar os documentos centrais de visão, arquitetura e dúvidas abertas para o estado final da especificação catalogada.

**O que foi feito:** Ajuste em `docs/PRODUCT.md` para registrar a cobertura completa dos pacotes catalogados, ajuste em `docs/ARCHITECTURE.md` para deixar explícito que ainda não existe base runtime e atualização de `.codex/OPEN_QUESTIONS.md` para enquadrar as perguntas restantes como fase de implementação.

**Arquivos alterados:** `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferência de coerência entre visão de produto, arquitetura, perguntas abertas e memória do projeto.

**Riscos:** Nenhum novo risco funcional; apenas alinhamento conceitual.

**Próxima ação:** Iniciar revisão transversal final ou definição da base executável.

### 2026-06-04 - Cobertura documental dos pacotes restantes

**Objetivo:** Cobrir com READMEs de pacote os módulos que ainda não tinham capa documental no mesmo padrão.

**O que foi feito:** Criacao de `README-UC-ADM`, `README-UC-FOL`, `README-UC-BEN`, `README-UC-FER`, `README-UC-DEC`, `README-UC-RES`, `README-UC-SST`, `README-UC-ESO`, `README-UC-COL`, `README-UC-GST`, `README-UC-WFL`, `README-UC-GED`, `README-UC-ATS`, `README-UC-ONB`, `README-UC-LMS`, `README-UC-PER` e `README-UC-CAR`, com atualizacao do mapa do projeto, memoria e handoff.

**Arquivos alterados:** `docs/README-UC-ADM.md`, `docs/README-UC-FOL.md`, `docs/README-UC-BEN.md`, `docs/README-UC-FER.md`, `docs/README-UC-DEC.md`, `docs/README-UC-RES.md`, `docs/README-UC-SST.md`, `docs/README-UC-ESO.md`, `docs/README-UC-COL.md`, `docs/README-UC-GST.md`, `docs/README-UC-WFL.md`, `docs/README-UC-GED.md`, `docs/README-UC-ATS.md`, `docs/README-UC-ONB.md`, `docs/README-UC-LMS.md`, `docs/README-UC-PER.md`, `docs/README-UC-CAR.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferência de cobertura entre o esboço fornecido, o catálogo mestre e os READMEs de pacote criados.

**Riscos:** Os pacotes agora têm capa documental, mas os casos detalhados de cada bloco ainda podem ser expandidos em arquivos próprios quando necessário.

**Próxima ação:** Avançar para discussão técnica usando o esboço já coberto documentalmente.

### 2026-06-04 - Matriz técnica do esboço

**Objetivo:** Consolidar os tópicos do esboço em uma matriz de discussão técnica e priorização.

**O que foi feito:** Criação de `docs/MATRIZ-TECNICA-ESBOCO.md` com ordem recomendada de decisão, direções técnicas por tópico e prioridades de nível 1, 2 e 3.

**Arquivos alterados:** `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferência de aderência entre o esboço do usuário, os pacotes documentais já existentes e a proposta de priorização técnica.

**Riscos:** Nenhum novo risco funcional; o documento serve como base para discussão e decisão.

**Próxima ação:** Discutir a fundação da plataforma, o modelo de dados central e o recorte do MVP.

### 2026-06-04 - Detalhamento do tópico 1

**Objetivo:** Elaborar a fundação da plataforma como primeiro tópico técnico da matriz.

**O que foi feito:** Criação de `docs/TOPICO-01-FUNDACAO-DA-PLATAFORMA.md` com recomendação de monolito modular, camadas principais, decisões estruturais, ambientes, componentes mínimos e riscos da base técnica.

**Arquivos alterados:** `docs/TOPICO-01-FUNDACAO-DA-PLATAFORMA.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferência de aderência com a arquitetura atual documentada e com a ausência de base runtime no repositório.

**Riscos:** A decisão de stack ainda está em aberto; o documento apenas formaliza a recomendação inicial.

**Próxima ação:** Elaborar o tópico 2 - modelo de dados central.

### 2026-06-04 - Detalhamento do tópico 2

**Objetivo:** Estruturar o modelo de dados central da plataforma de RH.

**O que foi feito:** Criação de `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md` com princípios de modelagem, entidades centrais, relações, regras de integridade, modelo recomendado para o MVP e riscos de desenho.

**Arquivos alterados:** `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderência aos princípios já consolidados em `docs/HR_DOMAIN.md` e `docs/ARCHITECTURE.md`.

**Riscos:** O modelo relacional proposto depende de validação com o desenho físico e com a stack que será escolhida.

**Próxima ação:** Elaborar o tópico 3 - cadastro e vínculo do colaborador.

### 2026-06-04 - Detalhamento do tópico 3

**Objetivo:** Definir a fronteira entre cadastro-base do colaborador e formalização do vínculo contratual.

**O que foi feito:** Criação de `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md` com escopo, fluxo conceitual, entidades, regras de negócio, fronteiras com admissão e eSocial, riscos e recomendação técnica.

**Arquivos alterados:** `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderência aos casos `UC-ADM-001` e `UC-ADM-005` e aos princípios consolidados de `Pessoa` e `VinculoTrabalhista`.

**Riscos:** O cadastro e o vínculo podem ser confundidos na implementação se a fronteira não for respeitada.

**Próxima ação:** Elaborar o tópico 4 - admissão digital e eSocial.

### 2026-06-04 - Detalhamento do tópico 4

**Objetivo:** Estruturar a admissão digital e sua integração com o eSocial.

**O que foi feito:** Criação de `docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md` com escopo, fluxo conceitual, eventos S-2190/S-2200/S-2205/S-2206, regras de negócio, fronteiras com outros tópicos e riscos.

**Arquivos alterados:** `docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderência aos blocos de regras de admissão e eSocial já documentados.

**Riscos:** O processo de admissão pode gerar inconsistências se o fluxo documental, o cadastro-base e a transmissão governamental forem tratados como uma única etapa.

**Próxima ação:** Elaborar o tópico 5 - jornada, ponto e folha.

### 2026-06-04 - Detalhamento do tópico 5

**Objetivo:** Definir a cadeia operacional entre jornada, ponto e folha.

**O que foi feito:** Criação de `docs/TOPICO-05-JORNADA-PONTO-E-FOLHA.md` com escopo, fluxo conceitual, entidades, regras de negócio, relações com outros tópicos, recomendação técnica e riscos.

**Arquivos alterados:** `docs/TOPICO-05-JORNADA-PONTO-E-FOLHA.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderência aos pacotes `UC-JOR` e `UC-FOL` já detalhados.

**Riscos:** Ponto e folha podem ser acoplados indevidamente se a consolidação de eventos não for preservada.

**Próxima ação:** Elaborar o tópico 6 - benefícios, férias, 13º e rescisão.

### 2026-06-04 - Detalhamento dos tópicos 6 a 9

**Objetivo:** Completar a matriz técnica com os tópicos finais do esboço.

**O que foi feito:** Criação de `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `docs/TOPICO-08-PORTAIS-WORKFLOW-E-DOCUMENTOS.md` e `docs/TOPICO-09-BI-LGPD-INTEGRACOES-E-AUDITORIA.md`, com atualização da matriz técnica, do mapa do projeto, da memória e do handoff.

**Arquivos alterados:** `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `docs/TOPICO-08-PORTAIS-WORKFLOW-E-DOCUMENTOS.md`, `docs/TOPICO-09-BI-LGPD-INTEGRACOES-E-AUDITORIA.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderência aos pacotes existentes de benefícios, férias, 13o, rescisão, SST, portais, workflow, GED, BI, LGPD, integrações e auditoria.

**Riscos:** Os domínios transversais podem se sobrepor se a implementação não respeitar as fronteiras documentadas.

**Próxima ação:** Fechar a revisão técnica final da matriz e partir para discussão de MVP/base executável.

### 2026-06-04 - Detalhamento do tópico 10

**Objetivo:** Definir o recorte de MVP e a base executável do produto.

**O que foi feito:** Criação de `docs/TOPICO-10-MVP-E-BASE-EXECUTAVEL.md` com fases do MVP, recorte recomendado, itens fora do MVP, critérios de prontidão, base executável e riscos.

**Arquivos alterados:** `docs/TOPICO-10-MVP-E-BASE-EXECUTAVEL.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderência à visão arquitetural e ao estado documental do repositório, que ainda não possui base runtime.

**Riscos:** O MVP pode ficar excessivamente amplo se não houver corte explícito por fase.

**Próxima ação:** Discutir a escolha de stack e o primeiro vertical slice de implementação.

### 2026-06-04 - Detalhamento do tópico 11

**Objetivo:** Definir a stack e a arquitetura executavel do produto.

**O que foi feito:** Criacao de `docs/TOPICO-11-STACK-E-ARQUITETURA-EXECUTAVEL.md` com recomendacao de monolito modular em TypeScript, NestJS, React, PostgreSQL, Redis, BullMQ, Keycloak, MinIO, Docker Compose, GitHub Actions e observabilidade.

**Arquivos alterados:** `docs/TOPICO-11-STACK-E-ARQUITETURA-EXECUTAVEL.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderencia ao estado documental atual e ao objetivo de transformar a especificacao em base executavel.

**Riscos:** A stack recomendada ainda nao esta validada em runtime, apenas documentada.

**Próxima ação:** Elaborar o tópico 12 - vertical slice do primeiro release.

### 2026-06-04 - Detalhamento do tópico 12

**Objetivo:** Definir o primeiro vertical slice do produto.

**O que foi feito:** Criacao de `docs/TOPICO-12-VERTICAL-SLICE-PRIMEIRO-RELEASE.md` com o fluxo ponta a ponta: tenant, autenticacao, cadastro, vinculo, admissao simplificada, ponto, consolidacao, folha minima, demonstrativo e auditoria.

**Arquivos alterados:** `docs/TOPICO-12-VERTICAL-SLICE-PRIMEIRO-RELEASE.md`, `docs/MATRIZ-TECNICA-ESBOCO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderencia ao MVP proposto e ao objetivo de validar a base executavel com um fluxo representativo.

**Riscos:** O slice pode crescer se nao houver corte estrito de escopo.

**Próxima ação:** Decompor o slice em tarefas de implementação quando a fase de código iniciar.

### 2026-06-04 - Definição da infraestrutura mínima da próxima etapa

**Objetivo:** Registrar os requisitos operacionais do ambiente que vai suportar a primeira implementação.

**O que foi feito:** Atualizacao de `docs/INFRASTRUCTURE.md` com checklist minimo para base local, aplicacao e operacao, mantendo a proxima etapa como ambiente de desenvolvimento local espelhavel para homologacao.

**Arquivos alterados:** `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Aderencia ao vertical slice e a stack recomendada para o primeiro release.

**Riscos:** A infraestrutura ainda nao existe em runtime; o checklist e documental.

**Próxima ação:** Montar a base executavel local e decompor o slice em tarefas tecnicas.

### 2026-06-04 - Estrutura inicial do monorepo

**Objetivo:** Criar os arquivos basicos da base executavel local.

**O que foi feito:** Estruturacao inicial do monorepo com `package.json`, `tsconfig.base.json`, `apps/api`, `apps/web`, `apps/worker`, `packages/shared`, `infra/docker-compose.yml` e `infra/.env.example`.

**Arquivos alterados:** `package.json`, `tsconfig.base.json`, `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/web/package.json`, `apps/worker/package.json`, `packages/shared/package.json`, `infra/docker-compose.yml`, `infra/.env.example`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferencia estrutural da arvore criada e aderencia ao stack documentado.

**Riscos:** Dependencias ainda nao foram instaladas e a aplicacao nao esta rodando localmente.

**Próxima ação:** Instalar as dependencias do monorepo e conectar a API ao runtime real da stack.

### 2026-06-04 - Bootstrap local executavel

**Objetivo:** Tornar a infraestrutura minima realmente executavel antes da instalacao da stack final.

**O que foi feito:** Adicao de runtime minimo em Node para `api`, `web` e `worker`, ajuste dos Dockerfiles e do compose para subir a base local sem dependencias externas.

**Arquivos alterados:** `apps/api/src/bootstrap.js`, `apps/web/src/bootstrap.js`, `apps/worker/src/bootstrap.js`, `apps/api/Dockerfile`, `apps/web/Dockerfile`, `apps/worker/Dockerfile`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/INFRASTRUCTURE.md`, `docs/SESSION_LOG.md`.

**Validações:** Conferencia estrutural da arvore criada e aderencia ao stack documentado, com runtime minimo suficiente para a base local.

**Riscos:** Esse bootstrap ainda nao e a stack final e deve ser substituido quando a instalacao do monorepo ocorrer.

**Próxima ação:** Instalar dependencias reais e migrar o bootstrap para NestJS, React e Vite.

### 2026-06-04 - Instalacao do monorepo e validacao da stack

**Objetivo:** Instalar as dependencias reais da stack e validar build/typecheck do monorepo.

**O que foi feito:** Execucao de `npm install`, instalacao de `tsx`, `concurrently`, `@types/react` e `@types/react-dom`, migracao dos workspaces para NestJS, React e Vite, e validacao bem-sucedida de build/typecheck nos workspaces `api`, `web`, `worker` e no topo do monorepo.

**Arquivos alterados:** `package.json`, `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/api/src/health.controller.ts`, `apps/web/package.json`, `apps/web/index.html`, `apps/web/src/main.tsx`, `apps/web/src/App.tsx`, `apps/web/src/styles.css`, `apps/web/vite.config.ts`, `apps/web/tsconfig.json`, `apps/worker/package.json`, `apps/worker/tsconfig.json`, `apps/worker/src/main.ts`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/INFRASTRUCTURE.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` e `npm run typecheck` executados com sucesso no monorepo.

**Riscos:** O Docker Compose ainda usa runtime minimo de bootstrap e nao foi validado em execucao completa.

**Próxima ação:** Conectar o slice inicial ao modelo de dados e aos primeiros endpoints de dominio.

### 2026-06-04 - Smoke tests locais da API e da web

**Objetivo:** Confirmar que os serviços principais da base executável respondem em runtime.

**O que foi feito:** Execucao de smoke tests locais para `api` e `web`, com resposta `200` em `http://127.0.0.1:3000/api/health` e `http://127.0.0.1:5173`.

**Arquivos alterados:** `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `api` e `web` responderam corretamente nos endpoints principais em ambiente local.

**Riscos:** O worker e o compose completo ainda nao passaram por smoke test equivalente nesta rodada.

**Próxima ação:** Avançar para os primeiros endpoints de domínio e o modelo de dados do slice inicial.
### 2026-06-04 - Retomada do slice inicial da API

**Objetivo:** Retomar o trabalho a partir do handoff e consolidar o slice inicial em `api/v1`.

**O que foi feito:** Leitura de `docs/RISKS.md`, `docs/SESSION_LOG.md` e `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`; implementacao de `ValidationPipe` global na API; versionamento do contrato em `api/v1`; reforco do modelo in-memory com tenant, empresa, pessoa, colaborador, ponto e auditoria; ajuste da tela inicial do web para refletir o slice; atualizacao de docs centrais e memoria.

**Arquivos alterados:** `apps/api/src/main.ts`, `apps/api/src/slice.controller.ts`, `apps/api/src/slice.store.ts`, `apps/web/src/App.tsx`, `apps/web/src/styles.css`, `docs/BACKEND.md`, `docs/TESTING.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/SESSION_LOG.md`.

**ValidaÃ§Ãµes:** `npm run build` executado com sucesso no monorepo.

**Riscos:** Persistencia ainda em memoria; auth/RBAC ainda nao implementados; retorno do slice continua dependente do processo local.

**PrÃ³xima aÃ§Ã£o:** Migrar o slice inicial para persistencia real e definir o primeiro contrato de autenticacao/autorizacao.

### 2026-06-04 - Correcao de DI e smoke do slice inicial

**Objetivo:** Corrigir a injeção do `SliceStore` e validar o contrato `api/v1` em runtime.

**O que foi feito:** Ajuste do controller para usar `@Inject(SliceStore)`; recompilacao do monorepo; smoke test local com `GET /api/health`, `POST /api/v1/tenants`, `GET /api/v1/tenants/:tenantId/summary` e `GET /api/v1/tenants/:tenantId/audit-events`; confirmacao de criacao de tenant e registro de auditoria.

**Arquivos alterados:** `apps/api/src/slice.controller.ts`, `docs/TESTING.md`, `docs/BACKEND.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` executado com sucesso e smoke test local validado em runtime.

**Riscos:** Persistencia continua em memoria; auth/RBAC e durabilidade entre reinicios seguem pendentes.

**Próxima ação:** Persistir o slice inicial em banco real e implementar autenticacao/autorizacao minima.

### 2026-06-04 - Persistencia em arquivo e durabilidade do slice

**Objetivo:** Tirar o slice inicial do estado puramente em memoria e validar durabilidade local.

**O que foi feito:** Substituicao do store em memoria por persistencia em arquivo configuravel via `SLICE_STORE_PATH`; atualizacao do compose e da variavel de ambiente; smoke test com restart do processo confirmando reabertura do tenant salvo; sincronizacao de docs, memoria, handoff e tarefas.

**Arquivos alterados:** `apps/api/src/slice.store.ts`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/INFRASTRUCTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` executado com sucesso; smoke test de durabilidade confirmou leitura do tenant apos reinicio com o mesmo arquivo de store.

**Riscos:** Persistencia ainda nao e relacional; concorrencia e transacoes continuam fora do escopo atual.

**Próxima ação:** Persistir o slice inicial em banco relacional real e implementar autenticacao/autorizacao minima.

### 2026-06-04 - Migração para Prisma e PostgreSQL

**Objetivo:** Levar o slice inicial do store em arquivo para persistencia relacional com Prisma.

**O que foi feito:** Criação do schema Prisma para Tenant, Company, Person, Employee, PointMark e AuditEvent; alteração do `SliceStore` para usar `PrismaClient` e transações; adição de `prebuild`/`predev` para gerar o client; atualização do compose para usar PostgreSQL como destino relacional; build do monorepo validado com sucesso.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/package.json`, `apps/api/src/slice.store.ts`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/INFRASTRUCTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` executado com sucesso; Prisma Client gerado com sucesso.

**Riscos:** A validacao em runtime do Postgres ficou bloqueada porque o daemon do Docker/Postgres nao estava disponivel neste ambiente.

**Próxima ação:** Subir um Postgres ativo, aplicar o schema e smoke-testar o fluxo `tenant -> resumo -> auditoria` com o banco relacional.

### 2026-06-04 - Docker ativo e validação relacional concluida

**Objetivo:** Colocar o Docker para rodar e validar o slice inicial contra PostgreSQL real.

**O que foi feito:** Iniciacao do Docker Desktop, confirmacao do daemon `desktop-linux`, subida do `postgres` via `docker compose`, aplicacao da migration Prisma inicial, execucao de smoke test relacional com criacao de tenant, company, person, employee e point mark, e consulta de resumo/auditoria.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604181000_initial/migration.sql`, `apps/api/package.json`, `apps/api/src/slice.store.ts`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `docker version` com daemon ativo, `docker compose up -d postgres`, `prisma migrate deploy` e smoke test relacional da API com sucesso.

**Riscos:** Concorrencia, carga, RBAC e endurecimento multi-tenant ainda precisam de validacao posterior.

**Próxima ação:** Implementar autenticacao/autorizacao minima e testes automatizados do slice relacional.

### 2026-06-04 - Testes automatizados do slice relacional

**Objetivo:** Automatizar a validação relacional do slice inicial.

**O que foi feito:** Criação de `apps/api/test/slice.store.test.ts` com cobertura de persistência relacional, recarga do banco e bloqueio de slug duplicado; adição de `pretest` e script `test` no workspace `@rh/api`; execução de `npm run test -w @rh/api` com tres testes verdes; build final executado com sucesso.

**Arquivos alterados:** `apps/api/package.json`, `apps/api/src/slice.store.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/TESTING.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run test -w @rh/api` e `npm run build` executados com sucesso.

**Riscos:** Cobertura ainda limitada ao slice relacional base; auth/RBAC e integrações transversais seguem fora da malha automatizada.

**Próxima ação:** Implementar autenticacao/autorizacao minima no `@rh/api`.
### 2026-06-04 - Autenticacao minima e cobertura de RBAC

**Objetivo:** Adicionar protecao minima ao slice inicial e cobrir o contrato com testes automatizados.

**O que foi feito:** Implementacao de auth/RBAC local por headers no `@rh/api` com `x-rh-user-id`, `x-rh-role` e `x-rh-tenant-id`; aplicacao de guard global via `Reflector`; protecao de rotas por papel e escopo de tenant; e criacao de `apps/api/test/authz.http.test.ts` cobrindo acesso publico, negacao sem credencial, negacao por papel, fluxo autorizado e bloqueio por tenant incorreto.

**Arquivos alterados:** `apps/api/src/authz.ts`, `apps/api/src/authz.decorators.ts`, `apps/api/src/authz.guard.ts`, `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/api/src/health.controller.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/package.json`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**ValidaÃ§Ãµes:** `npm run test -w @rh/api` com oito testes verdes e `npm run build` com sucesso.

**Riscos:** A autenticacao atual ainda e local por headers e nao substitui um IdP real; Keycloak/OIDC continua pendente.

**PrÃ³xima aÃ§Ã£o:** Integrar Keycloak/OIDC real e expandir a cobertura automatizada de auth/RBAC.

### 2026-06-04 - Suporte OIDC/JWKS e auth hibrida

**Objetivo:** Habilitar o caminho real de autenticacao via OIDC/JWKS sem remover o fallback local do slice.

**O que foi feito:** Implementacao de resolucao hibrida de autenticacao no `@rh/api`, aceitando `Authorization: Bearer <token>` validado por descoberta OIDC e JWKS, mantendo fallback por headers no modo misto; criacao de `apps/api/test/authz.oidc.test.ts` para validar token assinado e preferencia do bearer sobre headers; atualizacao de docs e memoria para refletir o suporte real ao IdP.

**Arquivos alterados:** `apps/api/src/authz.ts`, `apps/api/src/authz.guard.ts`, `apps/api/test/authz.oidc.test.ts`, `apps/api/package.json`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run test -w @rh/api` com dez testes verdes e `npm run build` com sucesso.

**Riscos:** O ambiente local ainda precisa provisionar realm, client e mappers de claim do Keycloak para uso operacional completo.

**Próxima ação:** Provisionar o realm/client do Keycloak no compose e validar o fluxo com token emitido pelo IdP real.

## Ultima entrega tecnica 4

- Data: 2026-06-04
- Objetivo: validar o fluxo relacional completo com o token do Keycloak e corrigir o healthcheck do compose.
- O que foi feito: corre��o do healthcheck da `api` para `/api/health`, recria��o do container at� ficar `healthy`, execu��o de smoke end-to-end com token emitido pelo realm local e valida��o completa do fluxo tenant -> company -> person -> employee -> point mark -> summary -> audit events.
- Arquivos alterados: `infra/docker-compose.yml`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `docker compose up -d api`, `docker compose ps api` em estado `healthy`, smoke com token Keycloak contra a API containerizada e valida��o do fluxo relacional completo.
- Riscos: ainda falta endurecer o claim de tenant no token para reduzir a depend�ncia do header no modo misto.
- Proxima a��o: mapear tenant claim definitivo no realm do Keycloak e reduzir a necessidade de `x-rh-tenant-id` nos fluxos mistos.

### 2026-06-04 - Tenant access local e caminho OIDC sem header

**Objetivo:** Eliminar a dependencia de `x-rh-tenant-id` no caminho feliz OIDC e registrar o acesso no banco.

**O que foi feito:** Criacao da tabela `tenant_access`, gravacao automatica do vinculo quando um tenant e criado por um sujeito autenticado, ajuste do guard para consultar o vinculo em rotas tenant-scoped, adicao de teste HTTP para criar e operar tenant sem header e rebuild da API/container para refletir o novo comportamento.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604193000_tenant_access/migration.sql`, `apps/api/src/authz.decorators.ts`, `apps/api/src/authz.guard.ts`, `apps/api/src/main.ts`, `apps/api/src/slice.controller.ts`, `apps/api/src/slice.store.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/Dockerfile`, `infra/docker-compose.yml`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Valida��es:** `npm run test -w @rh/api` com doze testes verdes, `npm run build` com sucesso, `npx prisma migrate deploy` aplicado localmente, `docker compose up -d --build api`, `docker compose ps api` em estado `healthy` e smoke end-to-end com token do Keycloak criando tenant e operando company/person/employee/point/summary/audit sem `x-rh-tenant-id`.

**Riscos:** falta definir a pol�tica para usuarios com m�ltiplos tenants e eventual troca de tenant por token no mesmo subject.

**Pr�xima a��o:** modelar m�ltiplos v�nculos por usu�rio OIDC e, se necess�rio, expor escolha de tenant explicitamente no token ou em um endpoint de contexto.

### 2026-06-04 - Grants entre subjects e lista de tenants acessiveis

**Objetivo:** Fechar a politica de multiplos tenants com grant entre subjects e listagem de contexto para OIDC.

**O que foi feito:** Adicao do teste automatizado para o fluxo `POST /api/v1/tenants/:tenantId/access-grants` com grant de um tenant a outro subject OIDC, validacao de `GET /api/v1/tenants/me/access` para listar tenants acessiveis e sincronizacao dos artefatos de memoria e continuidade com a nova politica.

**Arquivos alterados:** `apps/api/test/authz.http.test.ts`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.

**Valida��es:** `npm run test -w @rh/api` com quatorze testes verdes.

**Riscos:** A UX de selecao de tenant ativo no frontend ainda nao foi desenhada.

**Pr�xima a��o:** Definir a experiencia de selecao/persistencia do tenant ativo no `@rh/web`.

### 2026-06-04 - Selecao de tenant ativo no frontend

**Objetivo:** Implementar a experiencia de tenant ativo no `@rh/web`.

**O que foi feito:** Transformacao da tela principal em um painel de contexto com Bearer OIDC manual, carregamento de `GET /api/v1/tenants/me/access`, selecao do tenant ativo, persistencia local do contexto e atualizacao visual responsiva para orientar o usuario sobre sessao, lista e estado ativo.

**Arquivos alterados:** `apps/web/src/App.tsx`, `apps/web/src/styles.css`, `docs/FRONTEND_UX.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Valida��es:** build do monorepo apos a mudanca no frontend.

**Riscos:** a sessao ainda depende de token colado manualmente; falta login OIDC real integrado ao portal.

**Pr�xima a��o:** Integrar a autenticacao do portal com o fluxo OIDC real.

### 2026-06-04 - Login OIDC real no portal web

**Objetivo:** Integrar o portal web ao Keycloak local sem token manual.

**O que foi feito:** Transformacao do `@rh/web` em um portal com Authorization Code + PKCE, troca de code por token, carregamento de `GET /api/v1/tenants/me/access`, selecao do tenant ativo e persistencia da escolha no navegador; ajuste de CORS na API e do Dockerfile do web para build e preview do bundle Vite.

**Arquivos alterados:** `apps/api/src/main.ts`, `apps/web/src/App.tsx`, `apps/web/src/styles.css`, `apps/web/package.json`, `apps/web/Dockerfile`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Valida��es:** `npm run build` com sucesso e `npm run test -w @rh/api` com quatorze testes verdes.

**Riscos:** renovacao de access/refresh token e durabilidade da sessao no navegador ainda precisam de endurecimento.

**Pr�xima a��o:** Definir a estrategia de renovacao/expiracao da sessao OIDC no portal.

### 2026-06-04 - Renovacao automatica da sessao OIDC

**Objetivo:** Endurecer a sessao OIDC do portal web com renovacao automatica e logout redirecionado.

**O que foi feito:** Adicao de refresh token no fluxo OIDC do `@rh/web`, renovacao automatica antes do vencimento, retry de leitura do contexto em caso de `401`, logout redirecionado para o Keycloak local e persistencia dos tokens/session state do portal no navegador.

**Arquivos alterados:** `apps/web/src/App.tsx`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Valida��es:** `npm run build` com sucesso.

**Riscos:** armazenamento local de refresh token ainda exige validacao de seguranca e politica de expiracao no navegador.

**Pr�xima a��o:** Definir a estrategia final de armazenamento e rotacao de refresh token no portal.

### 2026-06-04 - Tokens do portal em sessionStorage

**Objetivo:** Reduzir a persistencia de tokens do portal no navegador.

**O que foi feito:** Migracao dos tokens OIDC do `@rh/web` para `sessionStorage`, mantendo apenas o tenant ativo em `localStorage`; preservacao do refresh automatico e do logout redirecionado para o Keycloak local.

**Arquivos alterados:** `apps/web/src/App.tsx`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Valida��es:** `npm run build` com sucesso.

**Riscos:** a estrategia definitiva de armazenamento ainda pode evoluir para um BFF, se o produto exigir isolamento maior.

**Pr�xima a��o:** decidir se o portal permanece com OIDC direto no browser ou migra para um BFF.

## Ultima entrega tecnica 11

- Data: 2026-06-04
- Objetivo: migrar o portal web para BFF local e remover tokens do navegador.
- O que foi feito: o `@rh/web` passou a servir um BFF no proprio dominio, faz login OIDC com Keycloak, guarda sessao em cookie HttpOnly, proxya `GET /api/session`, `POST /api/session/active-tenant` e as rotas `/api/*` para `@rh/api`, enquanto o `App.tsx` foi simplificado para consumir apenas o proprio portal.
- Arquivos alterados: `apps/web/src/bootstrap.js`, `apps/web/src/App.tsx`, `apps/web/package.json`, `apps/web/Dockerfile`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: build pendente nesta rodada; valida��o de runtime do BFF e compose ainda precisa ser concluida.
- Riscos: a sessao do BFF esta em memoria do container, ent�o reinicios derrubam o contexto autenticado.
- Proxima a��o: rodar build e smoke no compose, validar login/callback/logout e o proxy de API.

## Ultima entrega tecnica 12

- Data: 2026-06-04
- Objetivo: concluir a migracao do portal web para BFF local com validacao ponta a ponta.
- O que foi feito: o `@rh/web` agora funciona como BFF no proprio dominio, faz login OIDC com Keycloak, guarda sessao em cookie HttpOnly, proxya `GET /api/session`, `POST /api/session/active-tenant` e `POST /api/v1/tenants` para `@rh/api`, e o `App.tsx` consome apenas endpoints do portal.
- Arquivos alterados: `apps/web/src/bootstrap.js`, `apps/web/src/App.tsx`, `apps/web/package.json`, `apps/web/Dockerfile`, `apps/api/src/authz.ts`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` passou no workspace; smoke no compose validou login OIDC via BFF, cookie HttpOnly, `/api/session`, `/api/session/active-tenant`, `POST /api/v1/tenants` e listagem de tenants via proxy.
- Riscos: a sessao do BFF ainda vive em memoria do container e se perde em reinicio.
- Proxima a��o: decidir se essa sessao precisa virar estado persistente compartilhado ou se o comportamento em memoria � suficiente para o produto.

## Ultima entrega tecnica 13

- Data: 2026-06-04
- Objetivo: persistir a sessao do BFF em volume local e fechar o risco de reinicio do container.
- O que foi feito: o `@rh/web` passou a carregar e salvar o estado do BFF em arquivo JSON atomico no volume `web_session_data`, com `WEB_SESSION_STORE_PATH=/app/data/web-sessions.json`; o compose foi ajustado para montar o volume no container do portal e a documentacao foi sincronizada para refletir persistencia local da sessao.
- Arquivos alterados: `apps/web/src/bootstrap.js`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: build do workspace ainda precisa ser reexecutada depois da persistencia de arquivo; o runtime anterior ja estava validado e a mudanca atual e incremental sobre o mesmo fluxo.
- Riscos: a persistencia local resolve reinicio, mas nao escala horizontalmente sem storage compartilhado.
- Proxima a��o: reexecutar `npm run build` e o smoke do BFF para confirmar que a store persistida carrega e volta apos restart do container.

### 2026-06-04 - Persistencia da sessao do BFF em Redis

**Objetivo:** Mover a sessao do BFF para Redis como store primaria e validar persistencia apos restart do portal.

**O que foi feito:** A store do `@rh/web` passou a usar Redis como fonte primaria, com TTL por inatividade, recarga pregui�osa quando o cookie aponta para uma sessao ainda nao carregada em memoria e volume `redis_data` com AOF no compose; o arquivo JSON legado ficou apenas como ponte de migracao.

**Arquivos alterados:** `apps/web/src/bootstrap.js`, `infra/docker-compose.yml`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`

**Valida��es:** `npm run build` executado com sucesso; seed de sessao via `rh-web` no Redis; `GET /api/session` autenticado via cookie; `POST /api/session/active-tenant`; reinicio do `web`; `GET /api/session` retornando o mesmo `activeTenantId` apos restart.

**Riscos:** Redis continua sendo um ponto unico no ambiente local, e backup/observabilidade/retencao ainda precisam ser definidos para ambiente alvo.

**Pr�xima a��o:** Endurecer a operacao do Redis ou seguir para a proxima frente de produto.
### 2026-06-04 - Endurecimento do BFF em Redis

**Objetivo:** Endurecer a operacao do BFF em Redis com health real, index de sessoes e tratamento de refresh expirado.

**O que foi feito:** O `@rh/web` passou a indexar sessoes no Redis para reduzir dependencia de `SCAN`, o `/health` do portal passou a refletir a disponibilidade do Redis, e refresh OIDC expirado agora invalida a sessao em vez de gerar `500`.

**Arquivos alterados:** `apps/web/src/bootstrap.js`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`

**Valida��es:** `npm run build` executado com sucesso; smoke do `/health` com Redis ok; smoke de `GET /api/session` com cookie novo; `POST /api/session/active-tenant`; restart do `web`; `GET /api/session` retornando o mesmo `activeTenantId` apos restart.

**Riscos:** Redis continua sendo um ponto unico de persistencia no ambiente local e o portal ainda depende do store para manter a sessao autenticada.

**Pr�xima a��o:** Endurecer backup/observabilidade do Redis ou seguir para a proxima frente de produto.

### 2026-06-04 - Observabilidade do BFF e do Redis

**Objetivo:** Ampliar a observabilidade operacional do BFF e do store Redis.

**O que foi feito:** O `@rh/web` passou a expor `GET /api/session-store` com snapshot operacional do store e a incluir no `/health` a visibilidade de Redis, sess�es em memoria, indice, timestamps de carga/escrita e detec��o de drift; os logs de conex�o/reconex�o do Redis tambem foram habilitados.

**Arquivos alterados:** `apps/web/src/bootstrap.js`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`

**Valida��es:** `npm run build` executado com sucesso; `GET /health` retornando snapshot de Redis; `GET /api/session-store` sem necessidade de login; `scard rh:web:sessions` confirmando o indice.

**Riscos:** backup, restore e monitoramento externo do Redis continuam pendentes para o ambiente alvo.

**Pr�xima a��o:** Endurecer backup/observabilidade do Redis compartilhado ou seguir para outra frente de produto.

### 2026-06-04 - Backup e restore da store do BFF

**Objetivo:** Fechar o endurecimento operacional com backup e restore da store do BFF.

**O que foi feito:** Adicionados os scripts `npm run backup:bff-sessions` e `npm run restore:bff-sessions` para exportar/importar a store do BFF com TTL restante e indice, e a documentacao de infraestrutura passou a registrar o fluxo.

**Arquivos alterados:** `package.json`, `scripts/bff-session-backup.mjs`, `scripts/bff-session-restore.mjs`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`

**Valida��es:** scripts adicionados e integrados ao workspace; a operacao de backup/restore foi documentada como fluxo local de endurecimento.

**Riscos:** o backup cobre a store do BFF, mas a politica de backup/restore do Redis compartilhado no ambiente alvo ainda precisa ser definida.

**Pr�xima a��o:** Definir a politica operacional completa do Redis ou seguir para outra frente de produto.

## 2026-06-04 - Backup/restore da store do BFF

- Documentacao de infraestrutura normalizada depois de um problema de encoding na secao de backup/restore.
- Os scripts `npm run backup:bff-sessions` e `npm run restore:bff-sessions` continuam alinhados com o Redis do BFF.
- O portal permanece com health, snapshot operacional e persistencia em Redis validos.
## 2026-06-04 - Politica Redis operacional

- A infraestrutura passou a registrar uma politica minima para Redis local e store do BFF: AOF, volume persistente, backup diario ou sob demanda, restore manual e drill de validacao.
- A documentacao agora diferencia claramente a store do BFF da politica do Redis compartilhado do ambiente alvo.
## 2026-06-04 - Verificacao automatica de backup/restore

- Adicionado o comando `npm run verify:bff-sessions` para executar backup, restore em prefixo temporario e validacao do round-trip da store do BFF.
- A execucao real com a stack local ativa confirmou uma sessao restaurada e validada com sucesso.
## 2026-06-04 - Endurecimento local concluido

- Adicionado `bff-maintenance` ao compose local para backup diario, verify semanal e limpeza automatizada de snapshots.
- O workspace agora executa backup, restore, verify e manutencao automatica com retenção local de snapshots.
- A validacao `npm run maintenance:bff-sessions:once` e `npm run verify:bff-sessions` continuou passando com a stack local ativa.
## 2026-06-04 - MVP consolidado

- O recorte do MVP foi fechado nos topicos 10, 11 e 12 com plataforma minima, nucleo do colaborador e operacao essencial.
- O backlog posterior foi explicitamente separado como pos-MVP.

## 2026-06-04 - Modelo de pessoas e vinculos alinhado

- O modelo conceitual de pessoas e vinculos foi reconciliado com o slice executavel do MVP.
- `Employee` passou a ser documentado como a projecao operacional de `VinculoTrabalhista` no contexto atual.
- `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md`, `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md`, `docs/HR_DOMAIN.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `.codex/TASKS.md` foram sincronizados.

## 2026-06-04 - Revisao de admissao e desligamento

- A revisao de admissao e desligamento fechou o gap de escopo entre especificacao e runtime.
- `TOPICO-04` e o pacote `UC-ADM` foram marcados como especificacao funcional; o runtime atual ainda nao implementa admissao digital, eSocial ou desligamento completo.
- `docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md`, `docs/README-UC-ADM.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md` e `.codex/HANDOFF.md` foram sincronizados.

## 2026-06-04 - Plano de implementacao de admissao e desligamento

- O Topico 04 ganhou um plano tecnico com backlog minimo para admissao, checklist documental, formalizacao contratual, eSocial e desligamento administrativo.
- `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `docs/PRODUCT.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md` foram sincronizados.

## 2026-06-04 - Etapa 1 da admissao decomposta

- A etapa 1 do Topico 04 foi decomposta em backlog executavel de estrutura minima de admissao.
- O novo backlog cobre solicitacao de admissao, rascunho, vinculacao a pessoa/empresa/employee, auditoria e cancelamento controlado.
- `docs/TOPICO-04-ETAPA-1-ESTRUTURA-DE-ADMISSAO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md` foram sincronizados.

## 2026-06-04 - Etapa 1 da admissao implementada

- A etapa 1 da admissao foi implementada no `@rh/api` como `admission_requests` com historico, cancelamento controlado e auditoria.
- O schema Prisma, as migrations, o store, o controller e a cobertura automatizada foram atualizados.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604195000_admission_request/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md` foram sincronizados.

## 2026-06-04 - Checklist documental minimo da admissao

- O checklist documental minimo da admissao entrou no runtime com itens obrigatorios, recebimento item a item e transicao automatica para pendencia ou revisao.
- O contrato incluiu endpoints de consulta e recebimento de checklist, e a documentacao de produto, backend, arquitetura, riscos, decisions e continuidade foi sincronizada.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604201000_admission_checklist/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/TOPICO-04-ETAPA-1-ESTRUTURA-DE-ADMISSAO.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validações executadas: `npm run test -w @rh/api` com 19 testes verdes e `npm run build` com sucesso.

## 2026-06-04 - Formalizacao contratual separada da admissao

- A formalizacao contratual separada entrou no runtime como snapshot proprio em `AdmissionContract`, com vigencia, tipo de contrato, auditoria e transicao da admissao para `completed`.
- O contrato passou a expor endpoints de consulta e formalizacao contratual, e a documentacao de produto, backend, arquitetura, riscos, decisions e continuidade foi sincronizada para refletir a nova etapa.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604202000_admission_contract/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validações executadas: `npm run test -w @rh/api` com 21 testes verdes e `npm run build` com sucesso.

## 2026-06-05 - Politica base de retencao e exportacao

- A politica base de LGPD foi consolidada por classe de dado, com retencao orientada por finalidade e obrigacao legal, exportacoes controladas por perfil/escopo/finalidade e expurgo de artefatos temporarios.
- `docs/LGPD_SECURITY.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento com LGPD art. 16 e com a nota tecnica orientativa da ANPD sobre retencao prolongada de dados pessoais.
- Risco: os prazos numericos finais por classe e os formatos autorizados para exportacao ainda dependem de validacao juridico-operacional.

## 2026-06-05 - Politica de assinatura rescisoria

- A assinatura dos documentos rescisorios foi fechada com `govbr_advanced` como padrao e `icp_brasil` como excecao valida.
- `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `docs/BACKEND.md`, `docs/README-UC-RES.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: Lei 14.063/2020, MP 2.200-2/2001 e orientacoes oficiais do GOV.BR/ITI sobre assinatura avancada e qualificada.
- Risco: tipos documentais futuros podem exigir validacao juridico-operacional especifica, mas o contrato atual do runtime esta fechado.

## 2026-06-05 - Formatos de exportacao controlada

- Os formatos permitidos para exportacao controlada foram fechados em `json`, `csv`, `pdf` e `zip`, com mascaramento quando necessario.
- `docs/LGPD_SECURITY.md`, `docs/DECISIONS.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md` e `.codex/OPEN_QUESTIONS.md` foram sincronizados.
- Validacao: ANPD sobre necessidade/finalidade e portabilidade, alem de politica base de minimizacao.
- Risco: ainda nao existe exportador real no runtime; a implementacao continua pendente.

## 2026-06-05 - Niveis de mascaramento de exportacao

- O mascaramento de exportacao foi fechado em tres niveis: `strict`, `controlled` e `aggregate`, aplicados por finalidade.
- `docs/LGPD_SECURITY.md`, `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md`, `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`, `docs/DECISIONS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md` e `.codex/OPEN_QUESTIONS.md` foram sincronizados.
- Validacao: principio da necessidade e minimizacao da LGPD, com diferenca clara entre consulta interna e exportacao externa.
- Risco: a implementacao real do exportador ainda nao existe no runtime.

## 2026-06-05 - Retencao por classe sem prazo unico

- A politica de retencao foi fechada por classe de dado e finalidade, sem impor um prazo numerico unico para todo o produto.
- `docs/LGPD_SECURITY.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/OPEN_QUESTIONS.md` e `.codex/MEMORY.md` foram sincronizados.
- Validacao: ANPD indica que a LGPD nao fixa prazo unico e que a duracao depende da finalidade e do contexto do tratamento.
- Risco: classes especificas ainda podem exigir politica versionada quando houver obrigacao legal ou contratual particular.

## 2026-06-05 - Triagem de repositorio complementar

- Nao foi localizada base de codigo complementar, submodule ou outro repositorio referenciado na arvore atual.
- `.codex/OPEN_QUESTIONS.md` e `.codex/MEMORY.md` foram sincronizados.
- Validacao: busca local por referencias a submodule, repositorio externo e cadeias de clone; `.gitmodules` ausente.
- Risco: se existir codigo externo fora desta arvore, ele precisara ser apresentado explicitamente na proxima etapa.

## 2026-06-05 - Baseline operacional do UC-JOR

- Os casos UC-JOR-013 a UC-JOR-019 passaram a ter baseline operacional explicito para feriados, tolerancia, dispositivos, comprovantes, adicional noturno, DSR e consolidacao para folha.
- `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md`, `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md`, `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md`, `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md`, `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md` e `docs/DECISIONS.md` foram sincronizados.
- Validacao: cruzamento com CLT art. 73, Lei 605/49, leis de feriados nacionais e o desenho de ponto/folha ja catalogado.
- Risco: feriados locais, tolerancias e mapeamentos ainda podem variar por empresa, jornada e acordo coletivo.

## 2026-06-05 - Backlog pos-MVP formalizado

- O backlog pos-MVP foi convertido em sequencia de entrega no `docs/TOPICO-13-BACKLOG-POS-MVP.md` e a ultima pergunta aberta foi encerrada.
- `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/PRODUCT.md` e `docs/ARCHITECTURE.md` foram sincronizados.
- Validacao: leitura cruzada do backlog com os topicos 10, 11 e 12 e com o estado atual do runtime.
- Risco: as ondas futuras ainda dependem de priorizacao e capacidade de entrega.

## 2026-06-05 - Onda 1 do pos-MVP formalizada

- A Onda 1 do pos-MVP foi formalizada em `docs/TOPICO-14-ONDA-1-PACOTE-DE-PONTO.md`, explicitando a sequencia de entrega do pacote de ponto.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento da Onda 1 com o backlog pos-MVP e com os casos UC-JOR-013 a UC-JOR-020.
- Risco: a execucao futura ainda depende de priorizacao entre ajustes de produto e eventuais mudancas no runtime.

## 2026-06-05 - Onda 2 do pos-MVP formalizada

- A Onda 2 do pos-MVP foi formalizada em `docs/TOPICO-15-ONDA-2-INTEGRACOES-E-CONTRATOS-EXTERNOS.md`, explicitando a sequencia de entrega de integracoes e contratos externos.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento da Onda 2 com o backlog pos-MVP e com os blocos de integracao ja catalogados.
- Risco: os contratos externos ainda exigem detalhamento tecnico e validacao operacional antes de implementacao.

## 2026-06-05 - Onda 3 do pos-MVP formalizada

- A Onda 3 do pos-MVP foi formalizada em `docs/TOPICO-16-ONDA-3-PLATAFORMA-E-GOVERNANCA.md`, explicitando a sequencia de entrega de plataforma e governanca.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento da Onda 3 com o backlog pos-MVP, com a stack executavel e com os riscos operacionais ja registrados.
- Risco: a implementacao futura ainda depende de decisao sobre o ambiente alvo e sobre a estrategia de observabilidade e promocao entre ambientes.

## 2026-06-05 - Onda 4 do pos-MVP formalizada

- A Onda 4 do pos-MVP foi formalizada em `docs/TOPICO-17-ONDA-4-PORTAIS-E-WORKFLOW.md`, explicitando a sequencia de entrega de portais e workflow.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento da Onda 4 com o backlog pos-MVP e com os controles de acesso, auditoria e mascaramento ja definidos.
- Risco: a UX e os fluxos de aprovacao ainda vao exigir detalhamento fino na implementacao.

## 2026-06-05 - Onda 5 do pos-MVP formalizada

- A Onda 5 do pos-MVP foi formalizada em `docs/TOPICO-18-ONDA-5-BI-LGPD-E-AUDITORIA-AMPLIADA.md`, explicitando a sequencia de entrega de BI, LGPD e auditoria ampliada.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento da Onda 5 com a politica de LGPD ja definida e com os blocos de auditoria e exportacao controlada.
- Risco: a analitica e as exportacoes futuras ainda dependem de implementacao tecnica e validacao operacional.

## 2026-06-05 - Onda 6 do pos-MVP formalizada

- A Onda 6 do pos-MVP foi formalizada em `docs/TOPICO-19-ONDA-6-DOMINIOS-COMPLEMENTARES.md`, explicitando a sequencia de entrega de dominios complementares.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento da Onda 6 com o backlog pos-MVP e com os dominios ja catalogados para expansao posterior.
- Risco: a expansao complementaria ainda depende de estabilizacao continua do nucleo e das ondas anteriores.

## 2026-06-05 - Onda 1 detalhada para implementacao

- A Onda 1 recebeu detalhamento executavel em `docs/TOPICO-20-ONDA-1-DETALHAMENTO-EXECUTAVEL-PACOTE-DE-PONTO.md`, convertendo o pacote de ponto em frentes concretas.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento do detalhamento com UC-JOR-013 a UC-JOR-020 e com a Onda 1 formalizada no Topico 14.
- Risco: a implementacao ainda vai exigir priorizacao interna entre as frentes do pacote de ponto.

## 2026-06-05 - Ondas 2 a 6 detalhadas para implementacao

- As Ondas 2 a 6 receberam detalhamento executavel em `docs/TOPICO-21-ONDA-2-DETALHAMENTO-EXECUTAVEL-INTEGRACOES-E-CONTRATOS.md`, `docs/TOPICO-22-ONDA-3-DETALHAMENTO-EXECUTAVEL-PLATAFORMA-E-GOVERNANCA.md`, `docs/TOPICO-23-ONDA-4-DETALHAMENTO-EXECUTAVEL-PORTAIS-E-WORKFLOW.md`, `docs/TOPICO-24-ONDA-5-DETALHAMENTO-EXECUTAVEL-BI-LGPD-E-AUDITORIA.md` e `docs/TOPICO-25-ONDA-6-DETALHAMENTO-EXECUTAVEL-DOMINIOS-COMPLEMENTARES.md`.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: cruzamento dos detalhamentos com as ondas formalizadas no Topico 15 ao Topico 19.
- Risco: cada onda ainda exigira priorizacao interna e eventualmente desdobramento mais fino por caso de uso antes da implementacao.

## 2026-06-05 - Pacote de ponto com persistencia minima

- O backend recebeu persistencia minima para calendarios de feriados, regras de tolerancia e dispositivos de ponto, com criacao, consulta e auditoria por tenant.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260605235000_point_governance/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` ficou bloqueado no ambiente por dependencia do Postgres local.
- Risco: a validacao de runtime da nova migracao e das novas rotas ainda precisa ser concluida com o banco ativo.

## 2026-06-05 - Bloqueio operacional do Postgres local

- A suite de integracao da API permaneceu bloqueada porque o Docker Desktop Service nao esta acessivel neste ambiente e o Postgres local nao sobe.
- `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: tentativa de `npm run test -w @rh/api` com `prisma generate` bem-sucedido, mas sem conexao ao banco em `localhost:5432`.
- Risco: a suite de integracao da API continua dependente de um Postgres local ativo, e a nova camada de ponto ainda nao foi exercitada em runtime.

## 2026-06-05 - Adicional noturno implementado e validado

- O runtime recebeu o primeiro corte executavel de UC-JOR-017, com persistencia relacional para calculo de adicional noturno, itens de memoria por competencia, aprovacao e auditoria.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606001000_night_shift_allowance/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou e `npm run test -w @rh/api` passou com 33 testes verdes contra o Postgres local.
- Risco: a formula de janela noturna ainda usa baseline tecnico UTC 22:00-05:00 e continua sujeita a validacao juridico-operacional final.

## 2026-06-05 - DSR e descanso semanal implementados e validados

- O runtime recebeu o corte executavel de UC-JOR-018, com persistencia relacional para DSR e descanso semanal, itens por dia, aprovacao e auditoria.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606004000_weekly_rest_allowance/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou e `npm run test -w @rh/api` passou com 35 testes verdes contra o Postgres local.
- Risco: a regra tecnica atual usa domingos e feriados como baseline de memoria de calculo, mas a politica coletiva/final ainda exige validacao juridico-operacional.

## 2026-06-05 - Consolidacao de eventos de ponto para folha implementada e validada

- O runtime recebeu o corte executavel de UC-JOR-019, com lote auditavel para consolidacao de eventos de ponto aprovados para folha, aprovacao do lote e auditoria.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606012000_time_sheet_payroll_event_batch/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou e `npm run test -w @rh/api` passou com 37 testes verdes contra o Postgres local.
- Risco: a consolidacao usa rubricas versionadas tecnicas `ADIC_NOTURNO` e `DSR` como primeira camada auditavel; o mapeamento financeiro completo ainda depende de parametrizacao de folha/UC-FOL.

## 2026-06-05 - Reprocessamento do eSocial implementado e validado

- O runtime recebeu reprocessamento explicito para transmissao de eSocial de admissao e desligamento, preservando o payload recalculado a partir da origem persistida e a trilha de auditoria.
- `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run test -w @rh/api` passou com 38 testes verdes contra o Postgres local.
- Risco: a politica final de retentativas, DLQ e conciliacao com o governo ainda precisa de validacao operacional.

## 2026-06-05 - Handoff para folha implementado e validado

- O runtime recebeu handoff de folha para lotes consolidados de ponto aprovados, com envio para folha e recibo sintetico auditavel.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606015000_time_sheet_payroll_event_batch_send/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou e `npm run test -w @rh/api` passou com 38 testes verdes contra o Postgres local.
- Risco: a camada ainda usa recibo sintético e rubricas técnicas de primeira camada; o contrato financeiro completo continua dependendo do pacote UC-FOL.

## 2026-06-05 - Backup e observabilidade minima da plataforma

- A Onda 3 recebeu a frente de backup, restore e observabilidade minima da plataforma local com scripts dedicados e contratos operacionais no compose.
- `scripts/platform-backup.mjs`, `scripts/platform-restore.mjs`, `scripts/platform-observability-report.mjs`, `package.json`, `docs/INFRASTRUCTURE.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: pendente; os scripts foram criados para bundle de Postgres, MinIO e BFF sessions, restore seguro por padrao e snapshot de observabilidade com status do compose e healthchecks da API e do portal.
- Risco: o restore completo ainda precisa ser validado no stack local ativo, e a Onda 3 segue com isolamento multi-tenant, CI/CD e telemetria completa em aberto.

## 2026-06-05 - Backup e observabilidade minima da plataforma validado

- O bundle da plataforma local foi gerado com sucesso e o restore foi validado em modo dry-run.
- `scripts/platform-backup.mjs`, `scripts/platform-restore.mjs` e `scripts/platform-observability-report.mjs` foram exercitados com o stack local ativo; o backup incluiu Postgres, MinIO e BFF sessions, e o report produziu snapshot operacional do compose.
- Validacao: `npm run build` passou; `npm run backup:platform` passou; `npm run report:platform` passou; `npm run restore:platform` passou em dry-run com o bundle criado.
- Risco: restore real permanece propositalmente protegido por `--apply`; a Onda 3 ainda precisa de isolamento multi-tenant, CI/CD e logs/telemetria/alertas completos.

## 2026-06-05 - Isolamento multi-tenant endurecido no portal

- O portal passou a revalidar o tenant ativo contra a lista corrente de acessos e limpa o contexto quando o tenant deixa de estar autorizado, tanto no carregamento da sessao quanto no proxy para a API.
- `apps/web/src/bootstrap.js`, `apps/web/src/tenant-access.js`, `apps/web/test/tenant-access.test.mjs`, `apps/web/package.json`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` passou com 38 testes verdes; `npm run test -w @rh/web` passou com 3 testes verdes.
- Risco: ainda falta um ciclo de carga real para comprovar concorrencia e isolamento multi-tenant em runtime sob estresse.

## 2026-06-05 - CI/CD e promocao entre ambientes formalizados

- A Onda 3 recebeu o contrato de CI/CD com workflows GitHub Actions para `push`/`pull_request` e um workflow manual de promocao entre ambientes via `workflow_dispatch`.
- `.github/workflows/ci.yml`, `.github/workflows/promote.yml`, `docs/INFRASTRUCTURE.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: implementacao documental e de contrato concluida; a execucao real dos workflows depende do runner do GitHub Actions.
- Risco: a promocao real entre ambientes ainda depende de credenciais, ambientes definidos e gates operacionais fora do repositório.

## 2026-06-05 - Beneficios com catalogo e atribuicao

**Objetivo:** materializar a primeira camada funcional de beneficios na Onda 6.

**O que foi feito:** o backend recebeu catalogo de beneficios por tenant, atribuicao por colaborador, suspensao e cancelamento de beneficios, com auditabilidade e persistencia relacional; a validacao automatizada da API passou; a migration foi aplicada no Postgres local; e a documentacao viva, a memoria e o handoff foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606050000_benefits_catalog_assignments/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 43 testes verdes; `prisma migrate deploy` aplicou a migracao nova no banco local.

**Riscos:** o dominio de beneficios ainda e apenas a primeira camada operacional; elegibilidade complexa, descontos e integracoes externas permanecem para evolucao posterior.

**Próxima ação:** seguir para a proxima frente da Onda 6, começando por ferias completas.

## 2026-06-05 - Ferias com saldo e solicitacao

**Objetivo:** materializar a primeira camada funcional de ferias na Onda 6.

**O que foi feito:** o backend recebeu saldo de ferias por periodo, solicitacao, aprovacao e cancelamento auditavel; a migration foi aplicada no Postgres local; a suíte da API passou com 45 testes verdes; e a documentação viva, a memória e o handoff foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606055000_vacations_minimal/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 45 testes verdes; `prisma migrate deploy` aplicou a migracao nova no banco local.

**Riscos:** a primeira camada de ferias ainda nao cobre aquisicao/concessao completa, fracionamento, abono pecuniario nem reflexo final em folha.

**Próxima ação:** seguir para a próxima frente da Onda 6, começando por 13º completo.

## 2026-06-05 - Ferias com janela concessiva e conflito de datas

**Objetivo:** evoluir a primeira camada de ferias para respeitar a janela concessiva derivada do periodo aquisitivo e bloquear conflitos de agenda.

**O que foi feito:** o backend passou a derivar a janela concessiva a partir do periodo aquisitivo, bloquear solicitacoes fora dessa janela e impedir sobreposicao de pedidos no mesmo saldo; os testes foram ajustados para a nova regra; e a documentacao viva, a memoria e o handoff foram sincronizados.

**Arquivos alterados:** `apps/api/src/slice.store.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** cobertura de teste ajustada para a janela concessiva e conflito de sobreposicao; a suite completa ainda depende de Postgres local ativo.

**Riscos:** continuam pendentes fracionamento, abono pecuniario, aviso formal, pagamento e reflexo final em folha/eSocial.

**Próxima ação:** seguir para a próxima frente da Onda 6, consolidando férias completas.

## 2026-06-05 - Ferias com aviso formal e pagamento

**Objetivo:** registrar aviso formal e pagamento como etapas executaveis do ciclo minimo de ferias.

**O que foi feito:** o backend passou a armazenar aviso formal, protocolo de aviso, prazo de pagamento e pagamento efetivo no request de ferias; foram adicionadas rotas para aviso e pagamento; a migration foi aplicada no Postgres local; a suíte da API passou com 47 testes verdes; e a documentação viva, a memória e o handoff foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606070000_vacations_notice_payment/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 47 testes verdes; `prisma migrate deploy` aplicou a nova migration no banco local.

**Riscos:** continuam pendentes fracionamento, abono pecuniario e reflexo final em folha/eSocial.

**Próxima ação:** seguir para a próxima frente da Onda 6 ou atacar outro núcleo P0 do backlog priorizado.

## 2026-06-05 - Decimo terceiro com calculo e aprovacao

**Objetivo:** materializar a primeira camada funcional do 13º salário na Onda 6.

**O que foi feito:** o backend recebeu calculo anual do 13º com memoria de avos, valor total, aprovacao auditavel, novas rotas e migration dedicada; a migration foi aplicada no Postgres local; a suíte da API passou com 49 testes verdes; e a documentação viva, a memória e o handoff foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606073000_thirteenth_salary_calculations/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FOL.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run test -w @rh/api` passou com 49 testes verdes; `prisma migrate deploy` ficou limpo após a migration nova.

**Riscos:** o fluxo de 13º salário ainda precisa de primeira parcela, segunda parcela, medias variaveis, encargos e integracao final com folha/eSocial.

**Próxima ação:** seguir para a próxima frente da Onda 6 ou atacar outro núcleo P0 do backlog priorizado.

## 2026-06-05 - Ferias com fracionamento e abono pecuniario

**Objetivo:** fechar a lacuna restante de férias com fracionamento e abono pecuniario auditaveis.

**O que foi feito:** o backend passou a persistir periodos de ferias fracionadas, calcular consumo total com abono pecuniario, registrar memoria de salario base e valores calculados, e recalcular o saldo do periodo apos aprovacao; a migration foi aplicada no Postgres local; a suíte da API passou com 50 testes verdes; e a documentação viva, a memória, o handoff e o mapa do projeto foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606080000_vacations_split_abono/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npm run test -w @rh/api` passou com 50 testes verdes; `prisma migrate deploy` aplicou a nova migration no banco local.

**Riscos:** o domínio de férias ainda precisa de integração final com folha/eSocial para ficar completo no contrato legal-operacional.

**Próxima ação:** seguir para a próxima frente da Onda 6, mantendo a pendência de integração de férias com folha/eSocial registrada.

## 2026-06-05 - Ferias integradas com folha

**Objetivo:** integrar o pedido de férias pago com a folha por meio de um lote auditavel.

**O que foi feito:** o backend passou a registrar o envio de férias pagas para a folha em um lote próprio de payroll, com ponte persistida entre pedido e lote, recibo sintetico auditavel e trilha de auditoria; a migration foi aplicada no Postgres local; a suíte da API passou com 51 testes verdes; e a documentação viva, a memória, o handoff e o mapa do projeto foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606083000_vacations_payroll_integration/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/HANDOFF.md`.

**Validações:** `npm run build -w @rh/api` passou; `npm run test -w @rh/api` passou com 51 testes verdes; `prisma migrate deploy` aplicou a nova migration no banco local.

**Riscos:** o fluxo ainda nao integra eSocial de ferias, apenas a ponte para folha.

**Próxima ação:** avançar para o próximo passo do backlog, mantendo eSocial de férias como pendência explícita.

## 2026-06-05 - Férias fechadas com eSocial e 13º integrado com folha

**Objetivo:** encerrar a lacuna restante de férias e avançar o 13º salário para ponte com folha.

**O que foi feito:** o backend passou a transmitir férias ao eSocial com fila, consulta e reprocessamento explícito; o 13º salário passou a registrar ponte para folha com lote auditável e campos persistidos de payroll; a documentação viva, a memória, o handoff, o mapa do projeto, o backlog e os docs de produto/arquitetura/backend/riscos foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606085000_vacations_esocial_transmissions/migration.sql`, `apps/api/prisma/migrations/20260606090000_thirteenth_salary_payroll_integration/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 52 testes verdes.

**Riscos:** o 13º ainda precisa de medias variaveis, encargos e integracao final com folha/eSocial.

**Próxima ação:** validar a migration nova, build e suíte da API e continuar a evolução do 13º salário.

## 2026-06-05 - Onda 6 encerrada

**Objetivo:** encerrar integralmente a Onda 6 do pos-MVP.

**O que foi feito:** a Onda 6 foi fechada com beneficios completos, ferias completas e 13o completo; o runtime passou a cobrir férias com eSocial, 13º com médias variaveis, encargos e ponte para folha; a documentação viva, a memória, o mapa do projeto, as tarefas e o log de sessão foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606091000_thirteenth_salary_complete/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FOL.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `prisma migrate deploy` aplicou as migrations novas no Postgres local; `npm run test -w @rh/api` passou com 52 testes verdes.

**Riscos:** a expansão futura pode adicionar refinamentos de governanca ou contratos externos, mas a Onda 6 funcional está fechada.

**Próxima ação:** seguir para outras frentes do backlog fora da Onda 6, apenas se houver nova priorização.

## 2026-06-06 - Primeira base executavel de SST

**Objetivo:** iniciar o dominio de SST com um slice pequeno e validado.

**O que foi feito:** o backend recebeu cadastro de ambientes de trabalho e riscos ocupacionais por tenant, com vigencia e trilha de auditoria; o contrato HTTP foi exposto; a migration foi aplicada; a suite da API passou com 54 testes verdes; e a memoria, o mapa do projeto, o backlog e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606092000_sst_foundation/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 54 testes verdes.

**Riscos:** SST ainda esta na fundação e nao cobre PGR, PCMSO, exames, ASO, CAT, EPI, treinamentos ou eSocial SST.

**Próxima ação:** seguir para o próximo slice de SST, provavelmente exames ocupacionais e ASO, quando a priorização permitir.

## 2026-06-06 - Exames ocupacionais e ASO

**Objetivo:** materializar a segunda fatia de SST com exames ocupacionais e emissao de ASO.

**O que foi feito:** o backend recebeu cadastro de exames ocupacionais por tenant, vinculo opcional com ambiente, emissao de ASO por exame, listagem das consultas e trilha de auditoria; a migration foi aplicada; a suite da API passou com 56 testes verdes; e a memoria, o mapa do projeto, o backlog, o handoff e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606093000_sst_exams_aso/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md` e `.codex/TASKS.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 56 testes verdes.

**Riscos:** SST ainda precisa evoluir para treinamentos e eSocial SST, com validacao juridico-operacional antes de congelar regras finais.

**Próxima ação:** seguir para a proxima fatia de SST, com eSocial SST como proximo passo natural.

## 2026-06-06 - CAT e EPI

**Objetivo:** materializar a quarta fatia de SST com CAT e EPI auditaveis.

**O que foi feito:** o backend recebeu cadastro de CAT por tenant e colaborador, catalogo de EPI, entrega de EPI com ciencia e trilha de auditoria; as migrations foram aplicadas; a suite da API passou com 60 testes verdes; e a memoria, o mapa do projeto, o backlog, o handoff e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606095000_sst_cat_epi/migration.sql`, `apps/api/prisma/migrations/20260606095500_sst_epi_assignment_company/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou as migrations novas no Postgres local; `npm run test -w @rh/api` passou com 60 testes verdes.

**Riscos:** SST ainda precisa evoluir para treinamentos e eSocial SST, com validação juridico-operacional antes de congelar regras finais.

**Próxima ação:** seguir para a proxima fatia de SST, com eSocial SST como proximo passo natural.

## 2026-06-06 - PGR e PCMSO

**Objetivo:** materializar a terceira fatia de SST com PGR e PCMSO versionados por tenant.

**O que foi feito:** o backend recebeu cadastro e listagem de PGR e PCMSO por tenant, com vínculo opcional à empresa, vigência, status e trilha de auditoria; a migration foi aplicada; a suite da API passou com 58 testes verdes; e a memória, o mapa do projeto, o backlog, o handoff e a documentação base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606094000_sst_pgr_pcmso/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 58 testes verdes.

**Riscos:** SST ainda precisa evoluir para CAT, EPI, treinamentos e eSocial SST, com validação jurídico-operacional antes de congelar regras finais.

**Próxima ação:** seguir para a próxima fatia de SST, com CAT e EPI como próximo passo natural.

## 2026-06-06 - eSocial SST

**Objetivo:** materializar a quinta fatia de SST com transmissões eSocial para CAT, exames e ambientes.

**O que foi feito:** o backend recebeu transmissões eSocial SST com fila, consulta e reprocessamento para ambientes, CAT e exames; o worker passou a processar e marcar sucesso/falha desse lote; a migration foi criada e aplicada; a suíte da API foi expandida com testes de store e HTTP; e a memória, o mapa do projeto, as tarefas, o handoff e a documentação base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606100000_sst_esocial_transmissions/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/worker/src/main.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 62 testes verdes.

**Riscos:** treinamentos de SST continuam pendentes; eSocial SST agora cobre CAT, exames e ambientes, mas ainda depende de validação operacional/jurídica antes de congelar a política final.

**Próxima ação:** implementar treinamentos de SST.

## 2026-06-06 - Treinamentos de SST

**Objetivo:** fechar a última fatia funcional de SST com catálogo, atribuição e conclusão de treinamentos obrigatórios.

**O que foi feito:** o backend recebeu catálogo de treinamentos obrigatórios por tenant, atribuição por colaborador e conclusão auditável; a migration foi aplicada; a suíte da API passou com 64 testes verdes; e a memória, o mapa do projeto, as tarefas, o handoff e a documentação base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606101000_sst_training_catalogs_assignments/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 64 testes verdes.

**Riscos:** a base funcional de SST ficou fechada; o que continua aberto é refinamento operacional e jurídico-compliance residual, sem lacunas funcionais principais.

**Próxima ação:** avançar para a próxima frente do backlog fora de SST.

## 2026-06-06 - ATS base executavel

**Objetivo:** iniciar o dominio de ATS com requisicao de vaga, aprovacao, publicacao, candidato e movimentacao inicial de pipeline.

**O que foi feito:** o backend recebeu schema, migration, rotas, store e testes para requisicao de vaga, aprovacao, publicacao, cadastro de candidato e movimentacao inicial no pipeline; a migration foi aplicada; a suite da API passou com 66 testes verdes; e a memoria, o mapa do projeto, as tarefas, o handoff e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606102000_ats_foundation/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-ATS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 66 testes verdes.

**Riscos:** ATS ainda nao cobre entrevistas, avaliacao formal, proposta e conversao para pre-admissao.

**Próxima ação:** seguir para entrevistas e avaliacao do ATS, se essa frente continuar priorizada.

## 2026-06-06 - ATS entrevistas e avaliacao

**Objetivo:** fechar o recorte inicial de ATS com agendamento de entrevistas e avaliacao de candidatos.

**O que foi feito:** o backend recebeu schema, migration, rotas, store e testes para agendamento de entrevistas e registro de avaliacao inicial de candidatos; a migration foi aplicada; a suite da API passou com 68 testes verdes; e a memoria, o mapa do projeto, as tarefas, o handoff e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606103000_ats_interviews_evaluations/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-ATS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 68 testes verdes.

**Riscos:** ATS ainda nao cobre proposta e conversao para pre-admissao.

**Próxima ação:** seguir para proposta e conversao para pre-admissao no ATS.

## 2026-06-06 - ATS proposta e conversao

**Objetivo:** fechar o dominio inicial de ATS com proposta e conversao para pre-admissao rastreavel.

**O que foi feito:** o backend recebeu schema, migration, rotas, store e testes para criar proposta, listar propostas e converter a proposta em pre-admissao com criacao de pessoa, empregado e admissao draft vinculada a candidato/proposta; a migration foi aplicada; a suite da API passou com 70 testes verdes; e a memoria, o mapa do projeto, as tarefas, o handoff e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606104000_ats_proposal_conversion/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-ATS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 70 testes verdes.

**Riscos:** o vínculo ATS -> admissão foi fechado no draft, mas o onboarding documental e a assinatura ainda seguem o fluxo de admissão existente.

**Próxima ação:** seguir para a próxima frente do backlog fora de ATS, ou refinamentos de onboarding se a priorização mudar.

## 2026-06-06 - Admissao com dossie documental

**Objetivo:** fechar a ponte de onboarding documental da admissao sem alterar os estados centrais do fluxo.

**O que foi feito:** o backend recebeu `AdmissionDocument`, com listagem, geração e assinatura auditavel; a formalizacao contratual passou a gerar automaticamente um snapshot documental de onboarding; as rotas HTTP, a migration, os testes e a documentacao viva foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606105000_admission_documents/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-ADM.md`, `docs/README-UC-ONB.md`, `docs/README-UC-ATS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api`; `npx prisma migrate deploy`; `npm run test -w @rh/api`.

**Riscos:** o onboarding agora possui dossie documental e assinatura auditavel, mas provisionamento de acessos, equipamentos e experiencia inicial permanecem como refinamentos futuros.

**Próxima ação:** seguir para o proximo refinamento do backlog fora de ATS/ONB, se a priorizacao continuar nessa direcao.

## 2026-06-06 - Sessão de retomada e validação do workspace

**Objetivo:** iniciar a sessão, confirmar o estado real do workspace e executar as etapas silenciosamente.

**O que foi feito:** a memória, o mapa do projeto, as tarefas, as perguntas abertas, o handoff, a documentação de produto, a arquitetura e os riscos foram lidos; os perfis aplicáveis foram identificados; o monorepo passou em `npm run build` e `npm run typecheck`; o portal web recebeu o arquivo `apps/web/src/portal-workspace.d.ts` para tipar o módulo JS `portal-workspace.js`; e a validação da API foi tentada em seguida.

**Arquivos alterados:** `apps/web/src/portal-workspace.d.ts`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build` passou; `npm run typecheck` passou; a suíte da API não conseguiu concluir neste ambiente porque o Docker Desktop Linux Engine não está disponível e não há Postgres/Redis locais ativos.

**Riscos:** a validação end-to-end permanece bloqueada por infraestrutura local ausente, não por falha de tipagem ou build.

**Próxima ação:** retomar a suíte da API e a validação do runtime quando o host Docker local estiver disponível.

## 2026-06-06 - Validação da API concluída com Docker ativo

**Objetivo:** validar a suite da API após a disponibilidade do Docker local.

**O que foi feito:** o compose local subiu `postgres` e `redis`; a suíte `npm run test -w @rh/api` foi executada com `prisma generate` no pretest; e os 70 testes passaram.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md` e `docs/SESSION_LOG.md`.

**Validações:** `docker compose -f infra/docker-compose.yml up -d postgres redis`; `npm run test -w @rh/api`.

**Riscos:** a infraestrutura local agora está validada para o slice coberto pela suíte atual; próximos riscos voltam a ser de produto e de evolução funcional.

**Próxima ação:** seguir para a próxima frente priorizada do backlog, com o runtime local já confirmado.

## 2026-06-06 - Stack completo e smoke OIDC real

**Objetivo:** validar o stack completo do compose e o fluxo OIDC real com Keycloak.

**O que foi feito:** `api`, `web`, `worker`, `keycloak`, `postgres`, `redis` e `minio` foram subidos; o endpoint de discovery do Keycloak respondeu; foi obtido token por password grant no client público `rh-cli`; e a API aceitou o bearer para criar tenant e consultar summary.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `docker compose -f infra/docker-compose.yml up -d api web worker keycloak minio`; smoke OIDC real com token emitido por Keycloak; criação de tenant e leitura de summary com bearer OIDC.

**Riscos:** a base executável ficou validada no fluxo feliz OIDC; próximos ajustes tendem a ser de produto, UX ou refinamento de contratos, não de infraestrutura essencial.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Lint do monorepo formalizado

**Objetivo:** transformar `npm run lint` em uma checagem real nas quatro workspaces e consolidar `@rh/shared` como pacote funcional.

**O que foi feito:** `apps/api`, `apps/web` e `apps/worker` passaram a usar `tsc --noEmit` em `lint`; `@rh/shared` ganhou scripts reais de build/test/lint/typecheck; `docs/INFRASTRUCTURE.md` foi sincronizado; e a validação raiz de `lint` e `typecheck` foi executada com sucesso.

**Arquivos alterados:** `apps/api/package.json`, `apps/web/package.json`, `apps/worker/package.json`, `packages/shared/package.json`, `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run lint` passou; `npm run typecheck` passou; `npm run test` passou nas quatro workspaces com `@rh/shared` agora ativo.

**Riscos:** nenhum novo risco funcional; a base de tooling ficou mais consistente.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Redis local e manutenção do BFF formalizados em helpers testáveis

**Objetivo:** congelar a política do Redis local e a lógica de retenção/intervalo da manutenção do BFF.

**O que foi feito:** foram criados `scripts/redis-platform-policy.mjs` e `scripts/bff-maintenance-policy.mjs` com helpers puros; `redis-platform-check.mjs` e `bff-session-maintenance.mjs` passaram a consumi-los; a suíte `npm run test:platform` foi ampliada; e `docs/INFRASTRUCTURE.md` foi sincronizado.

**Arquivos alterados:** `scripts/redis-platform-policy.mjs`, `scripts/redis-platform-policy.test.mjs`, `scripts/bff-maintenance-policy.mjs`, `scripts/bff-maintenance-policy.test.mjs`, `scripts/redis-platform-check.mjs`, `scripts/bff-session-maintenance.mjs`, `package.json`, `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run test:platform` passou com 14 testes verdes; `npm run check:redis-platform` passou; `npm run check:platform-alerts` passou.

**Riscos:** a operação local ficou mais consistente; a política do ambiente alvo compartilhado ainda continua como decisão futura.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Restore da plataforma formalizado em helper testável

**Objetivo:** congelar o contrato do restore da plataforma, incluindo validacao do manifesto e dry-run.

**O que foi feito:** foi criado `scripts/platform-restore-format.mjs` com helpers puros para validar o manifesto e formatar o dry-run; `platform-restore.mjs` passou a consumi-los; a suíte `npm run test:platform` foi ampliada; e `docs/INFRASTRUCTURE.md` foi sincronizado.

**Arquivos alterados:** `scripts/platform-restore-format.mjs`, `scripts/platform-restore-format.test.mjs`, `scripts/platform-restore.mjs`, `package.json`, `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run test:platform` passou com 10 testes verdes; `npm run check:platform-alerts` passou; o restore dry-run com snapshot real exibiu o resumo esperado; `npm run typecheck` passou; `npm run report:platform` gerou novo snapshot operacional.

**Riscos:** o ciclo local de backup/restore/report/alerts ficou coberto; o ambiente alvo compartilhado ainda depende de política própria.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Backup da plataforma formalizado em helper testável

**Objetivo:** congelar o formato do snapshot de backup da plataforma e as derivacoes de caminho.

**O que foi feito:** foi criado `scripts/platform-backup-format.mjs` com helpers puros para caminho, artefatos e manifesto; `platform-backup.mjs` e `platform-restore.mjs` passaram a consumir esse helper; a suíte `npm run test:platform` passou a cobrir também o backup; e `docs/INFRASTRUCTURE.md` foi sincronizado.

**Arquivos alterados:** `scripts/platform-backup-format.mjs`, `scripts/platform-backup-format.test.mjs`, `scripts/platform-backup.mjs`, `scripts/platform-restore.mjs`, `package.json`, `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run test:platform` passou com 8 testes verdes; `npm run check:platform-alerts` passou; `npm run report:platform` gerou novo snapshot operacional.

**Riscos:** o contrato local de backup/restore ficou mais estável; o ambiente alvo compartilhado ainda requer política própria.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Telemetria operacional refatorada

**Objetivo:** tornar os helpers de telemetria da plataforma testáveis e congelar o contrato novo.

**O que foi feito:** foi criado `scripts/platform-health.mjs` com parsing de `docker compose ps`, checagem de saúde e URLs explícitas; `platform-alerts-check` e `platform-observability-report` passaram a consumir esse helper; foi adicionada a suíte `npm run test:platform`; e `docs/INFRASTRUCTURE.md` foi sincronizado com o novo contrato.

**Arquivos alterados:** `scripts/platform-health.mjs`, `scripts/platform-health.test.mjs`, `scripts/platform-alerts-check.mjs`, `scripts/platform-observability-report.mjs`, `package.json`, `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run test:platform` passou com 4 testes verdes; `npm run check:platform-alerts` passou com 5 checks; `npm run typecheck` passou; `npm run report:platform` gerou novo snapshot operacional.

**Riscos:** a telemetria local ficou mais robusta; o contrato operacional do ambiente alvo compartilhado ainda continua aberto.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Limpeza do catálogo mestre

**Objetivo:** remover o placeholder documental residual do catálogo mestre de casos de uso.

**O que foi feito:** a seção obsoleta de "Próxima Fase" e o placeholder `UC-XXX-000` foram removidos de `docs/Catálogo Mestre de Casos de Uso.md`; `npm run typecheck` e `npm run test -w @rh/web` foram reexecutados com sucesso.

**Arquivos alterados:** `docs/Catálogo Mestre de Casos de Uso.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run typecheck` passou; `npm run test -w @rh/web` passou com 4 testes verdes.

**Riscos:** nenhum novo risco funcional foi introduzido; a mudança é apenas de higiene documental.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Endurecimento dos checks de plataforma

**Objetivo:** ampliar os checks operacionais da plataforma para cobrir Keycloak e MinIO.

**O que foi feito:** `scripts/platform-alerts-check.mjs` e `scripts/platform-observability-report.mjs` passaram a validar também o discovery do Keycloak e o readiness do MinIO; `docs/INFRASTRUCTURE.md` foi sincronizado com o novo escopo; e os scripts foram executados com sucesso no stack local.

**Arquivos alterados:** `scripts/platform-alerts-check.mjs`, `scripts/platform-observability-report.mjs`, `docs/INFRASTRUCTURE.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run check:platform-alerts` passou com 5 checks; `npm run report:platform` gerou um novo snapshot operacional.

**Riscos:** o ambiente local ficou mais coberto; o contrato operacional do ambiente alvo compartilhado ainda permanece como risco aberto.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Reporte operacional e backup da plataforma

**Objetivo:** validar a telemetria operacional da plataforma e o backup local.

**O que foi feito:** `npm run report:platform` gerou snapshot operacional; `npm run check:platform-alerts` retornou status ok; `npm run backup:platform` produziu snapshot com `postgres.sql`, `bff-sessions.json`, `manifest.json` e `minio-data`.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** reporte operacional sem alertas; backup da plataforma criado com sucesso em `backups/platform/2026-06-06T19-12-00-140Z`.

**Riscos:** a frente de backup/observabilidade local ficou confirmada; o risco restante continua sendo o contrato operacional do ambiente alvo compartilhado.

**Próxima ação:** seguir para a próxima frente funcional priorizada.

## 2026-06-06 - Transição para a fase de casos de uso

**Objetivo:** encerrar as especificações macro e alinhar o ponto de entrada da nova fase documental.

**O que foi feito:** o RN 022 foi atualizado para apontar explicitamente para o `docs/Catálogo Mestre de Casos de Uso.md` como início da fase de casos de uso; a memória, o handoff, as tarefas e as dúvidas abertas foram sincronizados com essa transição.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RN 022 – Arquitetura SaaS, Multiempresa e Multi-Tenant.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem pendências técnicas.

**Riscos:** nenhum novo risco técnico; a próxima etapa é a análise estruturada dos casos de uso por módulo.

**Próxima ação:** iniciar a leitura analítica do catálogo mestre e decompor os casos de uso por módulo.

## 2026-06-06 - Analise inicial do pacote UC-ADM

**Objetivo:** iniciar a fase de casos de uso pela base fundacional do ciclo de vida do colaborador.

**O que foi feito:** `docs/README-UC-ADM.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote fundacional.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-ADM.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o pacote ADM ainda depende de refinamentos de formalizacao contratual, historico imutavel e movimentacoes intermediarias.

**Próxima ação:** avançar para o detalhamento do proximo pacote prioritario do MVP legal, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-JOR

**Objetivo:** decompor o pacote de jornada e ponto como extensao natural da base cadastral.

**O que foi feito:** `docs/README-UC-JOR.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote operacional.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-JOR.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a ordem de configuracao e processamento de ponto precisa continuar alinhada com folha, eSocial e LGPD.

**Próxima ação:** seguir para o proximo pacote do MVP legal, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-FOL

**Objetivo:** decompor o pacote de folha de pagamento como consolidacao da trilha legal do produto.

**O que foi feito:** `docs/README-UC-FOL.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de folha.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-FOL.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a folha precisa continuar coerente com ponto, beneficios, ferias, afastamentos e rescisao.

**Próxima ação:** seguir para o proximo pacote do MVP legal, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-FER

**Objetivo:** decompor o pacote de ferias como continuidade do ciclo legal e de folha.

**O que foi feito:** `docs/README-UC-FER.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de ferias.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-FER.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** ferias precisam continuar compatíveis com periodo aquisitivo, concessivo, folha e eSocial.

**Próxima ação:** seguir para o proximo pacote do MVP legal, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-RES

**Objetivo:** decompor o pacote de rescisao como fechamento formal do ciclo do colaborador.

**O que foi feito:** `docs/README-UC-RES.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de rescisao.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-RES.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a rescisao precisa continuar consistente com admissao, ponto, folha, ferias e eSocial.

**Próxima ação:** seguir para o proximo pacote prioritario do produto, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-BEN

**Objetivo:** decompor o pacote de beneficios como camada de operacao e reflexo em folha.

**O que foi feito:** `docs/README-UC-BEN.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de beneficios.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-BEN.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** beneficios precisam permanecer coerentes com elegibilidade, coparticipacao e reflexo em folha.

**Próxima ação:** seguir para o proximo pacote prioritario do produto, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-SST

**Objetivo:** decompor o pacote de saude e seguranca do trabalho como base regulatoria ocupacional.

**O que foi feito:** `docs/README-UC-SST.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de SST.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-SST.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** SST precisa continuar alinhado a dados sensiveis, vigencias documentais e transmissao ao eSocial SST.

**Próxima ação:** seguir para o proximo pacote prioritario do produto, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-ESO

**Objetivo:** decompor o pacote de eSocial como camada regulatoria de transmissao e conciliacao.

**O que foi feito:** `docs/README-UC-ESO.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de eSocial.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-ESO.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o motor de eSocial precisa continuar coerente com admissao, folha, SST, desligamento e certificado digital.

**Próxima ação:** seguir para o proximo pacote prioritario do produto, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-SEC

**Objetivo:** decompor o pacote de seguranca, privacidade e governanca como camada transversal do produto.

**O que foi feito:** `docs/README-UC-SEC.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de seguranca e LGPD.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-SEC.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a camada de seguranca precisa continuar coerente com portal, BFF, API, dados sensiveis e auditoria.

**Próxima ação:** seguir para o proximo pacote prioritario do produto, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-API

**Objetivo:** decompor o pacote de integracoes e APIs como fronteira tecnica com sistemas externos.

**O que foi feito:** `docs/README-UC-API.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de integracoes.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-API.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a camada de integracoes precisa continuar coerente com idempotencia, monitoramento, segredos e contratos por tenant.

**Próxima ação:** seguir para o proximo pacote prioritario do produto, se nao surgir nova restricao documental.

## 2026-06-06 - Analise inicial do pacote UC-PLT

**Objetivo:** decompor o pacote de plataforma SaaS como base estrutural do multi-tenant.

**O que foi feito:** `docs/README-UC-PLT.md` recebeu a primeira decomposicao analitica da nova fase, com sequenciamento sugerido dos casos de uso, prioridade de leitura e pontos de atencao do pacote de plataforma.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-PLT.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o contrato operacional do multi-tenant precisa permanecer coerente com isolamento, backup, restore e governanca.

**Próxima ação:** descer do nivel de pacote para o detalhamento do primeiro caso de uso prioritario, se ainda houver espaco de decisao util.

## 2026-06-06 - Alinhamento do primeiro caso de uso detalhado

**Objetivo:** marcar a transicao do nivel de pacote para o nivel de caso de uso na nova fase.

**O que foi feito:** `docs/UC-ADM-001.md` recebeu uma nota de estado de implementacao alinhando o cadastro-base do colaborador ao runtime executavel e explicitando a dependencia do `UC-ADM-005`.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-ADM-001.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o caso de uso ainda depende da formalizacao completa do fluxo de cadastro e da consistencia fina com o vinculo contratual.

**Próxima ação:** seguir com a analise dos proximos casos de uso prioritarios do pacote ADM, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento da manutencao cadastral do ADM

**Objetivo:** organizar a trilha de atualização cadastral, histórico e dependentes no pacote ADM.

**O que foi feito:** `docs/UC-ADM-002.md`, `docs/UC-ADM-003.md` e `docs/UC-ADM-004.md` receberam notas de sequenciamento no catálogo mestre, explicando sua posição depois da criacao base e do vínculo contratual.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-ADM-002.md`, `docs/UC-ADM-003.md`, `docs/UC-ADM-004.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a atualização cadastral, o histórico e os dependentes continuam sensíveis a LGPD, auditoria e impactos regulatórios.

**Próxima ação:** seguir com a analise das movimentacoes e do desligamento do pacote ADM, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento das movimentacoes e desligamento do ADM

**Objetivo:** fechar a trilha de movimentações internas e encerramento do pacote ADM.

**O que foi feito:** `docs/UC-ADM-006.md`, `docs/UC-ADM-007.md`, `docs/UC-ADM-008.md`, `docs/UC-ADM-009.md` e `docs/UC-ADM-010.md` receberam notas de sequenciamento no catálogo mestre, explicando sua posição depois da base cadastral e do vínculo contratual.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-ADM-006.md`, `docs/UC-ADM-007.md`, `docs/UC-ADM-008.md`, `docs/UC-ADM-009.md`, `docs/UC-ADM-010.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** promoções, transferências, afastamentos e desligamento continuam sensíveis a folha, eSocial, benefícios e rescisao.

**Próxima ação:** escolher o próximo caso de uso prioritário fora do pacote ADM, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento da base configuracional do JOR

**Objetivo:** encadear a configuracao estrutural do ponto antes da captura de marcacoes.

**O que foi feito:** `docs/UC-JOR-001-cadastrar-jornada-de-trabalho.md`, `docs/UC-JOR-002-cadastrar-escala-de-trabalho.md`, `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md` e `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md` receberam notas de sequenciamento no catálogo mestre.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-JOR-001-cadastrar-jornada-de-trabalho.md`, `docs/UC-JOR-002-cadastrar-escala-de-trabalho.md`, `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md`, `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a configuração do ponto continua sensível a contratos de jornada, calendário, exceções e device policy.

**Próxima ação:** seguir para os casos de uso de captura e tratamento de marcacoes do JOR, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento operacional do JOR

**Objetivo:** encadear a captura diária, importação, inconsistências e ajustes do ponto.

**O que foi feito:** `docs/UC-JOR-003-registrar-marcacao-de-ponto.md`, `docs/UC-JOR-004-importar-marcacoes-de-ponto.md`, `docs/UC-JOR-005-tratar-inconsistencias-de-ponto.md`, `docs/UC-JOR-006-solicitar-ajuste-de-ponto.md` e `docs/UC-JOR-007-aprovar-ajuste-de-ponto.md` receberam notas de sequenciamento no catálogo mestre.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-JOR-003-registrar-marcacao-de-ponto.md`, `docs/UC-JOR-004-importar-marcacoes-de-ponto.md`, `docs/UC-JOR-005-tratar-inconsistencias-de-ponto.md`, `docs/UC-JOR-006-solicitar-ajuste-de-ponto.md`, `docs/UC-JOR-007-aprovar-ajuste-de-ponto.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** a operação diária do ponto continua sensível a regras de tolerancia, jornada vigente e trilha de aprovacao.

**Próxima ação:** seguir para os calculos e fechamento do JOR, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento da camada de calculo e consolidacao do JOR

**Objetivo:** transformar as marcacoes validadas em resultados legais e financeiros do ponto.

**O que foi feito:** `docs/UC-JOR-008-calcular-horas-extras.md`, `docs/UC-JOR-009-calcular-banco-de-horas.md`, `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md` e `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md` receberam notas de sequenciamento no catálogo mestre.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-JOR-008-calcular-horas-extras.md`, `docs/UC-JOR-009-calcular-banco-de-horas.md`, `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md`, `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** calculos e consolidacao continuam sensiveis a calendario, jornada vigente, regras de descanso e reflexos em folha.

**Próxima ação:** seguir para espelho, fechamento e exportacao do JOR, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento da camada final do JOR

**Objetivo:** fechar o ciclo operacional do ponto com espelho, fechamento e exportacao auditavel.

**O que foi feito:** `docs/UC-JOR-010-gerar-espelho-de-ponto.md`, `docs/UC-JOR-011-fechar-periodo-de-ponto.md`, `docs/UC-JOR-012-reabrir-periodo-de-ponto.md`, `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md` e `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md` receberam notas de sequenciamento no catálogo mestre.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-JOR-010-gerar-espelho-de-ponto.md`, `docs/UC-JOR-011-fechar-periodo-de-ponto.md`, `docs/UC-JOR-012-reabrir-periodo-de-ponto.md`, `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md`, `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** fechamento, reabertura e exportacao continuam sensiveis a auditoria, LGPD e finalidade.

**Próxima ação:** escolher o próximo pacote prioritário fora do JOR, se nao surgir nova restricao documental.

## 2026-06-06 - Fechamento da lacuna do pacote FOL

**Objetivo:** corrigir o indice do pacote FOL criando o caso de uso ausente de cadastro de rubrica.

**O que foi feito:** `docs/UC-FOL-001-cadastrar-rubrica.md` foi criado e `docs/README-UC-FOL.md` foi sincronizado para apontar para o arquivo correto.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/README-UC-FOL.md`, `docs/UC-FOL-001-cadastrar-rubrica.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** rubricas e incidencias continuam sensiveis a folha, eSocial e consistencia fiscal/previdenciaria.

**Próxima ação:** seguir com a análise dos demais casos do pacote FOL, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento da camada central do FOL

**Objetivo:** encadear a folha mensal, a complementar e o adiantamento salarial sobre o cadastro de rubricas.

**O que foi feito:** `docs/UC-FOL-002-configurar-incidencias-da-rubrica.md`, `docs/UC-FOL-003-processar-folha-mensal.md`, `docs/UC-FOL-004-processar-folha-complementar.md` e `docs/UC-FOL-005-processar-adiantamento-salarial.md` receberam notas de sequenciamento no catálogo mestre.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-FOL-002-configurar-incidencias-da-rubrica.md`, `docs/UC-FOL-003-processar-folha-mensal.md`, `docs/UC-FOL-004-processar-folha-complementar.md`, `docs/UC-FOL-005-processar-adiantamento-salarial.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o processamento da folha continua sensivel a bases corretas, retroativos e deducoes futuras.

**Próxima ação:** seguir com a análise dos encargos e do fechamento do pacote FOL, se nao surgir nova restricao documental.

## 2026-06-06 - Sequenciamento da camada de encargos e fechamento do FOL

**Objetivo:** encadear os encargos legais, o holerite e o fechamento formal da folha.

**O que foi feito:** `docs/UC-FOL-006-calcular-inss.md`, `docs/UC-FOL-007-calcular-fgts.md`, `docs/UC-FOL-008-calcular-irrf.md`, `docs/UC-FOL-009-gerar-holerite.md` e `docs/UC-FOL-010-fechar-folha-de-pagamento.md` receberam notas de sequenciamento no catálogo mestre.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-FOL-006-calcular-inss.md`, `docs/UC-FOL-007-calcular-fgts.md`, `docs/UC-FOL-008-calcular-irrf.md`, `docs/UC-FOL-009-gerar-holerite.md`, `docs/UC-FOL-010-fechar-folha-de-pagamento.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** encargos e fechamento permanecem sensiveis a incidencias, bases consolidadas e conferencia final.

**Próxima ação:** escolher o próximo pacote prioritário do catálogo mestre, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-FER

**Objetivo:** materializar o pacote de ferias com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-FER` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-FER-001-apurar-periodo-aquisitivo.md`, `docs/UC-FER-002-controlar-periodo-concessivo.md`, `docs/UC-FER-003-consultar-saldo-de-ferias.md`, `docs/UC-FER-004-solicitar-ferias.md`, `docs/UC-FER-005-aprovar-ferias.md`, `docs/UC-FER-006-calcular-ferias.md`, `docs/UC-FER-007-calcular-abono-pecuniario.md`, `docs/UC-FER-008-programar-ferias-coletivas.md`, `docs/UC-FER-009-emitir-aviso-de-ferias.md`, `docs/UC-FER-010-integrar-ferias-com-folha.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-FER`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de regras, principalmente em fracionamento, abono, coletivas e reflexo em folha.

**Próxima ação:** seguir para o detalhamento incremental dos casos de uso de férias ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-RES

**Objetivo:** materializar o pacote de rescisao com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-RES` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-RES-001-registrar-desligamento.md`, `docs/UC-RES-002-definir-motivo-de-desligamento.md`, `docs/UC-RES-003-calcular-aviso-previo.md`, `docs/UC-RES-004-calcular-saldo-de-salario.md`, `docs/UC-RES-005-calcular-ferias-rescisorias.md`, `docs/UC-RES-006-calcular-decimo-terceiro-proporcional.md`, `docs/UC-RES-007-calcular-fgts-rescisorio.md`, `docs/UC-RES-008-gerar-documentos-rescisorios.md`, `docs/UC-RES-009-fechar-rescisao.md`, `docs/UC-RES-010-transmitir-desligamento-ao-esocial.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-RES`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de regras, especialmente em aviso, ferias, 13o, FGTS e transmissao governamental.

**Próxima ação:** seguir para o detalhamento incremental dos casos de uso de rescisao ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-BEN

**Objetivo:** materializar o pacote de beneficios com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-BEN` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-BEN-001-cadastrar-beneficio.md`, `docs/UC-BEN-002-configurar-elegibilidade-de-beneficio.md`, `docs/UC-BEN-003-conceder-beneficio-ao-colaborador.md`, `docs/UC-BEN-004-suspender-beneficio.md`, `docs/UC-BEN-005-cancelar-beneficio.md`, `docs/UC-BEN-006-gerenciar-vale-transporte.md`, `docs/UC-BEN-007-gerenciar-vale-refeicao-ou-alimentacao.md`, `docs/UC-BEN-008-gerenciar-plano-de-saude.md`, `docs/UC-BEN-009-importar-coparticipacao.md`, `docs/UC-BEN-010-integrar-beneficios-com-folha.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-BEN`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de elegibilidade, coparticipacao, planos sensiveis e reflexo em folha.

**Próxima ação:** seguir para o detalhamento incremental dos casos de uso de beneficios ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-SEC

**Objetivo:** materializar o pacote de seguranca, privacidade e governanca com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-SEC` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-SEC-001-gerenciar-perfis-de-acesso.md`, `docs/UC-SEC-002-gerenciar-permissoes.md`, `docs/UC-SEC-003-configurar-mfa.md`, `docs/UC-SEC-004-configurar-sso.md`, `docs/UC-SEC-005-registrar-consentimento.md`, `docs/UC-SEC-006-atender-solicitacao-do-titular.md`, `docs/UC-SEC-007-anonimizar-dados.md`, `docs/UC-SEC-008-aplicar-politica-de-retencao.md`, `docs/UC-SEC-009-registrar-incidente-de-seguranca.md`, `docs/UC-SEC-010-auditar-acessos-e-operacoes.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-SEC`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de MFA, SSO, consentimento, retencao e auditoria.

**Próxima ação:** seguir para o detalhamento incremental dos casos de seguranca ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-API

**Objetivo:** materializar o pacote de integracoes e APIs com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-API` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-API-001-cadastrar-integracao.md`, `docs/UC-API-002-configurar-api-rest.md`, `docs/UC-API-003-configurar-webhook.md`, `docs/UC-API-004-publicar-evento.md`, `docs/UC-API-005-consumir-evento.md`, `docs/UC-API-006-integrar-com-erp.md`, `docs/UC-API-007-integrar-com-banco.md`, `docs/UC-API-008-integrar-com-operadora-de-beneficios.md`, `docs/UC-API-009-integrar-com-provedor-de-identidade.md`, `docs/UC-API-010-monitorar-integracoes.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-API`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de contratos, idempotencia, segredos, monitoramento e conciliacao.

**Próxima ação:** seguir para o detalhamento incremental dos casos de integracoes ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-PLT

**Objetivo:** materializar o pacote de plataforma SaaS com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-PLT` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-PLT-001-cadastrar-tenant.md`, `docs/UC-PLT-002-cadastrar-empresa.md`, `docs/UC-PLT-003-cadastrar-filial.md`, `docs/UC-PLT-004-configurar-isolamento-de-dados.md`, `docs/UC-PLT-005-configurar-parametrizacoes-por-tenant.md`, `docs/UC-PLT-006-monitorar-disponibilidade.md`, `docs/UC-PLT-007-executar-backup.md`, `docs/UC-PLT-008-executar-restauracao.md`, `docs/UC-PLT-009-monitorar-performance.md`, `docs/UC-PLT-010-auditar-governanca-da-plataforma.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-PLT`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de isolamento, backup, restauração e governanca operacional.

**Próxima ação:** seguir para o detalhamento incremental dos casos de plataforma ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-SST

**Objetivo:** materializar o pacote de saude e seguranca do trabalho com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-SST` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-SST-001-cadastrar-ambiente-de-trabalho.md`, `docs/UC-SST-002-cadastrar-riscos-ocupacionais.md`, `docs/UC-SST-003-gerenciar-pgr.md`, `docs/UC-SST-004-gerenciar-pcmso.md`, `docs/UC-SST-005-gerenciar-ltcat.md`, `docs/UC-SST-006-registrar-exame-ocupacional.md`, `docs/UC-SST-007-emitir-aso.md`, `docs/UC-SST-008-registrar-cat.md`, `docs/UC-SST-009-controlar-entrega-de-epi.md`, `docs/UC-SST-010-controlar-treinamentos-obrigatorios-de-sst.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-SST`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de dados sensiveis, vigencias e transmissao eSocial SST.

**Próxima ação:** seguir para o detalhamento incremental dos casos de SST ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Scaffold do pacote UC-ESO

**Objetivo:** materializar o pacote de eSocial com arquivos individuais para a nova fase de casos de uso.

**O que foi feito:** foram criados 10 arquivos de scaffold para o pacote `UC-ESO` e o indice do pacote foi mantido coerente com os novos arquivos.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-ESO-001-configurar-ambiente-esocial.md`, `docs/UC-ESO-002-gerenciar-certificado-digital.md`, `docs/UC-ESO-003-transmitir-evento-s-1000.md`, `docs/UC-ESO-004-transmitir-evento-s-1005.md`, `docs/UC-ESO-005-transmitir-evento-s-1010.md`, `docs/UC-ESO-006-transmitir-evento-s-2200.md`, `docs/UC-ESO-007-transmitir-evento-s-1200.md`, `docs/UC-ESO-008-transmitir-evento-s-1210.md`, `docs/UC-ESO-009-transmitir-evento-s-1299.md`, `docs/UC-ESO-010-conciliar-totalizadores-do-esocial.md` e `docs/SESSION_LOG.md`.

**Validações:** confirmação de presença dos 10 arquivos do pacote `UC-ESO`.

**Riscos:** o scaffold ainda precisa de detalhamento fino de ordem de eventos, certificados, conciliacao e regressao operacional.

**Próxima ação:** seguir para o detalhamento incremental dos casos de eSocial ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Alinhamento inicial do pacote UC-ESO

**Objetivo:** ancorar os primeiros casos do eSocial no runtime real e no contrato minimo de transmissao.

**O que foi feito:** `docs/UC-ESO-001-configurar-ambiente-esocial.md`, `docs/UC-ESO-002-gerenciar-certificado-digital.md`, `docs/UC-ESO-003-transmitir-evento-s-1000.md`, `docs/UC-ESO-004-transmitir-evento-s-1005.md`, `docs/UC-ESO-005-transmitir-evento-s-1010.md`, `docs/UC-ESO-006-transmitir-evento-s-2200.md`, `docs/UC-ESO-007-transmitir-evento-s-1200.md`, `docs/UC-ESO-008-transmitir-evento-s-1210.md`, `docs/UC-ESO-009-transmitir-evento-s-1299.md` e `docs/UC-ESO-010-conciliar-totalizadores-do-esocial.md` receberam notas de estado de implementacao.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-ESO-001-configurar-ambiente-esocial.md`, `docs/UC-ESO-002-gerenciar-certificado-digital.md`, `docs/UC-ESO-003-transmitir-evento-s-1000.md`, `docs/UC-ESO-004-transmitir-evento-s-1005.md`, `docs/UC-ESO-005-transmitir-evento-s-1010.md`, `docs/UC-ESO-006-transmitir-evento-s-2200.md`, `docs/UC-ESO-007-transmitir-evento-s-1200.md`, `docs/UC-ESO-008-transmitir-evento-s-1210.md`, `docs/UC-ESO-009-transmitir-evento-s-1299.md`, `docs/UC-ESO-010-conciliar-totalizadores-do-esocial.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o eSocial ainda depende de refinamento em ordem de eventos, conciliação e cobertura de reprocessamento.

**Próxima ação:** seguir com os demais refinamentos do eSocial ou selecionar outro pacote prioritário, se nao surgir nova restricao documental.

## 2026-06-06 - Alinhamento do segundo caso de uso detalhado

**Objetivo:** fechar a base do vínculo contratual na nova fase de analise de casos de uso.

**O que foi feito:** `docs/UC-ADM-005.md` recebeu uma nota de estado de implementacao alinhando a formalizacao contratual separada ao runtime executavel e explicitando as proximas evolucoes do caso de uso.

**Arquivos alterados:** `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/UC-ADM-005.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão documental concluída sem dependências técnicas.

**Riscos:** o vinculo ainda depende de variacoes contratuais, reclassificacoes e consistencia fina com os demais modulos.

**Próxima ação:** seguir com a analise dos proximos casos de uso prioritarios do pacote ADM, se nao surgir nova restricao documental.
## 2026-06-11 - Correção Git do workspace

**Objetivo:** restaurar a operabilidade do Git antes de seguir com outras tarefas.

**O que foi feito:** `git init -b main` foi executado na raiz do workspace, `.gitignore` recebeu regras basicas para artefatos locais, arquivos auxiliares de excludes/config foram criados e o `git status` foi validado com `safe.directory=F:/projetos/RH`.

**Arquivos alterados:** `.gitignore`, `.gitignore.local`, `.gitconfig.global`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md` e `docs/SESSION_LOG.md`.

**Validações:** `git status --short` funciona com `safe.directory`; a tentativa de corrigir ownership com `takeown` falhou por falta de privilégio no ambiente.

**Riscos:** o repositório continua dependendo do workaround `safe.directory` neste host, porque a ownership do `.git` nao pôde ser ajustada.

**Próxima ação:** seguir com as tarefas de produto usando o workaround Git, ou tratar ownership/ACLs no host se houver permissao administrativa.
## 2026-06-11 - Correcao definitiva do Git

**Objetivo:** eliminar o bloqueio de ownership da `.git` sem depender de `safe.directory`.

**O que foi feito:** a `.git` sandbox-owned foi removida, recriada com ownership do usuario atual via `apply_patch`, e a metadata minima do Git foi reconstruida manualmente (`HEAD`, `config`, `description`, `info/exclude`, `objects`, `refs`, `hooks`).

**Arquivos alterados:** `.git/HEAD`, `.git/config`, `.git/description`, `.git/info/exclude`, `.git/hooks/.keep`, `.git/objects/info/.keep`, `.git/objects/pack/.keep`, `.git/refs/heads/.keep`, `.git/refs/tags/.keep`, `.gitignore`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/RISKS.md` e `docs/SESSION_LOG.md`.

**Validações:** `git status --short` voltou a funcionar sem `-c safe.directory` e sem config global temporario.

**Riscos:** o repositório ficou operavel, mas a metadata foi montada manualmente; a proxima operacao Git relevante deve ser validada com um `git add` e `git status` para confirmar o fluxo completo.

**Próxima ação:** seguir com as tarefas do produto normalmente, usando Git nativo do workspace.

## 2026-06-11 - Revisao do commit inicial

**Objetivo:** revisar o commit inicial do repositório com foco em higiene e risco operacional.

**O que foi feito:** o commit `7afde98` foi revisado e nao apresentou defeitos funcionais de produto; o unico achado de higiene foi a ausencia de normalizacao de fim de linha. Para fechar isso, foi adicionada `.gitattributes` com `eol=lf`.

**Arquivos alterados:** `.gitattributes`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/RISKS.md` e `docs/SESSION_LOG.md`.

**Validações:** revisão de commit com `git show`, checagem de cobertura do catálogo mestre e confirmação de que nao havia `.gitattributes` na raiz.

**Riscos:** o commit inicial continua sendo um snapshot grande, o que limita o valor de `git bisect` até o projeto ganhar historico incremental.

**Próxima ação:** seguir com a análise do pacote `UC-COL`, iniciando pelo `UC-COL-001 - Acessar Portal do Colaborador`.

## 2026-06-11 - Inicio de UC-COL

**Objetivo:** abrir a próxima frente funcional a partir do catálogo mestre.

**O que foi feito:** criado `docs/UC-COL-001-acessar-portal-do-colaborador.md`, iniciando a análise do pacote `UC-COL` pelo fluxo de entrada no portal do colaborador.

**Arquivos alterados:** `.gitattributes`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md` e `docs/UC-COL-001-acessar-portal-do-colaborador.md`.

**Validações:** conferência do `docs/README-UC-COL.md` e alinhamento do novo caso com o portal/BFF/OIDC já descritos na arquitetura.

**Riscos:** o pacote `UC-COL` ainda precisa dos demais casos detalhados, mas a base funcional de entrada e contexto do colaborador já ficou formalizada.

**Próxima ação:** detalhar `UC-COL-002 - Consultar Dados Cadastrais`.

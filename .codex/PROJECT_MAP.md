# Mapa do projeto

## Estrutura de diretórios

- `.codex/`: memoria, tarefas, perguntas abertas e handoff.
- `docs/`: especificacao de produto, dominio, arquitetura, riscos, testes e casos de uso.
- `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`: revisao critica do UC-JOR e inicio do UC-FOL.
- `docs/MATRIZ-TECNICA-ESBOCO.md`: matriz tecnica para evolucao do esboço e definicao de prioridades.
- `docs/TOPICO-01-FUNDACAO-DA-PLATAFORMA.md`: fundacao tecnica da plataforma.
- `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md`: modelo de dados central da plataforma.
- `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md`: cadastro e vinculo do colaborador.
- `docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md`: admissao digital e eSocial.
- `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`: backlog implementavel de admissao e desligamento.
- `docs/TOPICO-04-ETAPA-1-ESTRUTURA-DE-ADMISSAO.md`: backlog executavel da estrutura minima de admissao.
- `apps/api/prisma/schema.prisma`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: etapa 1 da admissao, checklist documental minimo, formalizacao contratual separada, trilha minima de eSocial, desligamento administrativo minimo, offboarding minimo, eSocial de desligamento minimo e fluxo minimo de rescisao com memoria de calculo, prazo de pagamento e documentos assinaveis implementados no backend.
- `apps/api/prisma/migrations/20260605235000_point_governance/migration.sql`: persistencia minima do pacote de ponto para calendarios de feriados, tolerancia e dispositivos.
- `apps/api/prisma/migrations/20260606001000_night_shift_allowance/migration.sql`: persistencia do adicional noturno com calculo, itens e aprovacao.
- `apps/api/prisma/migrations/20260606004000_weekly_rest_allowance/migration.sql`: persistencia do DSR com calculo, itens e aprovacao.
- `apps/api/prisma/migrations/20260606012000_time_sheet_payroll_event_batch/migration.sql`: persistencia da consolidacao de eventos de ponto para folha.
- `apps/api/src/slice.store.ts` e `apps/worker/src/main.ts`: ajustados para reduzir dados sensiveis em auditoria e logs operacionais.
- `docs/LGPD_SECURITY.md`: politica base de retencao e exportacao por classe de dado.
- `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md` e `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`: mascaramento de exportacao por nivel.
- `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: assinatura rescisoria com `govbr_advanced` padrao e `icp_brasil` como excecao valida.
- `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: reprocessamento explicito do eSocial de admissao e desligamento.
- `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts` e `apps/api/src/integrations.controller.ts`: lote de ponto para folha com envio, sincronizacao minima com ERP e banco, integracoes minimas de beneficios e identidade, retentativa, DLQ e monitoramento basico.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606050000_benefits_catalog_assignments/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: catalogo de beneficios por tenant e atribuicao, suspensao e cancelamento de beneficios para colaboradores.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606055000_vacations_minimal/migration.sql`, `apps/api/prisma/migrations/20260606070000_vacations_notice_payment/migration.sql`, `apps/api/prisma/migrations/20260606080000_vacations_split_abono/migration.sql`, `apps/api/prisma/migrations/20260606083000_vacations_payroll_integration/migration.sql`, `apps/api/prisma/migrations/20260606085000_vacations_esocial_transmissions/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: saldo de ferias por periodo, janela concessiva derivada, validacao de conflito de datas, fracionamento, abono pecuniario, aviso formal, pagamento, envio para folha, transmissao ao eSocial, solicitacao, aprovacao e cancelamento.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606073000_thirteenth_salary_calculations/migration.sql`, `apps/api/prisma/migrations/20260606090000_thirteenth_salary_payroll_integration/migration.sql`, `apps/api/prisma/migrations/20260606091000_thirteenth_salary_complete/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: calculo anual do 13o salario com memoria de avos, medias variaveis, encargos, aprovacao auditavel e ponte para folha.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606092000_sst_foundation/migration.sql`, `apps/api/prisma/migrations/20260606093000_sst_exams_aso/migration.sql`, `apps/api/prisma/migrations/20260606094000_sst_pgr_pcmso/migration.sql`, `apps/api/prisma/migrations/20260606095000_sst_cat_epi/migration.sql`, `apps/api/prisma/migrations/20260606095500_sst_epi_assignment_company/migration.sql`, `apps/api/prisma/migrations/20260606100000_sst_esocial_transmissions/migration.sql`, `apps/api/prisma/migrations/20260606101000_sst_training_catalogs_assignments/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: primeira base executavel de SST com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissões eSocial SST versionados por tenant.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606102000_ats_foundation/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: primeira base executavel de ATS com requisicao de vaga, aprovacao, publicacao, candidatos e movimentacao inicial no pipeline.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606103000_ats_interviews_evaluations/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: recorte inicial de ATS com entrevistas agendadas e avaliacao inicial de candidatos.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606104000_ats_proposal_conversion/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: proposta de ATS e conversao para pre-admissao com admissao draft rastreavel.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606105000_admission_documents/migration.sql`, `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: dossie documental da admissao com documentos de onboarding e assinatura auditavel.
- `docs/TOPICO-05-JORNADA-PONTO-E-FOLHA.md`: jornada, ponto e folha.
- `scripts/platform-backup.mjs`, `scripts/platform-restore.mjs`, `scripts/platform-observability-report.mjs` e `scripts/platform-alerts-check.mjs`: backup, restore seguro por padrao, snapshot de observabilidade e check automatizado de alertas da plataforma local.
- `apps/api/src/platform.controller.ts`: telemetria operacional da plataforma em `GET /api/v1/platform/telemetry`.
- `apps/api/src/slice.store.ts` e `apps/api/src/slice.controller.ts`: snapshot analitico por tenant em `GET /api/v1/tenants/:tenantId/analytics/overview`.
- `apps/web/src/tenant-access.js` e `apps/web/test/tenant-access.test.mjs`: verificacao automatizada de tenant ativo permitido no BFF.
- `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `apps/web/src/styles.css` e `apps/web/test/portal-workspace.test.mjs`: workspace operacional da Onda 4 com cards de colaborador/gestor, documentos, excecoes e timeline de workflow.
- `apps/web/src/App.tsx` e `apps/web/src/portal-workspace.js`: snapshot analitico da Onda 5 com headcount, pressao de fluxo, auditoria, integracoes e LGPD.
- `apps/web/src/App.tsx` e `apps/web/src/portal-workspace.js`: timeline de roadmap da Onda 6 com dominios complementares e sequencia de expansao.
- `.github/workflows/ci.yml` e `.github/workflows/promote.yml`: validacao em `push`/`pull_request` e promocao manual entre ambientes.
- `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`: beneficios, ferias, 13o e rescisao.
- `docs/README-UC-BEN.md` e `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`: beneficios com catalogo e atribuicao minima.
- `docs/README-UC-FER.md` e `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`: ferias com saldo, janela concessiva derivada, fracionamento, abono pecuniario, aviso formal, pagamento, envio para folha, transmissao ao eSocial e ciclo minimo operacional.
- `docs/README-UC-FOL.md` e `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`: 13o salario com calculo anual, memoria de avos, medias variaveis, encargos, aprovacao basica e ponte para folha.
- `docs/README-UC-SST.md` e `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`: primeira base executavel de SST com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissões eSocial SST por tenant.
- `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`: SST, medicina ocupacional e compliance.
- `docs/TOPICO-08-PORTAIS-WORKFLOW-E-DOCUMENTOS.md`: portais, workflow e documentos.
- `docs/TOPICO-09-BI-LGPD-INTEGRACOES-E-AUDITORIA.md`: BI, LGPD, integracoes e auditoria.
- `docs/TOPICO-10-MVP-E-BASE-EXECUTAVEL.md`: MVP e base executavel.
- `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md` e `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md`: mapeamento do MVP com `Employee` como projecao operacional de `VinculoTrabalhista`.
- `docs/README-UC-ADM.md`: indice do pacote UC-ADM.
- `docs/UC-FOL-002-configurar-incidencias-da-rubrica.md`: configuracao de incidencias, bases e compatibilidade eSocial da rubrica.
- `docs/UC-FOL-003-processar-folha-mensal.md`: processamento da folha mensal e memoria de calculo.
- `docs/UC-FOL-004-processar-folha-complementar.md`: processamento da folha complementar e ajustes retroativos.
- `docs/UC-FOL-005-processar-adiantamento-salarial.md`: processamento de adiantamento salarial e deducao futura.
- `docs/UC-FOL-006-calcular-inss.md`: calculo de INSS e memoria previdenciaria.
- `docs/UC-FOL-007-calcular-fgts.md`: calculo de FGTS e memoria fundiaria.
- `docs/UC-FOL-008-calcular-irrf.md`: calculo de IRRF e memoria tributaria.
- `docs/UC-FOL-009-gerar-holerite.md`: geracao de holerite e disponibilizacao no portal.
- `docs/UC-FOL-010-fechar-folha-de-pagamento.md`: fechamento formal da folha de pagamento.
- `docs/README-UC-FOL.md`: indice do pacote UC-FOL.
- `docs/README-UC-BEN.md`: indice do pacote UC-BEN.
- `docs/README-UC-FER.md`: indice do pacote UC-FER.
- `docs/README-UC-DEC.md`: indice do pacote UC-DEC.
- `docs/README-UC-RES.md`: indice do pacote UC-RES.
- `docs/README-UC-SST.md`: indice do pacote UC-SST.
- `docs/README-UC-ESO.md`: indice do pacote UC-ESO.
- `docs/README-UC-COL.md`: indice do pacote UC-COL.
- `docs/README-UC-GST.md`: indice do pacote UC-GST.
- `docs/README-UC-WFL.md`: indice do pacote UC-WFL.
- `docs/README-UC-GED.md`: indice do pacote UC-GED.
- `docs/README-UC-ATS.md`: indice do pacote UC-ATS.
- `docs/README-UC-ONB.md`: indice do pacote UC-ONB.
- `docs/README-UC-LMS.md`: indice do pacote UC-LMS.
- `docs/README-UC-PER.md`: indice do pacote UC-PER.
- `docs/README-UC-CAR.md`: indice do pacote UC-CAR.
- `docs/UC-BI-001-consultar-dashboard-executivo.md`: dashboard executivo de RH.
- `docs/UC-BI-002-consultar-headcount.md`: consulta de headcount.
- `docs/UC-BI-003-consultar-turnover.md`: consulta de turnover.
- `docs/UC-BI-004-consultar-absenteismo.md`: consulta de absenteismo.
- `docs/UC-BI-005-consultar-custos-de-pessoal.md`: consulta de custos de pessoal.
- `docs/UC-BI-006-consultar-indicadores-de-recrutamento.md`: indicadores de recrutamento.
- `docs/UC-BI-007-consultar-indicadores-de-treinamento.md`: indicadores de treinamento.
- `docs/UC-BI-008-consultar-indicadores-de-desempenho.md`: indicadores de desempenho.
- `docs/UC-BI-009-consultar-indicadores-de-sst.md`: indicadores de SST.
- `docs/UC-BI-010-exportar-indicadores.md`: exportacao de indicadores.
- `docs/README-UC-BI.md`: indice do pacote UC-BI.
- `docs/UC-SEC-001-gerenciar-perfis-de-acesso.md`: perfis de acesso.
- `docs/UC-SEC-002-gerenciar-permissoes.md`: permissoes granulares.
- `docs/UC-SEC-003-configurar-mfa.md`: autenticacao multifator.
- `docs/UC-SEC-004-configurar-sso.md`: single sign-on.
- `docs/UC-SEC-005-registrar-consentimento.md`: consentimento LGPD.
- `docs/UC-SEC-006-atender-solicitacao-do-titular.md`: solicitacao do titular.
- `docs/UC-SEC-007-anonimizar-dados.md`: anonimização.
- `docs/UC-SEC-008-aplicar-politica-de-retencao.md`: retencao e expurgo.
- `docs/UC-SEC-009-registrar-incidente-de-seguranca.md`: incidentes.
- `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`: auditoria de acessos e operacoes.
- `docs/README-UC-SEC.md`: indice do pacote UC-SEC.
- `docs/UC-API-001-cadastrar-integracao.md`: cadastro de integracao.
- `docs/UC-API-002-configurar-api-rest.md`: configuracao de API REST.
- `docs/UC-API-003-configurar-webhook.md`: configuracao de webhook.
- `docs/UC-API-004-publicar-evento.md`: publicacao de evento.
- `docs/UC-API-005-consumir-evento.md`: consumo de evento.
- `docs/UC-API-006-integrar-com-erp.md`: integracao com ERP.
- `docs/UC-API-007-integrar-com-banco.md`: integracao com banco.
- `docs/UC-API-008-integrar-com-operadora-de-beneficios.md`: integracao com operadora de beneficios.
- `docs/UC-API-009-integrar-com-provedor-de-identidade.md`: integracao com provedor de identidade.
- `docs/UC-API-010-monitorar-integracoes.md`: monitoramento de integracoes.
- `docs/README-UC-API.md`: indice do pacote UC-API.
- `docs/UC-PLT-001-cadastrar-tenant.md`: cadastro de tenant.
- `docs/UC-PLT-002-cadastrar-empresa.md`: cadastro de empresa.
- `docs/UC-PLT-003-cadastrar-filial.md`: cadastro de filial.
- `docs/UC-PLT-004-configurar-isolamento-de-dados.md`: isolamento de dados.
- `docs/UC-PLT-005-configurar-parametrizacoes-por-tenant.md`: parametrizacoes por tenant.
- `docs/UC-PLT-006-monitorar-disponibilidade.md`: monitoramento de disponibilidade.
- `docs/UC-PLT-007-executar-backup.md`: backup.
- `docs/UC-PLT-008-executar-restauracao.md`: restauracao.
- `docs/UC-PLT-009-monitorar-performance.md`: monitoramento de performance.
- `docs/UC-PLT-010-auditar-governanca-da-plataforma.md`: governanca da plataforma.
- `docs/README-UC-PLT.md`: indice do pacote UC-PLT.
- `docs/UC-JOR-011-fechar-periodo-de-ponto.md`: fechamento formal do periodo de ponto.
- `docs/UC-JOR-012-reabrir-periodo-de-ponto.md`: reabertura controlada do periodo de ponto.
- `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`: calendario de feriados e excecoes por vigencia.
- `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md`: regras de tolerancia por vigencia.
- `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md`: dispositivos de ponto por vigencia.
- `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md`: comprovante de marcacao e segunda via.
- `docs/UC-JOR-017-calcular-adicional-noturno.md`: adicional noturno por competencia.
- `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md`: dsr e descanso semanal por competencia.
- `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md`: consolidacao de eventos de ponto para folha.
- `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md`: exportacao de espelho e trilhas de auditoria.
- `docs/README-UC-JOR.md`: indice do pacote UC-JOR.
- `arquitetura/`: modelos conceituais de dados, entidades e permissões.
- Pacotes detalhados de dominio e casos de uso em `docs/RN *`, `docs/UC-*`, `docs/Catálogo Mestre de Casos de Uso.md` e `docs/README-UC-JOR.md`.
- Nao foram encontrados diretorios de aplicacao como `src/`, `apps/` ou `services/` nesta auditoria inicial.

## Serviços

- Nenhum servico executavel identificado.
- O material atual descreve apenas o sistema alvo, nao a implementacao.

## Frontend

- Nao identificado.
- Apenas requisitos e fluxos de UX estao documentados.

## Backend

- Nao identificado.
- Existem exemplos de APIs nos casos de uso, mas sem codigo correspondente no repositorio.

## Banco de dados

- Apenas modelo conceitual e entidades de dominio estao documentados.
- Nao foi encontrada migracao, schema ou definicao fisica de banco.

## Integrações

- eSocial e mencionada em varios documentos de dominio.
- Ha referencias conceituais a folha, ERP, SSO e APIs externas; a trilha minima de folha para ERP agora existe apenas para o lote consolidado de ponto.

## Infraestrutura

- Nao identificada.
- Nao foram encontrados Dockerfile, compose, CI/CD ou variaveis de ambiente nesta auditoria.

## Comandos conhecidos

- Instalar dependencias: nao identificado.
- Rodar local: nao identificado.
- Testes: nao identificado.
- Lint: nao identificado.
- Typecheck: nao identificado.
- Build: nao identificado.

## Atualizacao tecnica

- `docs/TOPICO-11-STACK-E-ARQUITETURA-EXECUTAVEL.md`: stack e arquitetura executavel.
- `docs/TOPICO-12-VERTICAL-SLICE-PRIMEIRO-RELEASE.md`: vertical slice do primeiro release.
- `docs/TOPICO-13-BACKLOG-POS-MVP.md`: backlog pos-MVP e sequencia de implementacao.
- `docs/TOPICO-14-ONDA-1-PACOTE-DE-PONTO.md`: primeira onda pos-MVP para fechar o pacote de ponto.
- `docs/TOPICO-15-ONDA-2-INTEGRACOES-E-CONTRATOS-EXTERNOS.md`: segunda onda pos-MVP para integracoes e contratos externos.
- `docs/TOPICO-16-ONDA-3-PLATAFORMA-E-GOVERNANCA.md`: terceira onda pos-MVP para plataforma e governanca.
- `docs/TOPICO-17-ONDA-4-PORTAIS-E-WORKFLOW.md`: quarta onda pos-MVP para portais e workflow.
- `docs/TOPICO-18-ONDA-5-BI-LGPD-E-AUDITORIA-AMPLIADA.md`: quinta onda pos-MVP para BI, LGPD e auditoria ampliada.
- `docs/TOPICO-19-ONDA-6-DOMINIOS-COMPLEMENTARES.md`: sexta onda pos-MVP para dominios complementares.
- `docs/TOPICO-20-ONDA-1-DETALHAMENTO-EXECUTAVEL-PACOTE-DE-PONTO.md`: detalhamento executavel da Onda 1.
- `docs/TOPICO-21-ONDA-2-DETALHAMENTO-EXECUTAVEL-INTEGRACOES-E-CONTRATOS.md`: detalhamento executavel da Onda 2.
- `docs/TOPICO-22-ONDA-3-DETALHAMENTO-EXECUTAVEL-PLATAFORMA-E-GOVERNANCA.md`: detalhamento executavel da Onda 3.
- `docs/TOPICO-23-ONDA-4-DETALHAMENTO-EXECUTAVEL-PORTAIS-E-WORKFLOW.md`: detalhamento executavel da Onda 4.
- `docs/TOPICO-24-ONDA-5-DETALHAMENTO-EXECUTAVEL-BI-LGPD-E-AUDITORIA.md`: detalhamento executavel da Onda 5.
- `docs/TOPICO-25-ONDA-6-DETALHAMENTO-EXECUTAVEL-DOMINIOS-COMPLEMENTARES.md`: detalhamento executavel da Onda 6.
- A documentacao agora recomenda monolito modular, monorepo e stack TypeScript/NestJS/React/PostgreSQL/Redis/BullMQ/MinIO/Keycloak.
- O repositório agora possui scaffold inicial com:
  - `package.json` na raiz;
  - `tsconfig.base.json`;
  - `apps/api`;
  - `apps/web`;
  - `apps/worker`;
  - `packages/shared`;
  - `infra/docker-compose.yml`;
  - `infra/.env.example`.

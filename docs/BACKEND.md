# Backend

## Stack

Identificada na arvore atual do repositorio:

- `@rh/api`: NestJS em TypeScript.
- `@rh/web`: React + Vite.
- `@rh/worker`: BullMQ com Redis como fila alvo.

## APIs

O slice inicial ja expÃµe um contrato real em:

- `POST /api/v1/tenants`
- `GET /api/v1/tenants/:tenantId`
- `POST /api/v1/tenants/:tenantId/companies`
- `POST /api/v1/tenants/:tenantId/persons`
- `POST /api/v1/tenants/:tenantId/employees`
- `GET /api/v1/tenants/:tenantId/employees/:employeeId/dependents`
- `POST /api/v1/tenants/:tenantId/employees/:employeeId/dependents`
- `PATCH /api/v1/tenants/:tenantId/employees/:employeeId/dependents/:dependentId`
- `PATCH /api/v1/tenants/:tenantId/employees/:employeeId/dependents/:dependentId/inactive`
- `POST /api/v1/tenants/:tenantId/ats/vacancy-requests`
- `GET /api/v1/tenants/:tenantId/ats/vacancy-requests`
- `POST /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/approve`
- `POST /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/publish`
- `POST /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/candidates`
- `GET /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/candidates`
- `POST /api/v1/tenants/:tenantId/ats/candidates/:candidateId/move`
- `POST /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/interviews`
- `GET /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/interviews`
- `POST /api/v1/tenants/:tenantId/ats/interviews/:interviewId/evaluations`
- `GET /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/evaluations`
- `POST /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/candidates/:candidateId/proposals`
- `GET /api/v1/tenants/:tenantId/ats/vacancy-requests/:vacancyRequestId/proposals`
- `POST /api/v1/tenants/:tenantId/ats/proposals/:proposalId/convert`
- `POST /api/v1/tenants/:tenantId/point-marks`
- `GET /api/v1/tenants/:tenantId/point-marks`
- `GET /api/v1/tenants/:tenantId/point-marks/:pointMarkId/receipt`
- `GET /api/v1/tenants/:tenantId/point-holidays`
- `POST /api/v1/tenants/:tenantId/point-holidays`
- `PATCH /api/v1/tenants/:tenantId/point-holidays/:holidayCalendarId`
- `GET /api/v1/tenants/:tenantId/point-tolerance-rules`
- `POST /api/v1/tenants/:tenantId/point-tolerance-rules`
- `PATCH /api/v1/tenants/:tenantId/point-tolerance-rules/:toleranceRuleId`
- `GET /api/v1/tenants/:tenantId/point-devices`
- `POST /api/v1/tenants/:tenantId/point-devices`
- `PATCH /api/v1/tenants/:tenantId/point-devices/:deviceId`
- `POST /api/v1/tenants/:tenantId/sst/pgrs`
- `GET /api/v1/tenants/:tenantId/sst/pgrs`
- `PATCH /api/v1/tenants/:tenantId/sst/pgrs/:pgrId`
- `POST /api/v1/tenants/:tenantId/sst/pcmsos`
- `GET /api/v1/tenants/:tenantId/sst/pcmsos`
- `PATCH /api/v1/tenants/:tenantId/sst/pcmsos/:pcmsoId`
- `POST /api/v1/tenants/:tenantId/sst/cats`
- `GET /api/v1/tenants/:tenantId/sst/cats`
- `POST /api/v1/tenants/:tenantId/sst/epi-catalogs`
- `GET /api/v1/tenants/:tenantId/sst/epi-catalogs`
- `PATCH /api/v1/tenants/:tenantId/sst/epi-catalogs/:epiCatalogId`
- `POST /api/v1/tenants/:tenantId/sst/epi-assignments`
- `GET /api/v1/tenants/:tenantId/sst/epi-assignments`
- `POST /api/v1/tenants/:tenantId/sst/environments`
- `GET /api/v1/tenants/:tenantId/sst/environments`
- `PATCH /api/v1/tenants/:tenantId/sst/environments/:environmentId`
- `POST /api/v1/tenants/:tenantId/sst/environments/:environmentId/risks`
- `GET /api/v1/tenants/:tenantId/sst/environments/:environmentId/risks`
- `PATCH /api/v1/tenants/:tenantId/sst/environments/:environmentId/risks/:riskId`
- `POST /api/v1/tenants/:tenantId/sst/exams`
- `GET /api/v1/tenants/:tenantId/sst/exams`
- `PATCH /api/v1/tenants/:tenantId/sst/exams/:examId`
- `POST /api/v1/tenants/:tenantId/sst/exams/:examId/aso`
- `GET /api/v1/tenants/:tenantId/sst/exams/:examId/aso`
- `POST /api/v1/tenants/:tenantId/sst/training-catalogs`
- `GET /api/v1/tenants/:tenantId/sst/training-catalogs`
- `PATCH /api/v1/tenants/:tenantId/sst/training-catalogs/:trainingCatalogId`
- `POST /api/v1/tenants/:tenantId/sst/training-assignments`
- `GET /api/v1/tenants/:tenantId/sst/training-assignments`
- `POST /api/v1/tenants/:tenantId/sst/training-assignments/:assignmentId/complete`
- `POST /api/v1/tenants/:tenantId/sst/environments/:environmentId/esocial-transmissions`
- `GET /api/v1/tenants/:tenantId/sst/environments/:environmentId/esocial-transmissions`
- `POST /api/v1/tenants/:tenantId/sst/environments/:environmentId/esocial-transmissions/:transmissionId/retry`
- `POST /api/v1/tenants/:tenantId/sst/cats/:catId/esocial-transmissions`
- `GET /api/v1/tenants/:tenantId/sst/cats/:catId/esocial-transmissions`
- `POST /api/v1/tenants/:tenantId/sst/cats/:catId/esocial-transmissions/:transmissionId/retry`
- `POST /api/v1/tenants/:tenantId/sst/exams/:examId/esocial-transmissions`
- `GET /api/v1/tenants/:tenantId/sst/exams/:examId/esocial-transmissions`
- `POST /api/v1/tenants/:tenantId/sst/exams/:examId/esocial-transmissions/:transmissionId/retry`

Os endpoints de retry de eSocial SST agora validam o contexto do recurso pai da rota antes de reprocessar a transmissao.
Para validar ou forcar o ciclo de reprocessamento em homologacao, a API tambem expõe:

- `POST /api/v1/tenants/:tenantId/sst/environments/:environmentId/esocial-transmissions/:transmissionId/mark-failed`
- `POST /api/v1/tenants/:tenantId/sst/cats/:catId/esocial-transmissions/:transmissionId/mark-failed`
- `POST /api/v1/tenants/:tenantId/sst/exams/:examId/esocial-transmissions/:transmissionId/mark-failed`

Esses endpoints de marcação de falha servem para operacao controlada e validacao do contrato de retry com contexto de rota.
Regra operacional: o retry SST de `UC-ESO` somente deve ser exercitado com transmissao em `failed`; se o estado ainda nao for `failed`, a API responde pela regra de estado antes de avaliar o pai da rota. Quando a transmissao estiver em `failed`, o parent da rota continua obrigatorio e um pai incorreto deve retornar `404 not found for <parent>`.
- `POST /api/v1/tenants/:tenantId/night-shift-allowance/calculate`
- `GET /api/v1/tenants/:tenantId/night-shift-allowance/calculations/:calculationId`
- `POST /api/v1/tenants/:tenantId/night-shift-allowance/calculations/:calculationId/approve`
- `POST /api/v1/tenants/:tenantId/weekly-rest-allowance/calculate`
- `GET /api/v1/tenants/:tenantId/weekly-rest-allowance/calculations/:calculationId`
- `POST /api/v1/tenants/:tenantId/weekly-rest-allowance/calculations/:calculationId/approve`
- `POST /api/v1/tenants/:tenantId/thirteenth-salary/calculate`
- `GET /api/v1/tenants/:tenantId/thirteenth-salary/calculations/:calculationId`
- `POST /api/v1/tenants/:tenantId/thirteenth-salary/calculations/:calculationId/approve`
- `POST /api/v1/tenants/:tenantId/thirteenth-salary/calculations/:calculationId/send-to-payroll`
- `POST /api/v1/tenants/:tenantId/time-sheet/payroll-events/consolidate`
- `GET /api/v1/tenants/:tenantId/time-sheet/payroll-events/batches/:batchId`
- `POST /api/v1/tenants/:tenantId/time-sheet/payroll-events/batches/:batchId/approve`
- `POST /api/v1/tenants/:tenantId/time-sheet/payroll-events/batches/:batchId/send-to-payroll`
- `POST /api/v1/tenants/:tenantId/time-sheet/payroll-events/batches/:batchId/send-to-erp`
- `POST /api/v1/tenants/:tenantId/integrations/bank/sync`
- `POST /api/v1/tenants/:tenantId/integrations/benefits/sync`
- `POST /api/v1/tenants/:tenantId/integrations/identity/sync`
- `GET /api/v1/tenants/:tenantId/integrations/monitoring`
- `POST /api/v1/tenants/:tenantId/integrations/:requestId/fail`
- `POST /api/v1/tenants/:tenantId/integrations/:requestId/retry`
- `POST /api/v1/tenants/:tenantId/integrations/:requestId/dlq`
- `POST /api/v1/tenants/:tenantId/benefits/catalog`
- `GET /api/v1/tenants/:tenantId/benefits/catalog`
- `POST /api/v1/tenants/:tenantId/benefits/catalog/:benefitCatalogId/eligibility-rules`
- `GET /api/v1/tenants/:tenantId/benefits/catalog/:benefitCatalogId/eligibility-rules`
- `PATCH /api/v1/tenants/:tenantId/benefits/catalog/:benefitCatalogId/eligibility-rules/:ruleId`
- `POST /api/v1/tenants/:tenantId/benefits/assignments`
- `GET /api/v1/tenants/:tenantId/benefits/assignments`
- `POST /api/v1/tenants/:tenantId/benefits/assignments/:assignmentId/suspend`
- `POST /api/v1/tenants/:tenantId/benefits/assignments/:assignmentId/cancel`
- `GET /api/v1/tenants/:tenantId/lgpd/consents`
- `POST /api/v1/tenants/:tenantId/lgpd/consents`
- `POST /api/v1/tenants/:tenantId/lgpd/consents/:consentId/revoke`
- `GET /api/v1/tenants/:tenantId/lgpd/requests`
- `POST /api/v1/tenants/:tenantId/lgpd/requests`
- `POST /api/v1/tenants/:tenantId/lgpd/requests/:requestId/resolve`
- `GET /api/v1/tenants/:tenantId/lgpd/anonymizations`
- `POST /api/v1/tenants/:tenantId/lgpd/anonymizations`
- `GET /api/v1/tenants/:tenantId/lgpd/retention-rules`
- `POST /api/v1/tenants/:tenantId/lgpd/retention-rules`
- `POST /api/v1/tenants/:tenantId/lgpd/retention-rules/:ruleId/apply`
- `POST /api/v1/tenants/:tenantId/vacations/balances`
- `GET /api/v1/tenants/:tenantId/vacations/balances`
- `POST /api/v1/tenants/:tenantId/vacations/requests`
- `GET /api/v1/tenants/:tenantId/vacations/requests`
- `POST /api/v1/tenants/:tenantId/vacations/requests/:requestId/approve`
- `POST /api/v1/tenants/:tenantId/vacations/requests/:requestId/notice`
- `POST /api/v1/tenants/:tenantId/vacations/requests/:requestId/payment`
- `POST /api/v1/tenants/:tenantId/vacations/requests/:requestId/send-to-payroll`
- `POST /api/v1/tenants/:tenantId/vacations/requests/:requestId/cancel`
- `POST /api/v1/tenants/:tenantId/admissions`
- `GET /api/v1/tenants/:tenantId/admissions`
- `GET /api/v1/tenants/:tenantId/admissions/:admissionId`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/cancel`
- `GET /api/v1/tenants/:tenantId/admissions/:admissionId/checklist`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/checklist/:checklistItemId/receive`
- `GET /api/v1/tenants/:tenantId/admissions/:admissionId/contract`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/contract`
- `GET /api/v1/tenants/:tenantId/admissions/:admissionId/documents`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/documents`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/documents/:documentId/sign`
- `POST /api/v1/tenants/:tenantId/terminations`
- `GET /api/v1/tenants/:tenantId/terminations`
- `GET /api/v1/tenants/:tenantId/terminations/:terminationId`
- `POST /api/v1/tenants/:tenantId/terminations/:terminationId/approve`
- `POST /api/v1/tenants/:tenantId/terminations/:terminationId/effective`
- `POST /api/v1/tenants/:tenantId/terminations/:terminationId/cancel`
- `POST /api/v1/tenants/:tenantId/terminations/:terminationId/offboardings`
- `GET /api/v1/tenants/:tenantId/offboardings`
- `GET /api/v1/tenants/:tenantId/offboardings/:offboardingId`
- `POST /api/v1/tenants/:tenantId/offboardings/:offboardingId/close`
- `POST /api/v1/tenants/:tenantId/offboardings/:offboardingId/cancel`
- `GET /api/v1/tenants/:tenantId/terminations/:terminationId/esocial-transmissions`
- `POST /api/v1/tenants/:tenantId/terminations/:terminationId/esocial-transmissions`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/esocial-transmissions/:transmissionId/retry`
- `POST /api/v1/tenants/:tenantId/terminations/:terminationId/esocial-transmissions/:transmissionId/retry`
- `POST /api/v1/tenants/:tenantId/rescissions/:rescissionId/calculation`
- `GET /api/v1/tenants/:tenantId/rescissions/:rescissionId/documents`
- `POST /api/v1/tenants/:tenantId/rescissions/:rescissionId/documents`
- `POST /api/v1/tenants/:tenantId/rescissions/:rescissionId/documents/:documentId/sign`
- `GET /api/v1/tenants/:tenantId/summary`
- `GET /api/v1/tenants/:tenantId/audit-events`
- `GET /api/v1/tenants/me/access`
- `POST /api/v1/tenants/:tenantId/access-grants`
- `GET /api/v1/platform/telemetry`

O slice inicial agora usa Prisma com PostgreSQL para persistencia relacional.
A base executavel de admissao agora tambem inclui o agregado minimo de dependentes do colaborador, com CRUD, inativacao e auditoria.
A camada minima de UC-SEC agora inclui consentimento do titular e atendimento de solicitacao do titular, com persistencia relacional, trilha de auditoria e rotas dedicadas em `lgpd`.
A etapa 1 da admissao ja esta implementada no backend como solicitacao rastreavel por tenant, com cancelamento controlado e auditoria.
O checklist documental minimo da admissao tambem entrou no runtime, com lista dos itens obrigatorios, recebimento item a item e transicao automatica para pendencia ou revisao.
A formalizacao contratual separada tambem entrou no runtime como snapshot proprio, com vigencia, tipo de contrato e transicao da admissao para `completed`.
A admissao agora tambem gera um dossie documental proprio, com documentos versionados de onboarding e assinatura auditavel, sem acoplar o contrato ao cadastro-base.
A integracao eSocial da admissao tambem entrou no runtime em formato minimo, com fila, worker, consulta de transmissao e persistencia de estados `queued`, `sent` e `failed`.
A trilha minima de desligamento administrativo tambem entrou no runtime, com solicitacao por tenant, aprovacao, efetivacao, cancelamento controlado e bloqueio de novos apontamentos quando o desligamento esta efetivo.
A trilha minima de offboarding tambem entrou no runtime, com criacao, consulta, fechamento, cancelamento e disparo do eSocial de desligamento.
O fluxo minimo de rescisao agora tambem inclui memoria de calculo, geracao de documentos rescisorios, prazo de pagamento calculado a partir da data de desligamento informada e fechamento condicionado a estado documentado com documentos assinados, ainda vinculado a um desligamento efetivo.
O pacote de ponto agora tambem possui persistencia minima para calendarios de feriados, regras de tolerancia e dispositivos de ponto, com consulta e criacao por tenant e auditoria de alteracoes.
O pacote de ponto tambem passa a expor listagem de marcações e comprovante de marcação como projeção auditável para o fluxo de ponto.
O modulo de beneficios tambem ja possui a primeira camada executavel, com catalogo por tenant e atribuicao, suspensao e cancelamento de beneficios para colaboradores.
O modulo de ferias tambem ja possui a primeira camada executavel, com saldo por periodo, janela concessiva derivada, validacao de conflito de datas, fracionamento, abono pecuniario, solicitacao, aprovacao, aviso formal, pagamento, envio para folha e cancelamento auditavel.
O fluxo de ferias agora persiste a memoria do pedido em `vacation_requests`, `vacation_request_periods` e `time_sheet_payroll_event_batches`, registrando `consumedDays`, `abonoDays`, `salaryBaseCents`, `vacationAmountCents`, `abonoAmountCents` e a trilha de payroll quando informados.
O modulo de ferias tambem ja possui transmissao ao eSocial com `VacationEsocialTransmission`, fila BullMQ e reprocessamento explicito por request.
O modulo de 13o salario tambem ja possui ponte para folha, com lotes auditaveis para a primeira e segunda parcela, medias variaveis, encargos e campos persistidos de payroll no calculo anual.

Smoke test local confirmou o fluxo relacional completo com Postgres ativo: tenant, company, person, employee, point mark, resumo e auditoria.

## AutenticaÃƒÂ§ÃƒÂ£o e autorizaÃƒÂ§ÃƒÂ£o

Autenticacao e autorizacao ja estao ativas no `@rh/api` em modo hibrido:

- `Authorization: Bearer <token>` com validacao OIDC/JWKS quando configurado.
- `x-rh-user-id`
- `x-rh-role`
- `x-rh-tenant-id` para rotas com escopo de tenant

O guard atual protege rotas por perfil e aceita fallback por headers em modo local/misto:

- `admin` pode criar tenant e operar o slice completo.
- `rh` pode operar os cadastros e o ponto.
- `manager` e `auditor` podem ler resumo, tenant e trilhas.
- `employee` ainda nao tem fluxo proprio neste slice.

Papéis efetivamente usados no runtime atual:

- `admin`
- `rh`
- `manager`
- `auditor`
- `employee`

No modo OIDC/misto, o token autentica o usuario e a API grava um `tenant_access` local quando o tenant e criado por esse sujeito. Depois disso, o mesmo bearer consegue operar o tenant sem `x-rh-tenant-id` no caminho feliz. O header continua aceito como fallback local e para compatibilidade.

O endpoint GET /api/v1/tenants/me/access lista todos os tenants acessiveis por um subject OIDC, permitindo usuarios com mais de um tenant navegarem no sistema sem depender de um claim de tenant fixo.

No OIDC local, os claims padrao de configuracao sao `tenant_id` para tenant, `rh_roles` para roles e `sub` para identificacao do usuario.

O portal BFF tambem expõe GET /api/session-store para snapshot operacional do store, com contagem de sessoes em memoria, indice e timestamps de carga/escrita/saude.


Isso nao substitui o provisionamento completo do IdP real, mas a API ja consegue validar tokens OIDC assinados por JWKS quando o ambiente e configurado.

## Banco de dados

Existe schema Prisma para Tenant, Company, Person, Employee, AdmissionRequest, AdmissionChecklistItem, AdmissionHistory, AdmissionContract, AdmissionDocument, PointMark e AuditEvent.
Tambem existe `TerminationRequest` e `TerminationHistory`, usados para registrar o desligamento administrativo minimo e sua trilha de auditoria.
Tambem existe `TerminationOffboarding` e `TerminationOffboardingHistory`, usados para registrar o offboarding minimo vinculado ao desligamento efetivo.
Tambem existe `TerminationEsocialTransmission`, usado para registrar a transmissao minima de desligamento ao eSocial.
Tambem existe `RescissionRequest`, `RescissionHistory`, `RescissionCalculation` e `RescissionDocument`, usados para registrar a rescisao minima vinculada a um desligamento efetivo, com memoria de calculo, prazo de pagamento e documentos assinaveis.
Tambem existem `PointHolidayCalendar`, `PointToleranceRule` e `PointDevice`, usados para registrar a configuracao minima do pacote de ponto por tenant.
Tambem existem `NightShiftAllowanceCalculation` e `NightShiftAllowanceItem`, usados para registrar calculos de adicional noturno com memoria por competencia, itens de origem e aprovacao.
Tambem existem `WeeklyRestAllowanceCalculation` e `WeeklyRestAllowanceItem`, usados para registrar calculos de DSR e descanso semanal com memoria por competencia, itens por dia e aprovacao.
Tambem existem `TimeSheetPayrollEventBatch` e `TimeSheetPayrollEventBatchItem`, usados para consolidar eventos de ponto aprovados para folha por competencia e rubrica versionada.
Tambem existe `tenant_access`, usado para materializar o vinculo entre o sujeito autenticado e o tenant criado.
Tambem existem `BenefitCatalog` e `EmployeeBenefit`, usados para catalogar beneficios por tenant e registrar atribuicoes por colaborador.
Tambem existem `VacationBalance` e `VacationRequest`, usados para controlar saldo de ferias por periodo, a janela concessiva derivada, o aviso formal, o pagamento e suas solicitações.
Tambem existe `ThirteenthSalaryCalculation`, usado para registrar o calculo anual do 13o salario com memoria de avos, valor total e aprovacao auditavel.
No MVP, `Employee` e a projecao operacional de `VinculoTrabalhista`; a formalizacao contratual agora vive como snapshot separado e o contrato formal do dominio continua reservado para a evolucao posterior do modelo.
O endpoint `POST /api/v1/tenants/:tenantId/access-grants` permite conceder acesso adicional a outro subject autenticado.
O contrato relacional ja possui migracoes aplicadas e foi validado em Postgres ativo com a etapa de admissao, checklist e formalizacao contratual separada.
O runtime de admissao tambem possui dossie documental proprio, com documentos de onboarding e assinatura versionada.
O backend tambem ja possui o fluxo minimo de eSocial da admissao, com transmissao assicrona via BullMQ, armazenamento de recibo e reprocessamento por status.
O backend tambem ja possui o fluxo minimo de desligamento administrativo, com bloqueio de ponto apos efetivacao e trilha de historico/auditoria.
O backend tambem ja possui o fluxo minimo de offboarding, com fechamento que dispara a transmissao de desligamento ao eSocial.
O backend tambem ja possui o fluxo minimo de eSocial de desligamento, com transmissao, consulta e recebimento de retorno via BullMQ.
O backend tambem ja possui reprocessamento explicito de transmissao de eSocial para admissao e desligamento, mantendo a trilha de auditoria e o payload recalculado a partir da origem persistida.
O backend tambem ja possui handoff de folha para eventos consolidados de ponto, com lote aprovado, envio para folha, sincronizacao minima com ERP e sincronizacao minima com banco, com recibo sintetico auditavel.
O backend tambem ja possui contratos minimos para sincronizacao de beneficios e identidade, alem de monitoramento, retentativa e DLQ de requests de integracao com base em auditoria e estado persistido.
O backend tambem ja possui um fluxo minimo de rescisao, com dependencia de desligamento efetivo, memoria de calculo, prazo calculado de pagamento, documentos rescisorios assinaveis e trilha de historico/auditoria para calculo, documentacao, assinatura, fechamento e cancelamento.
O endpoint de assinatura de documentos rescisorios aceita `govbr_advanced` como padrao e `icp_brasil` como excecao valida quando informada.
O backend tambem ja possui contratos de persistencia minima para o pacote de ponto: calendarios de feriados, tolerancia e dispositivos, com auditoria de criacao.
O backend tambem expõe telemetria operacional da plataforma em `GET /api/v1/platform/telemetry`, usada pelo check automatizado de alertas do compose local.
O backend tambem ja possui a primeira camada funcional de beneficios, com catalogo por tenant e atribuicao/suspensao/cancelamento de beneficios.
O backend tambem ja possui a primeira camada funcional de ferias, com saldo por periodo, janela concessiva derivada, aviso formal, pagamento e ciclo de solicitacao/aprovacao/cancelamento com bloqueio de conflito de datas.
O backend tambem ja possui a camada funcional completa da Onda 6 para 13o salario, com calculo anual, memoria de avos, medias variaveis, encargos, valor total, aprovacao auditavel e ponte para folha.
O backend tambem ja possui a primeira base executavel de SST, com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissões eSocial SST por tenant e auditoria.

## IntegraÃƒÂ§ÃƒÂµes

eSocial aparece como integracao recorrente nos documentos.
Prioridade operacional atual das integracoes:

- primeiro: eSocial e reflexos de folha;
- depois: ERP e SSO;
- em seguida: banco, operadora de beneficios e demais contratos externos.

Outras integracoes mencionadas: folha, ERP e SSO, ainda sem detalhes implementados.

## Jobs/filas

O runtime executavel possui uma fila BullMQ para a trilha minima de eSocial da admissao e para o eSocial de desligamento, consumidas pelo `@rh/worker` na fila `rh-events`.
O lote de ponto para folha agora tambem possui sincronizacao minima de ERP e de banco com recibo sintetico e trilha auditavel.
As integracoes de beneficios e identidade agora tambem possuem uma primeira camada executavel com requests persistidos, retentativa, DLQ e monitoramento basico.

## Testes

Suite de integracao adicionada em `apps/api/test/slice.store.test.ts`, validando persistencia relacional, recarga do banco, bloqueio de slug duplicado, trilha minima de eSocial, desligamento administrativo minimo, offboarding, eSocial de desligamento, rescisao com memoria de calculo, prazo de pagamento e documentos assinaveis, ponto para folha, sincronizacao minima com ERP e banco, beneficios, identidade, retentativa, DLQ e monitoramento.

## Atualizacao tecnica

- Backend recomendado documentalmente: TypeScript + NestJS.
- Persistencia proposta: PostgreSQL com migrations controladas.
- ORM/camada de acesso proposta: Prisma ou equivalente.
- Filas e jobs propostos: Redis + BullMQ.
- Auth/SSO propostos: Keycloak via OIDC/OAuth2.
- A API deve ser versionada e orientada a contratos de dominio.
- O workspace `@rh/api` ja possui bootstrap NestJS, validacao global, contrato `api/v1` para o slice inicial, schema Prisma e passa em build/typecheck.
- O workspace `@rh/web` ja publica uma tela inicial alinhada ao slice, com BFF local, e passa em build/typecheck.
- O workspace `@rh/api` tambem possui `npm run test` com integracao relacional verde contra o Postgres local.
- O portal web agora fala com o proprio BFF e nao expõe tokens ao navegador.
- A sessao do BFF do portal usa Redis como store primaria com TTL por inatividade e recarga preguiçosa apos restart.
- Refresh OIDC expirado ou invalido derruba a sessao e o portal responde como nao autenticado, em vez de transformar o erro em 500.
- A API continua disponÃ­vel para consumo interno pelo BFF, e CORS pode permanecer apenas por compatibilidade com consumidores diretos.

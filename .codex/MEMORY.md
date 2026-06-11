# Memória do projeto

## Propósito

Sistema de RH corporativo para o mercado brasileiro.

## Fatos consolidados

- O repositório atual e majoritariamente documental; nao foi localizado codigo executavel, manifests de stack ou servicos runtime.
- O produto e um SaaS de RH para empresas brasileiras, com foco no ciclo de vida do colaborador e no conceito Pessoa -> VinculoTrabalhista -> Empresa.
- A documentacao ja descreve modulos para ATS/recrutamento, admissao, cadastro, documentos, ponto/jornada, banco de horas, ferias, beneficios, afastamentos, desligamento, eSocial, portais e workflow.
- O modelo conceitual destaca historico imutavel, auditoria de eventos e regra de que todo registro pertence a uma empresa.
- Foi criada uma revisao critica do UC-JOR e iniciado o detalhamento do UC-FOL com UC-FOL-001 - Cadastrar Rubrica.
- UC-FOL-002 - Configurar Incidencias da Rubrica foi detalhado para separar cadastro estrutural de parametrizacao tributaria, previdenciaria e eSocial.
- UC-FOL-004 foi detalhado para processamento da folha complementar e preservacao da competencia original.
- UC-FOL-005 foi detalhado para processamento de adiantamento salarial, deducao futura e integracao financeira.
- UC-FOL-006 foi detalhado para calculo de INSS com memoria de calculo e tratamento de teto previdenciario.
- UC-FOL-007 foi detalhado para calculo de FGTS com base fundiaria e integracao com FGTS Digital.
- UC-FOL-008 foi detalhado para calculo de IRRF com base tributaria e deducoes legais.
- UC-FOL-009 foi detalhado para gerar holerite versionado, auditavel e disponibilizado no portal.
- UC-FOL-010 foi detalhado para fechamento formal da folha e bloqueio de alteracoes.
- UC-BI-001 a UC-BI-010 foram detalhados para consultas executivas, operacionais e exportacao de indicadores.
- UC-SEC-001 a UC-SEC-010 foram detalhados para perfis, permissao, MFA, SSO, consentimento, titular, anonimização, retencao, incidentes e auditoria.
- UC-API-001 a UC-API-010 foram detalhados para cadastro, webhooks, eventos, ERP, banco, beneficios, identidade e monitoramento de integracoes.
- UC-PLT-001 a UC-PLT-010 foram detalhados para tenant, empresa, filial, isolamento, parametrizacao, disponibilidade, backup, restauracao, performance e governanca.
- UC-BI-001 a UC-BI-010, UC-SEC-001 a UC-SEC-010, UC-API-001 a UC-API-010 e UC-PLT-001 a UC-PLT-010 foram expandidos em documentacao detalhada e indices proprios.
- A continuidade e o mapa do projeto foram limpos para refletir a conclusao dos pacotes UC-JOR, UC-FOL, UC-BI, UC-SEC, UC-API e UC-PLT.
- `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` e `.codex/OPEN_QUESTIONS.md` foram atualizados para tratar a especificacao catalogada como concluida e a implementacao como pendente; depois, a trilha minima de eSocial da admissao passou a existir no runtime.
- Os pacotes UC-ADM, UC-FOL, UC-BEN, UC-FER, UC-DEC, UC-RES, UC-SST, UC-ESO, UC-COL, UC-GST, UC-WFL, UC-GED, UC-ATS, UC-ONB, UC-LMS, UC-PER e UC-CAR receberam READMEs de pacote para cobrir o esboço documental completo.
- Os pacotes UC-GST, UC-WFL, UC-GED, UC-ATS, UC-ONB, UC-LMS, UC-PER e UC-CAR foram detalhados em nivel individual, cobrindo portal do gestor, workflow, gestao documental, ATS, onboarding, LMS, avaliacao de desempenho e cargos/salarios/carreira.
- Os pacotes UC-FER, UC-RES, UC-BEN, UC-SST, UC-ESO, UC-SEC, UC-API, UC-PLT e UC-DEC foram detalhados em nivel individual, cobrindo ferias, rescisao, beneficios, SST, eSocial, seguranca, integracoes, plataforma e 13o salario.
- `docs/MATRIZ-TECNICA-ESBOCO.md` foi criado para orientar a discussao tecnica e a priorizacao do MVP.
- `docs/TOPICO-01-FUNDACAO-DA-PLATAFORMA.md` foi criado para detalhar a base tecnica, o estilo arquitetural e os requisitos de operacao inicial.
- `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md` foi criado para detalhar o modelo de dados central, entidades, relacoes e regras de integridade.
- `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md` foi criado para detalhar o cadastro-base do colaborador e a formalizacao do vinculo.
- `docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md` foi criado para detalhar a admissao digital, o checklist documental e os eventos eSocial iniciais; a trilha minima de eSocial da admissao ja foi materializada em runtime.
- `docs/TOPICO-05-JORNADA-PONTO-E-FOLHA.md` foi criado para detalhar a cadeia operacional entre jornada, ponto, apuracao e reflexo em folha.
- `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md` foi criado para detalhar o ciclo de beneficios, ferias, 13o e rescisao.
- `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md` foi criado para detalhar SST, medicina ocupacional e compliance.
- `docs/TOPICO-08-PORTAIS-WORKFLOW-E-DOCUMENTOS.md` foi criado para detalhar portais, workflow e documentos.
- `docs/TOPICO-09-BI-LGPD-INTEGRACOES-E-AUDITORIA.md` foi criado para detalhar BI, LGPD, integracoes e auditoria.
- `docs/TOPICO-10-MVP-E-BASE-EXECUTAVEL.md` foi criado para detalhar o recorte do MVP e a base executavel.
- A base executavel inicial ja esta materializada no monorepo com `@rh/api`, `@rh/web` e `@rh/worker`.
- O slice inicial da API agora expõe contrato versionado em `api/v1`, validacao global e trilha de auditoria relacional via Prisma.
- O backend do slice inicial conecta tenant, empresa, pessoa, colaborador e ponto com resumo e consulta de eventos.
- UC-ADM-001 passou a ser o cadastro-base do colaborador; UC-ADM-005 passou a formalizar o vínculo contratual.
- UC-ADM-010 foi alinhado ao catálogo mestre como desligamento administrativo.
- UC-JOR-011 e UC-JOR-012 foram formalizados para fechamento e reabertura de período.
- UC-JOR-008 passou a incluir adicional noturno como extensão formal do cálculo.
- UC-JOR-013 foi detalhado para configurar calendários de feriados e exceções por vigência e agora está alinhado ao runtime atual, usando `point-holidays`, `point-tolerance-rules` e `point-devices` por tenant.
- UC-JOR-014 foi detalhado para configurar regras de tolerância de ponto por vigência.
- UC-JOR-015 foi detalhado para registrar e gerenciar dispositivos de ponto.
- UC-JOR-016 foi detalhado para emitir comprovante de marcação.
- UC-JOR-017 foi detalhado para calcular adicional noturno e ja possui calculo/aprovacao em runtime com persistencia relacional.
- UC-JOR-018 foi detalhado para aplicar regras de DSR e descanso semanal e ja possui calculo/aprovacao em runtime com persistencia relacional.
- UC-JOR-019 foi detalhado para consolidar eventos de ponto para folha e ja possui lote auditavel em runtime com calculos aprovados de adicional noturno e DSR.
- O eSocial de admissao e desligamento agora tambem possui reprocessamento explicito em runtime para transmissao falha.
- A consolidacao de eventos de ponto para folha agora tambem tem envio para folha com recibo sintetico auditavel.
- A consolidacao de eventos de ponto para folha agora tambem possui sincronizacao minima com ERP, com recibo sintetico auditavel.
- A consolidacao de eventos de ponto para folha agora tambem possui sincronizacao minima com banco, com recibo sintetico auditavel.
- O runtime tambem ja possui requests persistidos para integracoes minimas de beneficios e identidade, alem de monitoramento basico de integracoes.
- O runtime tambem ja possui retentativa e DLQ basicas para requests de integracao persistidos.
- UC-JOR-020 foi detalhado para exportar espelho e trilhas de auditoria.
- UC-FOL-003 foi detalhado para processamento da folha mensal, memória de cálculo e preparação para conferência.
- O portal web agora possui um workspace operacional da Onda 4, com visao de colaborador, gestor, documentos, excecoes e timeline de workflow derivada do tenant ativo.
- O portal web tambem possui um snapshot analitico da Onda 5, com headcount, pressao de fluxo, auditoria, integracoes e politica base de LGPD visiveis no tenant ativo.
- O portal web tambem expõe uma timeline da Onda 6, mostrando o roadmap dos dominios complementares sem criar ainda o motor funcional desses dominios.
- O runtime agora tambem possui a primeira camada funcional de beneficios, com catalogo por tenant, concessao, suspensao e cancelamento de beneficios para colaboradores.
- O runtime agora tambem possui a primeira camada funcional de ferias, com saldo por periodo, janela concessiva derivada, validacao de conflito de datas, fracionamento, abono pecuniario, solicitacao, aprovacao, aviso formal, pagamento, envio para folha, transmissao ao eSocial e cancelamento auditavel.
- O runtime agora tambem possui a camada funcional completa da Onda 6 para 13o salario, com calculo anual, memoria de avos, medias variaveis, encargos, aprovacao auditavel e ponte para folha.
- O runtime agora tambem possui a primeira base executavel de SST, com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissões eSocial SST versionados por tenant.
- O runtime agora tambem possui a primeira base executavel de ATS, com requisicao de vaga, aprovacao, publicacao, cadastro de candidatos e movimentacao inicial no pipeline.
- O runtime agora tambem possui entrevistas agendadas e avaliacao inicial de candidatos no ATS, com trilha auditavel por tenant.
- O runtime agora tambem possui proposta e conversao para pre-admissao no ATS, criando admissao draft rastreavel ate o fluxo de onboarding.
- O runtime agora tambem possui dossie documental da admissao, com documentos de onboarding versionados e assinatura auditavel, sem misturar contrato com cadastro-base.

## Stack real

- Identificada no codigo do repositorio: TypeScript, NestJS, React, Vite, BullMQ e Node.js.
- O monorepo possui `package.json`, workspaces e apps executaveis para API, web e worker.

## Módulos identificados

- Recrutamento e selecao.
- Admissao e cadastro.
- Estrutura organizacional, cargos, departamentos e centros de custo.
- Documentos e assinaturas.
- Ponto, jornada, banco de horas e espelho de ponto.
- Fechamento, reabertura, rastreabilidade e adicionais complementares do modulo UC-JOR.
- Calendários de feriados e exceções do modulo UC-JOR.
- Regras de tolerância do módulo UC-JOR.
- Dispositivos de ponto do módulo UC-JOR.
- Comprovantes de marcação do módulo UC-JOR.
- Adicional noturno do módulo UC-JOR.
- DSR e descanso semanal do módulo UC-JOR.
- Consolidação de eventos para folha do módulo UC-JOR.
- Exportação de espelho e trilhas do módulo UC-JOR.
- Ferias, afastamentos e desligamento.
- Folha de pagamento, rubricas e parametrizacao de incidencias.
- Configuracao de incidencias, bases e classificacao eSocial da rubrica.
- Processamento da folha mensal com cálculo, conferência e memória por competência.
- Processamento da folha complementar e do adiantamento salarial como eventos distintos da folha mensal.
- Calculo previdenciario de INSS com base, teto e integracao com rotinas fiscais.
- Calculo fundiario de FGTS com memoria, base de incidencia e integracao com FGTS Digital.
- Calculo de IRRF com base tributavel, deducoes e memoria por competencia.
- Geracao de holerite com proventos, descontos, bases e historico por competencia.
- Fechamento formal da folha com congelamento de competencia e auditoria.
- Indicadores de BI para dashboard, headcount, turnover, absenteismo, custos, recrutamento, treinamento, desempenho e SST.
- Governanca de seguranca e LGPD com perfis, permissoes, MFA, SSO, consentimento e auditoria.
- Integracoes e APIs com eventos, webhooks, ERP, banco, beneficios, identidade e monitoramento; o lote de ponto para folha ja possui camadas minimas de sincronizacao com ERP e banco, e beneficios/identidade tambem possuem requests persistidos com retentativa e DLQ basicas.
- Plataforma SaaS com isolamento de tenants, backup, restauracao e governanca operacional.
- Pacotes UC-BI, UC-SEC, UC-API e UC-PLT receberam readmes e detalhamento completo.
- Beneficios.
- Beneficios com catalogo e atribuicao operacional minima.
- Ferias com saldo, solicitacao e aprovacao operacional minima.
- Avaliacao de desempenho.
- Portais do colaborador e do gestor.
- Workflow e aprovacoes.
- eSocial, SST, compliance e auditoria.
- Analytics e BI de RH.
- LGPD, seguranca e governanca.
- Plataforma SaaS.
- Treinamentos e LMS.

## Decisões tomadas

- Tratar a documentacao atual como especificacao preliminar, nao como implementacao validada.
- Priorizar mudancas pequenas e reversiveis enquanto nao existir base executavel.

## Padrões encontrados

- Estrutura forte de especificacao funcional por RN/UC.
- Uso consistente de docs separadas por dominio, caso de uso e arquitetura conceitual.
- Modelagem centrada em pessoa, vinculo trabalhista e eventos historicos.

## Restrições conhecidas

- Ainda nao ha stack, comandos ou ambiente de execucao confirmados.
- Regras legais/trabalhistas e integracoes externas ainda precisam de validacao especializada.
- Dados sensiveis exigem cuidado mesmo nesta fase documental.

## Alertas permanentes

- Tratar dados pessoais e dados sensíveis com cuidado.
- Evitar logs com CPF, documentos, salário, dados médicos, avaliações ou informações disciplinares.
- Validar regras trabalhistas/contábeis com especialistas quando houver impacto legal.

## Atualizacao tecnica

- Stack e arquitetura executavel documentadas: monolito modular com TypeScript, NestJS, React, PostgreSQL, Redis, BullMQ, MinIO, Keycloak e Docker Compose.
- Vertical slice inicial documentado para tenant, autenticacao, cadastro, admissao, ponto, folha e auditoria.
- Infraestrutura minima da proxima etapa definida como ambiente local com Docker Compose, Postgres, Redis, Keycloak, MinIO e pipeline de CI.
- Estrutura inicial do monorepo criada com `package.json`, `tsconfig.base.json`, `apps/api`, `apps/web`, `apps/worker`, `packages/shared` e `infra/docker-compose.yml`.
- Bootstrap local executavel criado para `api`, `web` e `worker` em Node, permitindo subir a base minima sem dependencias instaladas ainda.
- Dependencias reais do monorepo foram instaladas e os workspaces `api`, `web` e `worker` passaram em build e typecheck.
- O slice inicial da API foi versionado em `api/v1`, recebeu validacao global e schema Prisma para PostgreSQL.
- O frontend foi ajustado para descrever o contrato do slice inicial e continua compilando com sucesso.
- O build local confirmou o contrato do slice inicial e a geracao do Prisma Client.
- O smoke test local com PostgreSQL confirmou tenant, company, person, employee, point mark, resumo e auditoria.
- A suite automatizada `apps/api/test/slice.store.test.ts` foi adicionada e passou com tres testes verdes.
- Smoke tests locais confirmaram `api` em `/api/health` e `web` em `http://127.0.0.1:5173`.
- O slice inicial da API agora possui auth/RBAC minima por headers, com guard local e cobertura automatizada em `apps/api/test/authz.http.test.ts`.
- `npm run test -w @rh/api` passou com oito testes verdes cobrindo auth, escopo de tenant e persistencia relacional.
- O slice inicial da API agora aceita Bearer OIDC validado por JWKS em modo hibrido, com cobertura automatizada em `apps/api/test/authz.oidc.test.ts`.
- `npm run test -w @rh/api` passou com dez testes verdes cobrindo auth hibrida, OIDC/JWKS, tenant scope e persistencia relacional.
- O compose local agora sobe `api` em NestJS real, `keycloak` com realm importado e smoke com token emitido pelo IdP validou tenant creation e summary.
- `npm run test -w @rh/api` passou com onze testes verdes cobrindo auth hibrida, OIDC/JWKS, tenant scope, suplementacao de tenant e persistencia relacional.
- O compose local agora deixa a `api` em health check verde e o smoke com token do Keycloak validou o fluxo relacional completo: tenant, company, person, employee, point mark, summary e audit events.
- O tenant access passou a ser materializado no banco em `tenant_access`, permitindo que um bearer OIDC crie o tenant e opere o fluxo sem `x-rh-tenant-id` no caminho feliz.
- `npm run test -w @rh/api` passou com doze testes verdes cobrindo auth hibrida, tenant access local, OIDC/JWKS, tenant scope e persistencia relacional.
- O compose local com API em Nest real, Keycloak importado e Postgres ativo validou o fluxo completo sem dependencia de `x-rh-tenant-id` no caminho feliz OIDC.
- O backend passou a expor `GET /api/v1/tenants/me/access` para listar tenants acessiveis e `POST /api/v1/tenants/:tenantId/access-grants` para conceder acesso adicional a outro subject.
- O fluxo de multi-tenant por OIDC foi validado com grants entre subjects e com listagem de acessos via `tenant_access`.
- `npm run test -w @rh/api` passou com quatorze testes verdes cobrindo auth hibrida, grants, tenant scope, OIDC/JWKS e persistencia relacional.
- O frontend do slice inicial agora usa um BFF local: o navegador fala apenas com o proprio portal, a sessao OIDC fica em cookie HttpOnly com persistencia em Redis, os tenants acessiveis sao listados via proxy e o tenant ativo passa a ser controlado pelo BFF.
- A store do BFF foi validada com recarga pregui�osa do Redis e preserva a sessao e o tenant ativo apos restart do container do portal.
- O BFF passou a indexar sessoes no Redis e valida o health do store, reduzindo dependencia de varredura por chaves e tornando indisponibilidade do Redis visivel no /health.




- Backup/restore do BFF segue via Redis com scripts `npm run backup:bff-sessions` e `npm run restore:bff-sessions`.
- Redis local e a store do BFF agora possuem politica minima documentada: AOF, volume persistente, backup diario ou sob demanda, restore manual e drill recomendado.
- O workspace agora possui `npm run verify:bff-sessions` e o round-trip backup/restore da store do BFF foi validado com a stack local ativa.
- O endurecimento local do Redis do BFF foi fechado com `bff-maintenance` no compose, backup diario, verify semanal e limpeza automatizada de snapshots.
- A plataforma local tambem passou a expor backup, restore e observabilidade minima do compose com `npm run backup:platform`, `npm run restore:platform` e `npm run report:platform`.
- A frente de backup, restore e observabilidade minima da plataforma foi validada com o stack local ativo.
- O portal agora revalida o tenant ativo contra a lista corrente de acessos e limpa o contexto se o acesso foi revogado, fechando a fronteira multi-tenant no BFF.
- A cadeia de CI/CD do repositório foi formalizada com workflows GitHub Actions para `push`/`pull_request` e promocao manual entre ambientes.
- O MVP do produto foi consolidado como plataforma minima, nucleo do colaborador e operacao essencial, com o primeiro release ancorado nos topicos 10, 11 e 12.
- No MVP executavel, `Employee` e a projecao operacional de `VinculoTrabalhista`; o conceito formal permanece como referencia de dominio para expansao posterior.
- O pacote de admissao e desligamento permaneceu em nivel de especificacao funcional por um periodo, mas agora o runtime executa admissao, checklist, formalizacao contratual, a trilha minima de eSocial, o desligamento administrativo minimo, o offboarding minimo, o eSocial de desligamento minimo e um fluxo minimo de rescisao com memoria de calculo e documentos; os fluxos completos continuam pendentes.
- O Topico 04 passou a ter um plano de implementacao separado, com backlog minimo para admissao, checklist documental, formalizacao contratual, eSocial, desligamento administrativo, rescisao e offboarding.
- A etapa 1 do Topico 04 foi decomposta em backlog executavel com foco em solicitacao de admissao, rascunho, vinculacao a pessoa/empresa/employee e auditoria.
- A etapa 1 da admissao ja foi implementada no `@rh/api` com `admission_requests`, historico, cancelamento controlado e auditoria.
- O checklist documental minimo da admissao tambem ja foi implementado no `@rh/api`, com itens obrigatorios, recebimento item a item e transicao automatica para `pending_documents` e `under_review`.
- A formalizacao contratual separada tambem ja foi implementada no `@rh/api`, com `AdmissionContract` como snapshot proprio, vigencia, tipo de contrato, historico e transicao para `completed`.
- O desligamento administrativo minimo tambem ja foi implementado no `@rh/api`, com `TerminationRequest`, aprovacao, efetivacao, bloqueio de apontamentos e trilha de historico/auditoria.
- O offboarding minimo tambem ja foi implementado no `@rh/api`, com `TerminationOffboarding`, fechamento, cancelamento e disparo da transmissao de desligamento.
- O eSocial de desligamento minimo tambem ja foi implementado no `@rh/api`, com `TerminationEsocialTransmission`, fila BullMQ e persistencia de estados `queued`, `sent` e `failed`.
- O fluxo minimo de rescisao tambem ja foi implementado no `@rh/api`, vinculado a desligamento efetivo, com criacao, memoria de calculo, documentos, consulta, fechamento, cancelamento e trilha de historico/auditoria.
- O fluxo minimo de rescisao agora tambem calcula `paymentDueAt` a partir da data de desligamento informada, rastreia assinatura de documentos rescisorios e bloqueia o fechamento enquanto houver documentos sem assinatura.
- O backend e o worker foram ajustados para reduzir exposicao de dados sensiveis em trilhas e logs operacionais, removendo CPF, CNPJ, motivo livre e valores financeiros dos eventos de auditoria mais sensiveis.
- A politica base de LGPD agora esta definida em nivel de classe: retencao por finalidade, exportacao controlada, expurgo de artefatos temporarios e legal hold como excecao.
- A assinatura de documentos rescisorios agora usa `govbr_advanced` como padrao e admite `icp_brasil` como excecao valida.
- A exportacao controlada agora tem formatos permitidos definidos: `json`, `csv`, `pdf` e `zip`, com mascaramento quando necessario.
- O mascaramento de exportacao agora usa tres niveis: `strict`, `controlled` e `aggregate`, aplicados por finalidade.
- A retencao nao tem prazo numerico unico; cada classe de dado deve ter sua politica versionada por finalidade e base legal.
- O backlog pos-MVP foi convertido em sequencia de entrega no `docs/TOPICO-13-BACKLOG-POS-MVP.md`.
- A Onda 1 do pos-MVP foi formalizada em `docs/TOPICO-14-ONDA-1-PACOTE-DE-PONTO.md` para fechar o pacote de ponto.
- A Onda 2 do pos-MVP foi formalizada em `docs/TOPICO-15-ONDA-2-INTEGRACOES-E-CONTRATOS-EXTERNOS.md` para orientar integracoes e contratos externos.
- A Onda 3 do pos-MVP foi formalizada em `docs/TOPICO-16-ONDA-3-PLATAFORMA-E-GOVERNANCA.md` para endurecer plataforma e governanca.
- O backup, restore e observabilidade minima da plataforma foram operacionalizados com scripts dedicados no compose local.
- O isolamento multi-tenant foi endurecido no portal com verificação de tenant ativo contra a lista atual de acessos em cada carga e proxy.
- O CI/CD foi formalizado com workflows GitHub Actions e a promocao entre ambientes ficou documentada como fluxo manual.
- A Onda 3 foi fechada com logs estruturados, telemetria operacional da plataforma e check automatizado de alertas no compose local.
- A Onda 4 do pos-MVP foi formalizada em `docs/TOPICO-17-ONDA-4-PORTAIS-E-WORKFLOW.md` para portais e workflow.
- A Onda 5 do pos-MVP foi formalizada em `docs/TOPICO-18-ONDA-5-BI-LGPD-E-AUDITORIA-AMPLIADA.md` para BI, LGPD e auditoria ampliada.
- A Onda 6 do pos-MVP foi formalizada em `docs/TOPICO-19-ONDA-6-DOMINIOS-COMPLEMENTARES.md` para dominios complementares.
- A Onda 1 recebeu detalhamento executavel em `docs/TOPICO-20-ONDA-1-DETALHAMENTO-EXECUTAVEL-PACOTE-DE-PONTO.md`.
- A Onda 2 recebeu detalhamento executavel em `docs/TOPICO-21-ONDA-2-DETALHAMENTO-EXECUTAVEL-INTEGRACOES-E-CONTRATOS.md`.
- A Onda 3 recebeu detalhamento executavel em `docs/TOPICO-22-ONDA-3-DETALHAMENTO-EXECUTAVEL-PLATAFORMA-E-GOVERNANCA.md`.
- A Onda 4 recebeu detalhamento executavel em `docs/TOPICO-23-ONDA-4-DETALHAMENTO-EXECUTAVEL-PORTAIS-E-WORKFLOW.md`.
- A Onda 5 recebeu detalhamento executavel em `docs/TOPICO-24-ONDA-5-DETALHAMENTO-EXECUTAVEL-BI-LGPD-E-AUDITORIA.md`.
- A Onda 6 recebeu detalhamento executavel em `docs/TOPICO-25-ONDA-6-DETALHAMENTO-EXECUTAVEL-DOMINIOS-COMPLEMENTARES.md`.
- O backend recebeu persistencia minima para calendarios de feriados, regras de tolerancia e dispositivos de ponto, com criacao, consulta e auditoria por tenant.
- A validacao end-to-end da nova camada de ponto continua bloqueada porque o Docker Desktop Service nao esta acessivel e o Postgres local nao sobe neste ambiente.
- Nao foi localizada base de codigo complementar, submodule ou outro repositorio referenciado na arvore atual.
- O arquivo `apps/web/src/portal-workspace.d.ts` foi adicionado para tipar o modulo JS `portal-workspace.js` e fechar o typecheck do `@rh/web`.
- `npm run build` e `npm run typecheck` passaram no monorepo local apos a correcao de tipagem do portal.
- A validacao end-to-end da API continua bloqueada neste ambiente porque o Docker Desktop Linux Engine nao esta disponivel e as portas locais de Postgres/Redis nao estao expostas.
- O host Docker compartilhado usado para a stack do sistema deve ser tratado como `172.17.0.3`; o Docker Desktop local do Windows nao e a origem autoritativa para os smokes do projeto.
- O host compartilhado tem Portainer ativo e varios compose projects, mas a stack do RH nao foi localizada nele nesta rodada.
- O ambiente de desenvolvimento deve usar o Docker local com `docker compose`.
- O ambiente de homologacao deve usar o Portainer no host compartilhado `172.17.0.3`.
- Os templates de variaveis agora estao separados em `infra/.env.development.example` e `infra/.env.homologation.example`.
- A stack de homologacao tem um manifesto base em `infra/docker-compose.homologation.yml`.
- O checklist operacional de homologacao esta em `docs/HOMOLOGATION_CHECKLIST.md`.
- O guia de publicacao de homologacao esta em `docs/HOMOLOGATION_PUBLICATION.md`.
- O mapa de endpoints publicados de homologacao esta em `docs/HOMOLOGATION_ENDPOINT_MAP.md`.
- Os smokes por servico de homologacao estao em `docs/HOMOLOGATION_SMOKES.md`.
- O runbook rapido de homologacao esta em `docs/HOMOLOGATION_RUNBOOK.md`.
- O contexto local de acesso ao host compartilhado foi guardado em `.codex/LOCAL_ACCESS_CONTEXT.md` e deve ser carregado no inicio de cada sessao.
- Com o Docker local disponivel, `postgres` e `redis` foram subidos via `infra/docker-compose.yml` e `npm run test -w @rh/api` passou com 70 testes verdes.
- O stack local completo foi subido com `api`, `web`, `worker`, `keycloak`, `postgres`, `redis` e `minio`; o smoke OIDC real com Keycloak retornou token e permitiu criar tenant e consultar summary na API.
- O Git do workspace foi corrigido definitivamente: a `.git` foi recriada com ownership do usuario atual via arquivos criados pelo workspace, e `git status` voltou a funcionar sem `safe.directory`.
- A revisao do commit inicial apontou apenas higiene de repositório; foi adicionada `.gitattributes` com normalizacao LF e a analise funcional seguinte iniciou em `UC-COL-001 - Acessar Portal do Colaborador`.
- `UC-COL-002 - Consultar Dados Cadastrais` foi detalhado como consulta somente leitura com mascaramento de dados sensiveis, historico resumido e auditoria; o proximo passo e `UC-COL-003 - Solicitar Atualizacao Cadastral`.
- O pacote `UC-COL` foi fechado com `UC-COL-003` a `UC-COL-010`, cobrindo atualizacao cadastral, holerite, informe de rendimentos, ferias, banco de horas, beneficios, solicitacoes ao RH e assinatura eletronica.
- Os pacotes `UC-GST`, `UC-WFL`, `UC-GED`, `UC-ATS`, `UC-ONB`, `UC-LMS`, `UC-PER` e `UC-CAR` tambem foram fechados em documentacao, mantendo o mesmo padrao de consulta controlada, workflow auditavel, prontuario documental e segregacao por finalidade.
- O reporte operacional da plataforma e o check de alertas passaram sem alertas, e `npm run backup:platform` gerou snapshot completo com `postgres.sql`, `bff-sessions.json`, `manifest.json` e `minio-data`.
- `npm run check:platform-alerts` e `npm run report:platform` passaram a incluir o discovery do Keycloak e o readiness do MinIO na telemetria local.
- O placeholder residual `UC-XXX-000` foi removido do `docs/Catálogo Mestre de Casos de Uso.md`, fechando a seção obsoleta de "Próxima Fase".
- A telemetria operacional da plataforma foi refatorada para um helper compartilhado testável, com `npm run test:platform` cobrindo parsing, target URLs e a telemetria explícita.
- O formato do backup da plataforma local também passou a ter helper compartilhado testável, cobrindo derivacao de caminhos e manifesto do snapshot.
- O restore da plataforma local também passou a ter helper compartilhado testável, cobrindo validacao do manifesto e formato do dry-run.
- A política do Redis local e a lógica de retenção/intervalo da manutenção do BFF também passaram a ter helpers testáveis, cobertos por `npm run test:platform` e pelo check operacional do Redis.
- `@rh/shared` passou a ser um pacote real com helpers puros para telemetria, backup, restore, Redis e manutenção do BFF; `npm run lint` e `npm run typecheck` agora validam todas as workspaces com checagens reais.
- A fase de especificações macro foi encerrada em `docs/RN 022 – Arquitetura SaaS, Multiempresa e Multi-Tenant.md`, que agora aponta para `docs/Catálogo Mestre de Casos de Uso.md` como início da fase de casos de uso.
- A primeira decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-ADM.md`, com `UC-ADM` tratado como pacote fundacional do ciclo de vida do colaborador.
- A segunda decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-JOR.md`, com `UC-JOR` tratado como pacote operacional de jornada e ponto.
- A terceira decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-FOL.md`, com `UC-FOL` tratado como pacote legal de folha de pagamento.
- A quarta decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-FER.md`, com `UC-FER` tratado como pacote legal de ferias.
- A quinta decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-RES.md`, com `UC-RES` tratado como pacote legal de rescisao.
- A sexta decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-BEN.md`, com `UC-BEN` tratado como pacote de beneficios.
- A setima decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-SST.md`, com `UC-SST` tratado como pacote de saude e seguranca do trabalho.
- A oitava decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-ESO.md`, com `UC-ESO` tratado como pacote de eSocial.
- A nona decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-SEC.md`, com `UC-SEC` tratado como pacote de seguranca, privacidade e governanca.
- A decima decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-API.md`, com `UC-API` tratado como pacote de integracoes e APIs.
- A decima primeira decomposicao da fase de casos de uso foi iniciada em `docs/README-UC-PLT.md`, com `UC-PLT` tratado como pacote de plataforma SaaS.
- O primeiro caso de uso detalhado da nova fase tambem foi alinhado ao runtime em `docs/UC-ADM-001.md`, marcando a transicao do nivel de pacote para o nivel de caso de uso.
- O segundo caso de uso detalhado da nova fase tambem foi alinhado ao runtime em `docs/UC-ADM-005.md`, fechando a base do vinculo contratual no pacote ADM.
- A trilha de manutencao cadastral do ADM tambem foi sequenciada em `docs/UC-ADM-002.md`, `docs/UC-ADM-003.md` e `docs/UC-ADM-004.md`.
- A trilha de movimentacoes e desligamento do ADM tambem foi sequenciada em `docs/UC-ADM-006.md`, `docs/UC-ADM-007.md`, `docs/UC-ADM-008.md`, `docs/UC-ADM-009.md` e `docs/UC-ADM-010.md`.
- O pacote FOL tinha um arquivo ausente no indice; `docs/UC-FOL-001-cadastrar-rubrica.md` foi criado e o indice foi sincronizado.
- A camada central do pacote FOL tambem foi sequenciada em `docs/UC-FOL-002-configurar-incidencias-da-rubrica.md`, `docs/UC-FOL-003-processar-folha-mensal.md`, `docs/UC-FOL-004-processar-folha-complementar.md` e `docs/UC-FOL-005-processar-adiantamento-salarial.md`.
- A camada de encargos e fechamento do pacote FOL tambem foi sequenciada em `docs/UC-FOL-006-calcular-inss.md`, `docs/UC-FOL-007-calcular-fgts.md`, `docs/UC-FOL-008-calcular-irrf.md`, `docs/UC-FOL-009-gerar-holerite.md` e `docs/UC-FOL-010-fechar-folha-de-pagamento.md`.
- O pacote `UC-FER` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de ferias.
- O pacote `UC-RES` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de rescisao.
- O pacote `UC-BEN` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de beneficios.
- O pacote `UC-SEC` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de seguranca, privacidade e governanca.
- O pacote `UC-API` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de integracoes e APIs.
- O pacote `UC-PLT` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de plataforma SaaS.
- O pacote `UC-SST` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de saude e seguranca do trabalho.
- O pacote `UC-ESO` deixou de ser apenas um indice e recebeu scaffold completo com 10 arquivos individuais de eSocial.
- Os primeiros casos do pacote `UC-ESO` foram alinhados ao runtime real em `docs/UC-ESO-001-configurar-ambiente-esocial.md`, `docs/UC-ESO-002-gerenciar-certificado-digital.md`, `docs/UC-ESO-003-transmitir-evento-s-1000.md`, `docs/UC-ESO-004-transmitir-evento-s-1005.md`, `docs/UC-ESO-005-transmitir-evento-s-1010.md`, `docs/UC-ESO-006-transmitir-evento-s-2200.md`, `docs/UC-ESO-007-transmitir-evento-s-1200.md`, `docs/UC-ESO-008-transmitir-evento-s-1210.md`, `docs/UC-ESO-009-transmitir-evento-s-1299.md` e `docs/UC-ESO-010-conciliar-totalizadores-do-esocial.md`.
- A base configuracional do `UC-JOR` tambem foi sequenciada em `docs/UC-JOR-001-cadastrar-jornada-de-trabalho.md`, `docs/UC-JOR-002-cadastrar-escala-de-trabalho.md`, `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md` e `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md`.
- A trilha operacional do `UC-JOR` tambem foi sequenciada em `docs/UC-JOR-003-registrar-marcacao-de-ponto.md`, `docs/UC-JOR-004-importar-marcacoes-de-ponto.md`, `docs/UC-JOR-005-tratar-inconsistencias-de-ponto.md`, `docs/UC-JOR-006-solicitar-ajuste-de-ponto.md` e `docs/UC-JOR-007-aprovar-ajuste-de-ponto.md`.
- A camada de calculo e consolidacao do `UC-JOR` tambem foi sequenciada em `docs/UC-JOR-008-calcular-horas-extras.md`, `docs/UC-JOR-009-calcular-banco-de-horas.md`, `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md` e `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md`.
- A camada final do `UC-JOR` tambem foi sequenciada em `docs/UC-JOR-010-gerar-espelho-de-ponto.md`, `docs/UC-JOR-011-fechar-periodo-de-ponto.md`, `docs/UC-JOR-012-reabrir-periodo-de-ponto.md`, `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md` e `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md`.
- As rotas persistidas de integracoes da API agora possuem cobertura HTTP ponta a ponta para sync de beneficios e identidade, monitoramento, falha, retentativa e DLQ.

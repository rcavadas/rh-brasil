# Handoff da próxima sessão

## Estado atual

Auditoria inicial concluida.
Frente documental encerrada: nao propor expansao de documentacao por padrao em sessoes futuras; apenas correcao pontual quando solicitada pelo usuario.
O repositorio agora possui base executavel local com `@rh/api`, `@rh/web` e `@rh/worker`.
O ponto de entrada do kit foi endurecido para obrigar a leitura de `.codex/LOCAL_ACCESS_CONTEXT.md` antes de qualquer validacao de runtime, distinguindo explicitamente o Docker local de desenvolvimento e o host `172.17.0.3` de homologacao.
O compose local de DEV usa o projeto `rh-dev`, para nao confundir com a stack `RH` de homologacao.
Foi criado `scripts/session-access-check.ps1` para checar em um unico passo o Docker de desenvolvimento e o Portainer de homologacao.
Na checagem mais recente, o Portainer de homologacao autenticou corretamente, mas nao havia stack RH publicada naquele momento.
A stack Git do repo `rh-brasil` foi criada no Portainer, mas o build direto no endpoint falhou; o root `docker-compose.yml` passou a consumir imagens do GHCR e o workflow `.github/workflows/publish-images.yml` publica `api`, `web` e `worker`.
A publicacao das imagens concluiu, mas o deploy do Portainer ainda falha no pull do GHCR porque o token atual nao possui `packages` scope suficiente.
A trilha minima de eSocial da admissao ja esta no runtime, com fila, worker, consulta de transmissao e persistencia de estados.
Foi criado o documento de continuidade com revisao critica do UC-JOR e inicio detalhado do UC-FOL-001.
UC-FOL-002 foi detalhado em arquivo proprio, separando cadastro estrutural da rubrica da parametrizacao de incidencias.
UC-ADM-001 foi convertido em cadastro-base do colaborador, UC-ADM-005 passou a formalizar o vinculo contratual, UC-ADM-010 foi alinhado ao catalogo mestre e UC-JOR-011/012 foram formalizados.
UC-JOR-008 passou a incluir adicional noturno como extensao formal do calculo.
UC-JOR-013 foi detalhado para calendario de feriados e excecoes por vigencia.
UC-JOR-014 foi detalhado para regras de tolerancia de ponto por vigencia.
UC-JOR-015 foi detalhado para dispositivos de ponto por vigencia.
UC-JOR-016 foi detalhado para comprovante de marcacao e segunda via.
UC-JOR-017 foi detalhado para adicional noturno por competencia e agora tambem esta implementado em runtime com calculo e aprovacao.
UC-JOR-018 foi detalhado para DSR e descanso semanal por competencia e agora tambem esta implementado em runtime com calculo e aprovacao.
UC-JOR-019 foi detalhado para consolidacao de eventos de ponto para folha e agora tambem esta implementado em runtime com lote auditavel e aprovacao.
O eSocial de admissao e desligamento tambem ganhou reprocessamento explicito em runtime para transmissao falha.
A consolidacao de eventos de ponto para folha agora tambem envia o lote aprovado para folha com recibo sintetico auditavel.
O lote de ponto para folha tambem ganhou uma sincronizacao minima com ERP, com recibo sintetico auditavel.
O lote de ponto para folha tambem ganhou uma sincronizacao minima com banco, com recibo sintetico auditavel.
Beneficios e identidade tambem passaram a ter requests persistidos com auditabilidade minima, e o monitoramento de integracoes agora e exposto por um endpoint dedicado.
As integrações persistidas agora tambem aceitam retentativa e DLQ basicas, com monitoramento de attempts e estado final.
UC-JOR-020 foi detalhado para exportacao de espelho e trilhas de auditoria.
UC-FOL-003 foi detalhado para processamento da folha mensal e memoria de calculo.
UC-FOL-004 foi detalhado para processamento da folha complementar.
UC-FOL-005 foi detalhado para processamento de adiantamento salarial e deducao futura.
UC-FOL-006 foi detalhado para calculo de INSS e memoria previdenciaria.
UC-FOL-007 foi detalhado para calculo de FGTS e memoria fundiaria.
UC-FOL-008 foi detalhado para calculo de IRRF e memoria tributaria.
UC-FOL-009 foi detalhado para gerar holerite e disponibilizacao no portal.
UC-FOL-010 foi detalhado para fechamento formal da folha.
UC-BI-001 a UC-BI-010 foram detalhados para indicadores executivos e operacionais de RH.
UC-SEC-001 a UC-SEC-010 foram detalhados para seguranca, LGPD e governanca.
UC-API-001 a UC-API-010 foram detalhados para integracoes, webhooks, eventos e monitoramento.
UC-PLT-001 a UC-PLT-010 foram detalhados para tenant, isolamento, backup, restauracao e governanca de plataforma.
O backlog do Topico 04 agora tem admissao, checklist, formalizacao contratual, eSocial, desligamento administrativo minimo, offboarding minimo e eSocial de desligamento minimo implementados no runtime; rescisao minima tambem existe.
O fluxo minimo de rescisao agora tambem calcula prazo de pagamento a partir da data de desligamento informada, registra assinatura de documentos rescisorios e bloqueia o fechamento enquanto houver documentos sem assinatura.
O backend e o worker foram ajustados para reduzir dados sensiveis em trilhas e logs operacionais, especialmente em auditorias de CPF, CNPJ, motivo livre e valores financeiros.
UC-BI, UC-SEC, UC-API e UC-PLT receberam expansao completa, com readmes e detalhamento dos casos de uso restantes.
O mapa do projeto e a continuidade foram limpos para refletir a conclusao dos pacotes transversais e a transicao para revisao final.
`docs/PRODUCT.md`, `docs/ARCHITECTURE.md` e `.codex/OPEN_QUESTIONS.md` foram sincronizados com o estado de especificacao catalogada concluida e implementacao iniciada.
Foram criados READMEs de pacote para UC-ADM, UC-FOL, UC-BEN, UC-FER, UC-DEC, UC-RES, UC-SST, UC-ESO, UC-COL, UC-GST, UC-WFL, UC-GED, UC-ATS, UC-ONB, UC-LMS, UC-PER e UC-CAR, cobrindo o esboço documental completo.
`docs/MATRIZ-TECNICA-ESBOCO.md` foi criado para organizar a discussão técnica e a priorização do produto.
`docs/TOPICO-01-FUNDACAO-DA-PLATAFORMA.md` foi criado para detalhar a fundação técnica da plataforma.
`docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md` foi criado para detalhar o modelo de dados central.
`docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md` foi criado para detalhar o cadastro e o vínculo do colaborador.
`docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md` foi criado para detalhar a admissao digital e a integração com o eSocial.
`docs/TOPICO-05-JORNADA-PONTO-E-FOLHA.md` foi criado para detalhar a cadeia operacional entre jornada, ponto e folha.
`docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md` foi criado para detalhar benefícios, férias, 13o e rescisão.
`docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md` foi criado para detalhar SST, medicina ocupacional e compliance.
`docs/TOPICO-08-PORTAIS-WORKFLOW-E-DOCUMENTOS.md` foi criado para detalhar portais, workflow e documentos.
`docs/TOPICO-09-BI-LGPD-INTEGRACOES-E-AUDITORIA.md` foi criado para detalhar BI, LGPD, integrações e auditoria.
`docs/TOPICO-10-MVP-E-BASE-EXECUTAVEL.md` foi criado para detalhar o MVP e a base executavel.

## Última sessão

- Data: 2026-06-03
- Objetivo: inicializar a sessao a partir de AGENTS.md e SESSION_START_PROMPT.md.
- O que foi feito: leitura da memoria, docs centrais, arquitetura conceitual e perfis; registro da auditoria inicial.
- Arquivos alterados: `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/HR_DOMAIN.md`, `docs/BACKEND.md`, `docs/LGPD_SECURITY.md`, `docs/INFRASTRUCTURE.md`, `docs/FRONTEND_UX.md`, `docs/TESTING.md`, `docs/DECISIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: leitura documental e inventario da arvore do repositorio.
- Resultado: contexto inicial registrado sem alterar codigo.

## Ultima continuidade

- Data: 2026-06-04
- Objetivo: revisar UC-JOR e iniciar UC-FOL-001.
- O que foi feito: analise critica do pacote UC-JOR, apontamento de lacunas e criacao do documento de continuidade com UC-FOL-001 detalhado.
- Arquivos alterados: `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento do catalogo mestre com os casos UC-JOR e as regras de ponto/folha/eSocial.
- Resultado: continuidade funcional registrada.

## Ultima entrega

- Data: 2026-06-04
- Objetivo: detalhar UC-FOL-002 - Configurar Incidencias da Rubrica.
- O que foi feito: criação do caso de uso UC-FOL-002 para parametrizar incidências, bases e compatibilidade eSocial da rubrica.
- Arquivos alterados: `docs/UC-FOL-002-configurar-incidencias-da-rubrica.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/DECISIONS.md`.
- Validações executadas: cruzamento das regras de folha e eSocial com o catálogo mestre e com o desenho de UC-FOL-001.
- Resultado: UC-FOL-002 registrado e sincronizado na documentação do projeto.

## Última auditoria

- Data: 2026-06-04
- Objetivo: auditar formalmente UC-ADM e UC-JOR.
- O que foi feito: revisão documental dos 20 casos, cruzamento com catálogo mestre e regras de domínio associadas.
- Arquivos alterados: `docs/SESSION_LOG.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RISKS.md`, `.codex/HANDOFF.md`.
- Validações executadas: leitura comparativa de objetivo, fluxos, regras, APIs, eventos e integrações.
- Resultado: divergências e lacunas formais registradas para tratamento antes de seguir com UC-FOL-003.

## Última adequação

- Data: 2026-06-04
- Objetivo: corrigir as divergências encontradas na auditoria formal.
- O que foi feito: `UC-ADM-001` passou a ser apenas o cadastro-base do colaborador, `UC-ADM-005` passou a formalizar o vínculo contratual, `UC-ADM-010` foi alinhado ao catálogo mestre, `UC-JOR-011` e `UC-JOR-012` foram formalizados, `UC-JOR-008` passou a incluir adicional noturno como extensão formal e `UC-FOL-003` foi criado para o processamento da folha mensal.
- Arquivos alterados: `docs/UC-ADM-001.md`, `docs/UC-ADM-005.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/README-UC-JOR.md`, `docs/UC-JOR-008-calcular-horas-extras.md`, `docs/UC-JOR-011-fechar-periodo-de-ponto.md`, `docs/UC-JOR-012-reabrir-periodo-de-ponto.md`, `docs/UC-FOL-003-processar-folha-mensal.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/DECISIONS.md`, `docs/RISKS.md`.
- Validações executadas: revisão das alterações com cruzamento do catálogo mestre, pacotes UC-ADM e UC-JOR, regras de jornada/folha/eSocial e regras de folha mensal.
- Resultado: divergências principais corrigidas, pacote de ponto ampliado com fechamento, reabertura e adicional noturno e folha mensal iniciada.

## Última entrega complementar

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-013 - Configurar Calendário de Feriados e Exceções.
- O que foi feito: criação do caso de uso UC-JOR-013 para configurar calendário de feriados e exceções por vigência, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-002, UC-JOR-005, UC-JOR-008, UC-JOR-011 e UC-JOR-012, além das regras de feriados, tolerâncias e integração com ponto.
- Resultado: calendário de feriados e exceções formalizado como UC-JOR-013.

## Última entrega complementar 2

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-014 - Configurar Regras de Tolerância de Ponto.
- O que foi feito: criação do caso de uso UC-JOR-014 para configurar regras de tolerância de ponto por vigência, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-001, UC-JOR-005, UC-JOR-008, UC-JOR-013 e com as regras de tolerância de ponto, precedência e vigência.
- Resultado: regras de tolerância formalizadas como UC-JOR-014.

## Última entrega complementar 3

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-015 - Registrar e Gerenciar Dispositivos de Ponto.
- O que foi feito: criação do caso de uso UC-JOR-015 para registrar e gerenciar dispositivos de ponto, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-003, UC-JOR-004, UC-JOR-005, UC-JOR-013 e UC-JOR-014, além das regras de origem de marcação, rastreabilidade e privacidade.
- Resultado: dispositivos de ponto formalizados como UC-JOR-015.

## Última entrega complementar 4

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-016 - Emitir Comprovante de Marcação.
- O que foi feito: criação do caso de uso UC-JOR-016 para emissão, consulta e reemissão de comprovante de marcação, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-003, UC-JOR-015 e com as regras de comprovante, origem de marcação, permissões e auditoria.
- Resultado: comprovante de marcação formalizado como UC-JOR-016.

## Última entrega complementar 5

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-017 - Calcular Adicional Noturno.
- O que foi feito: criação do caso de uso UC-JOR-017 para cálculo do adicional noturno, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-008, RN-121 a RN-125 e com o pacote de ponto para manter coerência entre adicional noturno, horas extras e folha.
- Resultado: adicional noturno formalizado como UC-JOR-017.

## Última entrega complementar 6

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-018 - Aplicar Regras de DSR e Descanso Semanal.
- O que foi feito: criação do caso de uso UC-JOR-018 para aplicação de DSR e descanso semanal, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com RN-169, RN-171 a RN-173, RN-223 e com o pacote de ponto para manter coerência entre faltas, domingos, feriados e reflexos de descanso semanal.
- Resultado: DSR e descanso semanal formalizados como UC-JOR-018.

## Última entrega complementar 7

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-019 - Consolidar Eventos de Ponto para Folha.
- O que foi feito: criação do caso de uso UC-JOR-019 para consolidar eventos de ponto com reflexo em folha, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-008, UC-JOR-017, UC-JOR-018 e com o pacote de folha para manter coerência entre eventos de ponto, rubricas e competências.
- Resultado: consolidação de eventos para folha formalizada como UC-JOR-019.

## Última entrega complementar 8

- Data: 2026-06-04
- Objetivo: detalhar UC-JOR-020 - Exportar Espelho e Trilhas de Auditoria.
- O que foi feito: criação do caso de uso UC-JOR-020 para exportação controlada de espelho e trilhas de auditoria, com atualização do pacote UC-JOR, do catálogo mestre, da continuidade e dos artefatos de navegação.
- Arquivos alterados: `docs/UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md`, `docs/README-UC-JOR.md`, `docs/Catálogo Mestre de Casos de Uso.md`, `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: cruzamento com UC-JOR-003, UC-JOR-016 e com os controles de LGPD, auditoria e retenção.
- Resultado: exportação de espelho e trilhas formalizada como UC-JOR-020.

## Sessão atual

- Data: 2026-06-06
- Objetivo: iniciar a sessão, validar o workspace e seguir com as etapas silenciosamente.
- O que foi feito: leitura obrigatória de memória e documentação central, confirmação de perfis aplicáveis, validação do monorepo com `npm run build` e `npm run typecheck`, correção de tipagem do portal com `apps/web/src/portal-workspace.d.ts` e tentativa de validação da API.
- Resultado da validação: `npm run build` e `npm run typecheck` passaram; a suíte da API nao concluiu neste ambiente porque o Docker Desktop Linux Engine nao esta disponível e não há Postgres/Redis locais ativos para o slice de integração.
- Arquivos alterados: `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `.codex/RISKS.md`, `.codex/SESSION_LOG.md` e `apps/web/src/portal-workspace.d.ts`.
- Próximo passo recomendado: retomar a suite da API e a validacao do runtime quando o Docker host local estiver disponível.

## Atualizacao Git

- Data: 2026-06-11
- O que foi feito: a `.git` foi removida e recriada com ownership do usuario atual via arquivos criados pelo workspace; os metadados Git foram reconstruidos manualmente sem depender de `git init`.
- Estado atual: `git status` agora funciona sem `safe.directory` ou outros workarounds.
- Implicacao: o workspace voltou a ter operacao Git normal; o override global temporario foi removido.

## Atualizacao de Analise

- Data: 2026-06-11
- O que foi feito: a revisao do commit inicial encontrou apenas um ponto de higiene de repositorio, corrigido com `.gitattributes` para LF; a nova frente funcional iniciada foi `UC-COL-001 - Acessar Portal do Colaborador`.
- Estado atual: o backlog de analise passou a ter `UC-COL-002 - Consultar Dados Cadastrais` como proximo caso concreto.

## Atualizacao UC-COL

- Data: 2026-06-11
- O que foi feito: `UC-COL-002 - Consultar Dados Cadastrais` foi detalhado com fluxo de leitura, mascaramento de dados sensiveis, auditoria e tratamento de tenant revogado.
- Estado atual: o pacote `UC-COL` foi fechado com `UC-COL-003` a `UC-COL-010`, cobrindo autosservico, consulta, solicitacoes e assinatura eletronica.

## Ultima expansao transversal

- Data: 2026-06-04
- Objetivo: expandir os blocos resumidos UC-BI, UC-SEC, UC-API e UC-PLT.
- O que foi feito: revisao e detalhamento completo dos casos de uso de BI, seguranca, APIs e plataforma, com inclusao de readmes de pacote e atualizacao dos indices de navegacao.
- Arquivos alterados: `docs/README-UC-BI.md`, `docs/README-UC-SEC.md`, `docs/README-UC-API.md`, `docs/README-UC-PLT.md`, `docs/UC-BI-001-consultar-dashboard-executivo.md`, `docs/UC-BI-002-consultar-headcount.md`, `docs/UC-BI-003-consultar-turnover.md`, `docs/UC-BI-004-consultar-absenteismo.md`, `docs/UC-BI-005-consultar-custos-de-pessoal.md`, `docs/UC-BI-006-consultar-indicadores-de-recrutamento.md`, `docs/UC-BI-007-consultar-indicadores-de-treinamento.md`, `docs/UC-BI-008-consultar-indicadores-de-desempenho.md`, `docs/UC-BI-009-consultar-indicadores-de-sst.md`, `docs/UC-BI-010-exportar-indicadores.md`, `docs/UC-SEC-001-gerenciar-perfis-de-acesso.md`, `docs/UC-SEC-002-gerenciar-permissoes.md`, `docs/UC-SEC-003-configurar-mfa.md`, `docs/UC-SEC-004-configurar-sso.md`, `docs/UC-SEC-005-registrar-consentimento.md`, `docs/UC-SEC-006-atender-solicitacao-do-titular.md`, `docs/UC-SEC-007-anonimizar-dados.md`, `docs/UC-SEC-008-aplicar-politica-de-retencao.md`, `docs/UC-SEC-009-registrar-incidente-de-seguranca.md`, `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`, `docs/UC-API-001-cadastrar-integracao.md`, `docs/UC-API-002-configurar-api-rest.md`, `docs/UC-API-003-configurar-webhook.md`, `docs/UC-API-004-publicar-evento.md`, `docs/UC-API-005-consumir-evento.md`, `docs/UC-API-006-integrar-com-erp.md`, `docs/UC-API-007-integrar-com-banco.md`, `docs/UC-API-008-integrar-com-operadora-de-beneficios.md`, `docs/UC-API-009-integrar-com-provedor-de-identidade.md`, `docs/UC-API-010-monitorar-integracoes.md`, `docs/UC-PLT-001-cadastrar-tenant.md`, `docs/UC-PLT-002-cadastrar-empresa.md`, `docs/UC-PLT-003-cadastrar-filial.md`, `docs/UC-PLT-004-configurar-isolamento-de-dados.md`, `docs/UC-PLT-005-configurar-parametrizacoes-por-tenant.md`, `docs/UC-PLT-006-monitorar-disponibilidade.md`, `docs/UC-PLT-007-executar-backup.md`, `docs/UC-PLT-008-executar-restauracao.md`, `docs/UC-PLT-009-monitorar-performance.md`, `docs/UC-PLT-010-auditar-governanca-da-plataforma.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: revisao documental, alinhamento de indices e padronizacao estrutural dos pacotes transversais.
- Resultado: blocos transversais detalhados e prontos para continuidade do projeto.

## Próxima ação recomendada

Sequência UC-JOR concluída.
Ao retomar, revisar primeiro `docs/RISKS.md`, `docs/SESSION_LOG.md` e `docs/CONTINUIDADE-UC-JOR-E-UC-FOL.md` para manter a sequência do pacote e decidir entre revisão transversal ou expansão dos blocos resumidos de `UC-BI`, `UC-SEC`, `UC-API` e `UC-PLT`.

## Pendências críticas

- [ ] Confirmar stack real e estrutura executavel.
- [ ] Validar o MVP e a ordem de entrega dos modulos.
- [ ] Definir comandos de teste/build quando houver base de codigo.
- [ ] Fechar controles de LGPD, auditoria e retencao.
- [ ] Revisar blocos resumidos de UC-BI, UC-SEC, UC-API e UC-PLT.

## Riscos conhecidos

- Documentacao inicial pode estar incompleta ou divergente do codigo.

## Atualizacao de stack

- A stack executavel e a arquitetura inicial foram documentadas.
- O primeiro vertical slice do produto agora tem schema Prisma para PostgreSQL e contratos validados em build e runtime.
- A proxima etapa natural e endurecer auth/RBAC e automatizar os testes de integracao.

## Infraestrutura imediata

- A proxima etapa deve ser tratada como desenvolvimento local; homologacao fica reservada ao Portainer no host compartilhado `172.17.0.3`.
- A infraestrutura minima precisa subir api, web, worker, postgres, redis, keycloak e minio em compose.
- A fase de producao ainda nao e o alvo.
- O monorepo inicial e os arquivos basicos de infraestrutura ja foram criados e os workspaces principais compilam.
- O bootstrap local agora sobe com runtime minimo em Node para api, web e worker, servindo apenas como base inicial de validacao.
- As dependencias reais foram instaladas e a base passou em build e typecheck nos workspaces principais.
- O slice inicial da API foi versionado em `api/v1` com validacao global e schema Prisma.
- O smoke test local com Postgres confirmou o fluxo relacional completo do slice inicial.
- A suite automatizada do `@rh/api` passou com tres testes verdes contra o Postgres local.

## Ultima entrega tecnica

- Data: 2026-06-04
- Objetivo: implementar auth/RBAC minima no slice inicial e automatizar a cobertura.
- O que foi feito: adicao de guard local baseado em headers (`x-rh-user-id`, `x-rh-role`, `x-rh-tenant-id`), aplicacao de roles por rota, protecao de escopo por tenant, cobertura em `apps/api/test/authz.http.test.ts` e ajuste do bootstrap da API para registrar o guard com `Reflector`.
- Arquivos alterados: `apps/api/src/authz.ts`, `apps/api/src/authz.decorators.ts`, `apps/api/src/authz.guard.ts`, `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/api/src/health.controller.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/package.json`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: `npm run test -w @rh/api` com oito testes verdes e `npm run build` com sucesso.
- Riscos: auth atual ainda e local por headers e nao substitui um IdP real; Keycloak/OIDC continua sendo o proximo passo.
- Proxima ação: integrar Keycloak/OIDC real e expandir a cobertura automatizada de auth/RBAC.

## Ultima entrega tecnica 2

- Data: 2026-06-04
- Objetivo: habilitar o caminho OIDC/JWKS no `@rh/api` sem quebrar o fallback local.
- O que foi feito: implementacao de resolucao hibrida de autenticacao com `Authorization: Bearer <token>` validado por OIDC/JWKS, mantendo fallback por headers para o modo misto/local; adicao de testes para validacao de token assinado e preferencia do bearer sobre headers; ajuste do texto tecnico para refletir o suporte real ao IdP.
- Arquivos alterados: `apps/api/src/authz.ts`, `apps/api/src/authz.guard.ts`, `apps/api/test/authz.oidc.test.ts`, `apps/api/package.json`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: `npm run test -w @rh/api` com dez testes verdes e `npm run build` com sucesso.
- Riscos: o ambiente local ainda precisa provisionar realm, client e mappers do Keycloak para uso operacional completo.
- Proxima ação: provisionar o realm/client do Keycloak no compose e validar o fluxo com um token emitido pelo IdP real.

## Ultima entrega tecnica 3

- Data: 2026-06-04
- Objetivo: fechar a validacao em runtime do compose com Keycloak e API reais.
- O que foi feito: correção do Dockerfile da API para subir o NestJS compilado, ajuste do compose para usar endpoints internos (`postgres`, `redis`, `keycloak`, `minio`) e hostname fixo do Keycloak, rebuild da imagem, subida do stack local e smoke end-to-end com token emitido pelo Keycloak, criação de tenant e leitura de summary na API containerizada.
- Arquivos alterados: `apps/api/Dockerfile`, `infra/docker-compose.yml`, `infra/.env.example`, `infra/keycloak/rh-realm.json`, `apps/api/src/authz.ts`, `apps/api/src/authz.guard.ts`, `apps/api/test/authz.oidc.test.ts`, `apps/api/package.json`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Validações executadas: `npm run test -w @rh/api` com onze testes verdes, `npm run build` com sucesso, `docker compose build --no-cache api`, `docker compose up -d api keycloak postgres redis minio`, discovery OIDC com issuer `http://keycloak:8080/realms/rh` e smoke end-to-end com token do Keycloak contra a API.
- Riscos: o realm local ainda é mínimo e o fluxo completo de criação de empresa/pessoa/employee com token do Keycloak pode exigir um smoke adicional, mas a fronteira principal de autenticação já foi validada.
- Proxima ação: expandir o smoke com token Keycloak para o fluxo completo do slice relacional e, depois, seguir para hardening adicional de claims/tenant.

## Ultima entrega tecnica 4

- Data: 2026-06-04
- Objetivo: validar o fluxo relacional completo com o token do Keycloak e corrigir o healthcheck do compose.
- O que foi feito: corre��o do healthcheck da `api` para `/api/health`, recria��o do container at� ficar `healthy`, execu��o de smoke end-to-end com token emitido pelo realm local e valida��o completa do fluxo tenant -> company -> person -> employee -> point mark -> summary -> audit events.
- Arquivos alterados: `infra/docker-compose.yml`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `docker compose up -d api`, `docker compose ps api` em estado `healthy`, smoke com token Keycloak contra a API containerizada e valida��o do fluxo relacional completo.
- Riscos: ainda falta endurecer o claim de tenant no token para reduzir a depend�ncia do header no modo misto.
- Proxima a��o: mapear tenant claim definitivo no realm do Keycloak e reduzir a necessidade de `x-rh-tenant-id` nos fluxos mistos.

## Ultima entrega tecnica 5

- Data: 2026-06-04
- Objetivo: eliminar a dependencia de `x-rh-tenant-id` no caminho feliz OIDC e registrar o acesso no banco.
- O que foi feito: criacao da tabela `tenant_access` no Prisma, gravacao automatica do vinculo quando um tenant e criado por um sujeito autenticado, ajuste do guard para consultar esse vinculo quando o bearer OIDC nao traz tenant, adicao de teste HTTP para criar e operar tenant sem header e rebuild da API/container para refletir o novo comportamento.
- Arquivos alterados: `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604193000_tenant_access/migration.sql`, `apps/api/src/authz.decorators.ts`, `apps/api/src/authz.guard.ts`, `apps/api/src/main.ts`, `apps/api/src/slice.controller.ts`, `apps/api/src/slice.store.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/Dockerfile`, `infra/docker-compose.yml`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run test -w @rh/api` com doze testes verdes, `npm run build` com sucesso, `npx prisma migrate deploy` aplicado localmente, `docker compose up -d --build api`, `docker compose ps api` em estado `healthy` e smoke end-to-end com token do Keycloak criando tenant e operando company/person/employee/point/summary/audit sem `x-rh-tenant-id`.
- Riscos: falta definir a pol�tica para usuarios com m�ltiplos tenants e eventual troca de tenant por token no mesmo subject.
- Proxima a��o: modelar m�ltiplos v�nculos por usu�rio OIDC e, se necess�rio, expor escolha de tenant explicitamente no token ou em um endpoint de contexto.

## Ultima entrega tecnica 6

- Data: 2026-06-04
- Objetivo: fechar a politica de multiplos tenants com grant entre subjects e listagem de contexto.
- O que foi feito: adicao de `GET /api/v1/tenants/me/access` e `POST /api/v1/tenants/:tenantId/access-grants`, validacao de grant entre subjects OIDC e cobertura automatizada para o caso de um usuario receber acesso a um tenant criado por outro subject.
- Arquivos alterados: `apps/api/src/slice.controller.ts`, `apps/api/src/slice.store.ts`, `apps/api/test/authz.http.test.ts`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run test -w @rh/api` com quatorze testes verdes e `npm run build` com sucesso.
- Riscos: o backend ja resolve lista e grant, mas a UX para selecao de tenant ativo ainda nao foi definida no frontend.
- Proxima a��o: desenhar a experiencia de selecao de tenant ativo e persistencia de contexto no `@rh/web`.

## Ultima entrega tecnica 7

- Data: 2026-06-04
- Objetivo: implementar a selecao de tenant ativo no frontend do slice inicial.
- O que foi feito: transformacao do `@rh/web` em uma tela de contexto que aceita Bearer OIDC manual, carrega `GET /api/v1/tenants/me/access`, permite selecionar o tenant ativo e persiste a escolha localmente; atualizacao do CSS para uma interface responsiva e orientada a contexto.
- Arquivos alterados: `apps/web/src/App.tsx`, `apps/web/src/styles.css`, `docs/FRONTEND_UX.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: build do monorepo apos a mudanca no frontend.
- Riscos: a sessao ainda depende de token colado manualmente; falta login OIDC real integrado ao portal.
- Proxima a��o: integrar a autenticacao do portal com o fluxo OIDC real e remover a colagem manual do token.

## Ultima entrega tecnica 8

- Data: 2026-06-04
- Objetivo: integrar login OIDC real no portal web e alinhar o runtime local.
- O que foi feito: transformacao do `@rh/web` em um portal que autentica via Keycloak local com Authorization Code + PKCE, carrega `GET /api/v1/tenants/me/access`, permite selecionar o tenant ativo e persiste a escolha no navegador; ajuste da API para expor CORS ao portal local; atualizacao do Dockerfile do `web` para build e preview do bundle Vite.
- Arquivos alterados: `apps/api/src/main.ts`, `apps/web/src/App.tsx`, `apps/web/src/styles.css`, `apps/web/package.json`, `apps/web/Dockerfile`, `infra/docker-compose.yml`, `infra/.env.example`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` com sucesso e `npm run test -w @rh/api` com quatorze testes verdes.
- Riscos: renovacao de access/refresh token e durabilidade da sessao no navegador ainda precisam de endurecimento.
- Proxima a��o: definir a estrategia de renovacao/expiracao da sessao OIDC no portal.


## Ultima entrega tecnica 9

- Data: 2026-06-04
- Objetivo: endurecer a sessao OIDC do portal web com renovacao automatica e logout redirecionado.
- O que foi feito: adicao de refresh token no fluxo OIDC do `@rh/web`, renovacao automatica antes do vencimento, retry de leitura do contexto em caso de `401`, logout redirecionado para o Keycloak local, e persistencia dos tokens/session state do portal no navegador.
- Arquivos alterados: `apps/web/src/App.tsx`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` com sucesso.
- Riscos: armazenamento local de refresh token ainda exige validacao de seguranca e politica de expiracao no navegador.
- Proxima a��o: definir a estrategia final de armazenamento e rotacao de refresh token no portal.

## Ultima entrega tecnica 10

- Data: 2026-06-04
- Objetivo: reduzir a persistencia de tokens do portal no navegador.
- O que foi feito: migracao dos tokens OIDC do `@rh/web` para `sessionStorage`, mantendo apenas o tenant ativo em `localStorage`; preservacao do refresh automatico e do logout redirecionado para o Keycloak local.
- Arquivos alterados: `apps/web/src/App.tsx`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `docs/TESTING.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` com sucesso.
- Riscos: a estrategia definitiva de armazenamento ainda pode evoluir para um BFF, se o produto exigir isolamento maior.
- Proxima a��o: decidir se o portal permanece com OIDC direto no browser ou migra para um BFF.

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

## Ultima entrega tecnica 14

- Data: 2026-06-04
- Objetivo: mover a sessao do BFF para Redis como store primaria e validar persistencia apos restart.
- O que foi feito: o `@rh/web` passou a usar Redis como fonte primaria da sessao, com TTL por inatividade, recarga pregui�osa quando o cookie aponta para um estado ainda nao carregado em memoria e volume `redis_data` com AOF no compose; o arquivo JSON legado ficou apenas como ponte de migracao.
- Arquivos alterados: `apps/web/src/bootstrap.js`, `infra/docker-compose.yml`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` com sucesso; seed de sessao via `rh-web` no Redis; `GET /api/session` autenticado via cookie; `POST /api/session/active-tenant`; reinicio do `web`; `GET /api/session` retornando o mesmo `activeTenantId` apos restart.
- Riscos: o Redis local continua sendo um ponto unico de persistencia no ambiente de desenvolvimento; para producao, backup, observabilidade e politica de retencao precisam ser definidos.
- Proxima a��o: se o fluxo for mantido, seguir para endurecimento operacional do Redis ou para outra frente de produto.
## Ultima entrega tecnica 15

- Data: 2026-06-04
- Objetivo: endurecer a operacao do BFF em Redis com health real, index de sessoes e tratamento de refresh expirado.
- O que foi feito: o `@rh/web` passou a indexar sessoes no Redis para reduzir dependencia de `SCAN`, o `/health` do portal passou a refletir a disponibilidade do Redis, e refresh OIDC expirado agora invalida a sessao em vez de gerar `500`.
- Arquivos alterados: `apps/web/src/bootstrap.js`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` com sucesso; smoke do `/health` com Redis ok; smoke de `GET /api/session` com cookie novo; `POST /api/session/active-tenant`; restart do `web`; `GET /api/session` retornando o mesmo `activeTenantId` apos restart.
- Riscos: Redis ainda e um ponto unico de persistencia no ambiente local e o portal continua dependente de que o store esteja disponivel para manter a sessao autenticada.
- Proxima a��o: endurecer backup/observabilidade do Redis ou seguir para outra frente de produto.

## Ultima entrega tecnica 16

- Data: 2026-06-04
- Objetivo: ampliar a observabilidade operacional do BFF e do store Redis.
- O que foi feito: o `@rh/web` passou a expor `GET /api/session-store` com snapshot operacional do store e a incluir no `/health` a visibilidade de Redis, sess�es em memoria, indice, timestamps de carga/escrita e detec��o de drift; os logs de conex�o/reconex�o do Redis tambem foram habilitados.
- Arquivos alterados: `apps/web/src/bootstrap.js`, `docs/ARCHITECTURE.md`, `docs/BACKEND.md`, `docs/FRONTEND_UX.md`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: `npm run build` com sucesso; `GET /health` retornando snapshot de Redis; `GET /api/session-store` sem necessidade de login; `scard rh:web:sessions` confirmando o indice.
- Riscos: backup, restore e monitoramento externo do Redis continuam pendentes para o ambiente alvo.
- Proxima a��o: endurecer backup/observabilidade do Redis compartilhado ou seguir para outra frente de produto.

## Ultima entrega tecnica 17

- Data: 2026-06-04
- Objetivo: fechar o endurecimento operacional com backup e restore da store do BFF.
- O que foi feito: adicionados os scripts `npm run backup:bff-sessions` e `npm run restore:bff-sessions` para exportar/importar a store do BFF com TTL restante e indice, e a documentacao de infraestrutura passou a registrar o fluxo.
- Arquivos alterados: `package.json`, `scripts/bff-session-backup.mjs`, `scripts/bff-session-restore.mjs`, `docs/INFRASTRUCTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/SESSION_LOG.md`.
- Valida��es executadas: scripts adicionados e integrados ao workspace; a operacao de backup/restore foi documentada como fluxo local de endurecimento.
- Riscos: o backup cobre a store do BFF, mas a politica de backup/restore do Redis compartilhado no ambiente alvo ainda precisa ser definida.
- Proxima a��o: se continuar o endurecimento, definir a politica operacional completa do Redis ou seguir para outra frente de produto.

## Ultima entrega tecnica 18

- Infraestrutura de backup/restore da store do BFF validada e a documentacao foi normalizada.
- O comando `npm run backup:bff-sessions` exporta snapshots do Redis do BFF.
- O comando `npm run restore:bff-sessions` recompoe o indice e as chaves da store no Redis.
## Ultima entrega tecnica 19

- Politica minima operacional do Redis documentada: AOF, volume persistente, backup diario ou sob demanda, restore manual e drill recomendado.
- O BFF continua com health, snapshot operacional e scripts de backup/restore alinhados ao Redis.
## Ultima entrega tecnica 20

- O workspace ganhou `npm run verify:bff-sessions` para validar automaticamente o round-trip backup/restore da store do BFF.
- A validacao real com a stack local ativa confirmou backup, restore temporario e conferência do índice com sucesso.
## Ultima entrega tecnica 21

- O endurecimento local do Redis do BFF foi fechado com `bff-maintenance` no compose, backup diario, verify semanal e limpeza automatizada de snapshots.
- O workspace agora possui backup, restore, verify e manutencao automatica para a store do BFF.
- O compose local tambem passou a expor backup, restore e observabilidade minima da plataforma via `npm run backup:platform`, `npm run restore:platform` e `npm run report:platform`.
- A frente de backup, restore e observabilidade minima da plataforma foi validada com o stack local ativo.
- O portal passou a revalidar o tenant ativo contra a lista corrente de acessos e limpa o contexto quando o acesso revoga, fechando a fronteira multi-tenant no BFF.
- A cadeia de CI/CD foi formalizada com workflows GitHub Actions para `push`/`pull_request` e um fluxo manual de promocao entre ambientes.
- A ultima frente da Onda 3 tambem foi fechada com logs estruturados, telemetria operacional da plataforma e check automatizado de alertas no compose local.
## Ultima entrega tecnica 22

- O recorte do MVP foi fechado nos topicos 10, 11 e 12, com plataforma minima, nucleo do colaborador e operacao essencial como primeira entrega.
- O backlog posterior ao MVP ficou separado como pos-MVP.

## Ultima entrega tecnica 23

- O modelo de dados do MVP foi alinhado para tratar `Employee` como projecao operacional de `VinculoTrabalhista`, mantendo o conceito formal para a evolucao posterior do dominio.
- `docs/TOPICO-02-MODELO-DE-DADOS-CENTRAL.md`, `docs/TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md`, `docs/HR_DOMAIN.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.

## Ultima entrega tecnica 24

- A revisao de admissao e desligamento fechou a leitura de escopo: o pacote UC-ADM e TOPICO-04 permanecem especificacao funcional, mas o runtime executavel atual ainda nao implementa admissao digital, eSocial ou desligamento completo.
- `docs/TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md`, `docs/README-UC-ADM.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md` e `docs/SESSION_LOG.md` foram sincronizados.

## Ultima entrega tecnica 25

- O Topico 04 ganhou um plano de implementacao separado com backlog minimo para admissao, checklist documental, formalizacao contratual, eSocial e desligamento administrativo.
- O runtime tambem ja possui um fluxo minimo de rescisao vinculado ao desligamento efetivo, com memoria de calculo e documentos; o passo seguinte real e detalhar as regras legais finais, assinaturas e prazos da rescisao completa.
- `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `docs/PRODUCT.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.

## Ultima entrega tecnica 26

- A etapa 1 do Topico 04 foi decomposta em backlog executavel com foco em solicitacao de admissao, rascunho, vinculacao a pessoa/empresa/employee e auditoria.
- `docs/TOPICO-04-ETAPA-1-ESTRUTURA-DE-ADMISSAO.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.

## Ultima entrega tecnica 27

- A etapa 1 da admissao foi implementada no `@rh/api` com `admission_requests`, historico, cancelamento controlado e auditoria.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604195000_admission_request/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.

## Ultima entrega tecnica 28

- O checklist documental minimo da admissao entrou no runtime com checklist inicial, recebimento item a item e transicao automatica para pendencia ou revisao.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604201000_admission_checklist/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/TOPICO-04-ETAPA-1-ESTRUTURA-DE-ADMISSAO.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run test -w @rh/api` passou com 19 testes verdes e `npm run build` concluiu com sucesso.

## Ultima entrega tecnica 29

- A formalizacao contratual separada entrou no runtime com `AdmissionContract`, vigencia, tipo de contrato, auditoria e transicao para `completed`.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260604202000_admission_contract/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run test -w @rh/api` com 21 testes verdes e `npm run build` com sucesso.

## Ultima entrega tecnica 30

- O fluxo minimo de rescisao foi refinado com `paymentDueAt`, assinatura rastreavel em documentos rescisorios e bloqueio de fechamento sem documentos assinados.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260605210000_rescission_deadline_signatures/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/README-UC-RES.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `docs/SESSION_LOG.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `.codex/OPEN_QUESTIONS.md` foram sincronizados.
- Validação: `npm run build` com sucesso; `npm run test -w @rh/api` ficou bloqueado porque o Postgres local nao estava acessivel e o daemon do Docker nao respondeu neste ambiente.
- Risco: a politica final de assinatura por tipo documental ainda precisa de validacao juridico-operacional.

## Ultima entrega tecnica 31

- A frente de LGPD e auditoria reduziu a exposicao de dados sensiveis nas trilhas e logs operacionais do `@rh/api` e do `@rh/worker`.
- `apps/api/src/slice.store.ts`, `apps/worker/src/main.ts`, `docs/LGPD_SECURITY.md`, `docs/RISKS.md`, `docs/ARCHITECTURE.md`, `docs/SESSION_LOG.md`, `.codex/MEMORY.md` e `.codex/PROJECT_MAP.md` foram sincronizados.
- Validação: `npm run build` com sucesso.
- Risco: a politica final de retencao, descarte e exportacao de dados ainda precisa ser fechada.

## Ultima entrega tecnica 32

- A politica base de LGPD agora esta registrada em nivel de classe, com retencao por finalidade, exportacao controlada, expurgo de artefatos temporarios e excecao para legal hold.
- `docs/LGPD_SECURITY.md`, `docs/RISKS.md`, `docs/DECISIONS.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/MEMORY.md` e `.codex/PROJECT_MAP.md` foram sincronizados.
- Validacao: leitura cruzada com LGPD art. 16 e nota tecnica orientativa da ANPD sobre retenção prolongada.
- Risco: os prazos numericos finais por classe e os formatos autorizados para exportacao ainda dependem de validacao juridico-operacional.

## Ultima entrega tecnica 33

- A politica de assinatura dos documentos rescisorios foi fechada com `govbr_advanced` como padrao e `icp_brasil` como excecao valida.
- `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `docs/BACKEND.md`, `docs/README-UC-RES.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: Lei 14.063/2020, MP 2.200-2/2001 e orientacao oficial do GOV.BR/ITI sobre assinatura avancada e qualificada.
- Risco: os tipos documentais futuros ainda podem exigir validacao juridico-operacional especifica, mas o contrato do runtime ja ficou fechado.

## Ultima entrega tecnica 34

- Os formatos de exportacao controlada foram fechados em `json`, `csv`, `pdf` e `zip`, com mascaramento quando necessario.
- `docs/LGPD_SECURITY.md`, `docs/DECISIONS.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/OPEN_QUESTIONS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: ANPD e LGPD sobre finalidade, necessidade e portabilidade controlada.
- Risco: ainda nao existe exportador real no runtime; a implementacao futura precisa materializar essa politica.

## Ultima entrega tecnica 35

- A retencao foi fechada por classe de dado e finalidade, sem um prazo numerico unico para todo o produto.
- `docs/LGPD_SECURITY.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/OPEN_QUESTIONS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: a ANPD informa que a LGPD nao fixa prazo unico e que a duracao depende da finalidade e do contexto.
- Risco: classes especificas ainda podem exigir politica versionada por obrigacao legal ou contratual particular.

## Ultima entrega tecnica 36

- A triagem da fila de produto foi praticamente encerrada: a unica pergunta aberta restante e o backlog pos-MVP, sem evidência de repositorio complementar na arvore atual.
- `docs/UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md`, `docs/UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md`, `docs/UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md`, `docs/UC-JOR-016-emitir-comprovante-de-marcacao.md`, `docs/UC-JOR-017-calcular-adicional-noturno.md`, `docs/UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md`, `docs/UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/MEMORY.md`, `docs/PRODUCT.md`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: leitura cruzada do pacote UC-JOR, do backend e da arquitetura executavel; adicional noturno e DSR alinharam com CLT/Lei 605.
- Risco: feriados locais ainda dependem de norma da respectiva localidade e o mapeamento folha permanece configuravel por empresa/competencia.

## Ultima entrega tecnica 37

- O backlog pos-MVP foi formalizado em `docs/TOPICO-13-BACKLOG-POS-MVP.md` e a pergunta aberta remanescente foi fechada.
- `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: leitura cruzada do backlog pos-MVP com o runtime atual e com a sequencia ja consolidada dos topicos 10, 11 e 12.
- Risco: a priorizacao futura ainda dependera de capacidade de entrega e revisao de impacto entre ondas.

## Ultima entrega tecnica 38

- A Onda 1 do pos-MVP foi formalizada em `docs/TOPICO-14-ONDA-1-PACOTE-DE-PONTO.md`, deixando a sequencia de entrega do pacote de ponto explicitada.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento da Onda 1 com o backlog pos-MVP e com os casos UC-JOR-013 a UC-JOR-020.
- Risco: a execucao futura ainda dependera de priorizacao entre ajustes de produto e eventuais mudanças no runtime.

## Ultima entrega tecnica 39

- A Onda 2 do pos-MVP foi formalizada em `docs/TOPICO-15-ONDA-2-INTEGRACOES-E-CONTRATOS-EXTERNOS.md`, deixando a segunda sequencia de entrega explicita.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento da Onda 2 com o backlog pos-MVP e com os blocos de integracao ja catalogados.
- Risco: os contratos externos ainda exigem detalhamento tecnico e validacao operacional antes de implementacao.

## Ultima entrega tecnica 40

- A Onda 3 do pos-MVP foi formalizada em `docs/TOPICO-16-ONDA-3-PLATAFORMA-E-GOVERNANCA.md`, deixando a camada transversal de SaaS explicitada.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento da Onda 3 com o backlog pos-MVP, com a stack executavel e com os riscos operacionais ja registrados.
- Risco: a implementacao futura ainda depende de decisao sobre o ambiente alvo e sobre a estrategia de observabilidade e promocao entre ambientes.
- O endurecimento restante da Onda 3 segue para isolamento multi-tenant, CI/CD e logs/telemetria/alertas.
- Restam apenas CI/CD e logs/telemetria/alertas para fechar a Onda 3.
- Resta apenas logs, telemetria e alertas para fechar a Onda 3.

## Ultima entrega tecnica 41

- A Onda 4 do pos-MVP foi formalizada em `docs/TOPICO-17-ONDA-4-PORTAIS-E-WORKFLOW.md`, deixando portais e workflow explicitados.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento da Onda 4 com o backlog pos-MVP e com os controles de acesso, auditoria e mascaramento ja definidos.
- Risco: a UX e os fluxos de aprovacao ainda vao exigir detalhamento fino na implementacao.

## Ultima entrega tecnica 42

- A Onda 5 do pos-MVP foi formalizada em `docs/TOPICO-18-ONDA-5-BI-LGPD-E-AUDITORIA-AMPLIADA.md`, deixando BI, LGPD e auditoria ampliada explicitados.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento da Onda 5 com a politica de LGPD ja definida e com os blocos de auditoria e exportacao controlada.
- Risco: a analitica e as exportacoes futuras ainda dependem de implementacao tecnica e validacao operacional.

## Ultima entrega tecnica 43

- A Onda 6 do pos-MVP foi formalizada em `docs/TOPICO-19-ONDA-6-DOMINIOS-COMPLEMENTARES.md`, deixando os dominios complementares explicitados.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento da Onda 6 com o backlog pos-MVP e com os dominios ja catalogados para expansao posterior.
- Risco: a expansao complementaria ainda depende de estabilizacao continua do nucleo e das ondas anteriores.

## Ultima entrega tecnica 44

- A Onda 1 recebeu detalhamento executavel em `docs/TOPICO-20-ONDA-1-DETALHAMENTO-EXECUTAVEL-PACOTE-DE-PONTO.md`, convertendo o pacote de ponto em frentes concretas.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento do detalhamento com UC-JOR-013 a UC-JOR-020 e com a Onda 1 formalizada no Topico 14.
- Risco: a implementacao ainda vai exigir priorizacao interna entre as frentes do pacote de ponto.

## Ultima entrega tecnica 45

- As Ondas 2 a 6 receberam detalhamento executavel em `docs/TOPICO-21-ONDA-2-DETALHAMENTO-EXECUTAVEL-INTEGRACOES-E-CONTRATOS.md`, `docs/TOPICO-22-ONDA-3-DETALHAMENTO-EXECUTAVEL-PLATAFORMA-E-GOVERNANCA.md`, `docs/TOPICO-23-ONDA-4-DETALHAMENTO-EXECUTAVEL-PORTAIS-E-WORKFLOW.md`, `docs/TOPICO-24-ONDA-5-DETALHAMENTO-EXECUTAVEL-BI-LGPD-E-AUDITORIA.md` e `docs/TOPICO-25-ONDA-6-DETALHAMENTO-EXECUTAVEL-DOMINIOS-COMPLEMENTARES.md`.
- `.codex/PROJECT_MAP.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cruzamento dos detalhamentos com as ondas formalizadas no Topico 15 ao Topico 19.
- Risco: cada onda ainda exigira priorizacao interna e eventualmente desdobramento mais fino por caso de uso antes da implementacao.

## Ultima entrega tecnica 46

- O backend recebeu persistencia minima para calendarios de feriados, regras de tolerancia e dispositivos de ponto, com criacao, consulta e auditoria por tenant.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260605235000_point_governance/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` ficou bloqueado no ambiente por dependencia do Postgres local.
- Risco: a validacao de runtime da nova migracao e das novas rotas ainda precisa ser concluida com o banco ativo.

## Ultima entrega tecnica 47

- A validacao end-to-end continuou bloqueada porque o Docker Desktop Service nao esta acessivel neste ambiente, impedindo a subida do Postgres local.
- `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md` foram sincronizados para registrar o bloqueio operacional.
- Validacao: tentativa de `npm run test -w @rh/api` com `prisma generate` bem-sucedido, mas sem conexao ao banco em `localhost:5432`.
- Risco: a suite de integracao da API continua dependente de um Postgres local ativo, e a nova camada de ponto ainda nao foi exercitada em runtime.

## Ultima entrega tecnica 48

- A Onda 4 foi materializada no portal com um workspace operacional que resume colaborador, gestor, documentos, excecoes e trilha de workflow a partir do tenant ativo.
- `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `apps/web/src/styles.css`, `apps/web/test/portal-workspace.test.mjs`, `docs/FRONTEND_UX.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/web` passou com 4 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build web` recompilou e subiu o portal; `npm run check:platform-alerts` voltou a `ok`.
- Risco: o workspace e uma camada operacional de leitura e consolidacao de estado; o motor de workflow transacional ainda precisara de contratos mais ricos na evolucao posterior.

## Ultima entrega tecnica 49

- A Onda 5 foi materializada no portal com um snapshot analitico que agrega headcount, pressao de fluxo, auditoria, integracoes e politica base de LGPD a partir do tenant ativo.
- `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `docs/FRONTEND_UX.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` passou com 41 testes verdes; `npm run test -w @rh/web` passou com 4 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build api web` recompilou e subiu os servicos; `npm run check:platform-alerts` voltou a `ok`.
- Risco: o snapshot analitico ainda e uma leitura agregada e nao substitui analytics historico completo nem exportacoes parametrizadas por finalidade.

## Ultima entrega tecnica 50

- A Onda 6 ganhou uma timeline de roadmap no portal com os dominios complementares e a sequencia de expansao visiveis no tenant ativo.
- `apps/web/src/App.tsx`, `apps/web/src/portal-workspace.js`, `apps/web/test/portal-workspace.test.mjs`, `docs/FRONTEND_UX.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/web` passou com 4 testes verdes; `docker compose -f infra/docker-compose.yml up -d --build web` recompilou e subiu o portal; `npm run check:platform-alerts` voltou a `ok`.
- Risco: a Onda 6 ainda e um roadmap visual, nao um motor funcional dos dominios complementares.

## Ultima entrega tecnica 51

- A primeira camada funcional de beneficios entrou no runtime com catalogo por tenant, atribuicao, suspensao e cancelamento de beneficios para colaboradores.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606050000_benefits_catalog_assignments/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` passou com 43 testes verdes; `prisma migrate deploy` aplicou a migracao no Postgres local.
- Risco: o dominio de beneficios ainda e apenas a primeira camada operacional e nao cobre elegibilidade complexa, descontos, cobertura ou integrações externas completas.

## Ultima entrega tecnica 52

- A primeira camada funcional de ferias entrou no runtime com saldo por periodo, solicitacao, aprovacao e cancelamento auditavel.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606055000_vacations_minimal/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/slice.store.test.ts`, `apps/api/test/authz.http.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` passou com 45 testes verdes; `prisma migrate deploy` aplicou a migracao no Postgres local.
- Risco: o dominio de ferias ainda nao cobre a regra legal completa de aquisicao/concessao, fracionamento, abono e reflexo em folha.

## Ultima entrega tecnica 53

- O runtime de ferias passou a derivar a janela concessiva do periodo aquisitivo e a bloquear solicitacoes fora da janela ou com conflito de datas.
- `apps/api/src/slice.store.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: cobertura de teste ajustada para a janela concessiva e para conflito de sobreposicao; a execucao local ainda depende do Postgres ativo para a suite completa.
- Risco: continuam pendentes fracionamento, abono pecuniario, aviso formal, pagamento e reflexo final em folha/eSocial.

## Ultima entrega tecnica 54

- O runtime de ferias passou a registrar aviso formal e pagamento como etapas auditaveis do request, com novas rotas e migration dedicada.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606070000_vacations_notice_payment/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` passou com 47 testes verdes; a migration nova foi aplicada no Postgres local.
- Risco: o pacote de ferias ainda precisa de fracionamento, abono pecuniario e reflexo final em folha/eSocial.

## Ultima entrega tecnica 55

- O runtime de 13o salario passou a registrar calculo anual com memoria de avos, valor total e aprovacao auditavel.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606073000_thirteenth_salary_calculations/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FOL.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build` passou; `npm run test -w @rh/api` passou com 49 testes verdes; a migration nova foi aplicada no Postgres local.
- Risco: o fluxo de 13o salario ainda precisa de primeira parcela, segunda parcela, medias variaveis, encargos e integracao final com folha/eSocial.

## Ultima entrega tecnica 56

- O runtime de ferias passou a suportar fracionamento e abono pecuniario auditaveis, com periodos persistidos, memoria de consumo total e recalculo do saldo apos aprovacao.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606080000_vacations_split_abono/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md` foram sincronizados.
- Validacao: `npm run build -w @rh/api` passou; `npm run test -w @rh/api` passou com 50 testes verdes; `prisma migrate deploy` aplicou a nova migration no Postgres local.
- Risco: o dominio de ferias ainda precisa de integracao final com folha/eSocial para ficar completo no contrato legal-operacional.

## Ultima entrega tecnica 57

- O runtime de ferias passou a integrar o pedido pago com um lote de folha auditavel, registrando envio para payroll, recibo sintetico e ponte persistida entre `vacation_requests` e `time_sheet_payroll_event_batches`.
- `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606083000_vacations_payroll_integration/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/SESSION_LOG.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md` e `.codex/HANDOFF.md` foram sincronizados.
- Validacao: `npm run build -w @rh/api` passou; `npm run test -w @rh/api` passou com 51 testes verdes; `prisma migrate deploy` aplicou a nova migration no Postgres local.
- Risco: o fluxo ainda nao integra eSocial de ferias, apenas a ponte para folha.

## 2026-06-05 - Férias com eSocial e 13o com ponte para folha

**Objetivo:** fechar a frente de férias e avançar o 13º salário para a próxima ponte operacional.

**O que foi feito:** o backend passou a transmitir férias ao eSocial com fila, consulta e reprocessamento explícito; o 13º salário passou a registrar ponte para folha com lote auditável e campos persistidos de payroll; a documentação viva, a memória, o mapa do projeto e o backlog foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606085000_vacations_esocial_transmissions/migration.sql`, `apps/api/prisma/migrations/20260606090000_thirteenth_salary_payroll_integration/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FER.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 52 testes verdes.

**Riscos:** o 13º ainda precisa de medias variaveis, encargos e integracao final com folha/eSocial.

**Próxima ação:** validar a migration nova, build e suíte da API e continuar a evolução do 13º salário.

## 2026-06-05 - Onda 6 encerrada

**Objetivo:** encerrar integralmente a Onda 6 do pos-MVP.

**O que foi feito:** a Onda 6 foi fechada com beneficios completos, ferias completas e 13o completo; o runtime passou a cobrir férias com eSocial, 13º com médias variaveis, encargos e ponte para folha; a documentação viva, a memória, o mapa do projeto, as tarefas e o log de sessão foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606091000_thirteenth_salary_complete/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-FOL.md`, `docs/TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `prisma migrate deploy` aplicou as migrations novas no Postgres local; `npm run test -w @rh/api` passou com 52 testes verdes.

**Riscos:** a expansão futura pode adicionar refinamentos de governanca ou contratos externos, mas a Onda 6 funcional está fechada.

**Próxima ação:** seguir para outras frentes do backlog fora da Onda 6, apenas se houver nova priorização.

## 2026-06-06 - Primeira base executavel de SST

**Objetivo:** iniciar o dominio de SST com um slice pequeno e validado.

**O que foi feito:** o backend recebeu cadastro de ambientes de trabalho e riscos ocupacionais por tenant, com vigencia e trilha de auditoria; o contrato HTTP foi exposto; a migration foi aplicada; a suite da API passou com 54 testes verdes; e a memoria, o mapa do projeto, o backlog e a documentacao base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606092000_sst_foundation/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md`.

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

## 2026-06-06 - PGR e PCMSO

**Objetivo:** materializar a terceira fatia de SST com PGR e PCMSO versionados por tenant.

**O que foi feito:** o backend recebeu cadastro e listagem de PGR e PCMSO por tenant, com vínculo opcional à empresa, vigência, status e trilha de auditoria; a migration foi aplicada; a suite da API passou com 58 testes verdes; e a memória, o mapa do projeto, o backlog, o handoff e a documentação base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606094000_sst_pgr_pcmso/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md` e `.codex/HANDOFF.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 58 testes verdes.

**Riscos:** SST ainda precisa evoluir para CAT, EPI, treinamentos e eSocial SST, com validação jurídico-operacional antes de congelar regras finais.

**Próxima ação:** seguir para a próxima fatia de SST, com CAT e EPI como próximo passo natural.

## 2026-06-06 - eSocial SST

**Objetivo:** materializar a quinta fatia de SST com transmissões eSocial para CAT, exames e ambientes.

**O que foi feito:** o backend recebeu transmissões eSocial SST com fila, consulta e reprocessamento para ambientes, CAT e exames; o worker passou a processar e marcar sucesso/falha desse lote; a migration foi aplicada; a suite da API foi expandida; e a memória, o mapa do projeto, as tarefas, o handoff e a documentação base foram sincronizados.

**Arquivos alterados:** `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/20260606100000_sst_esocial_transmissions/migration.sql`, `apps/api/src/slice.store.ts`, `apps/api/src/slice.controller.ts`, `apps/worker/src/main.ts`, `apps/api/test/authz.http.test.ts`, `apps/api/test/slice.store.test.ts`, `docs/BACKEND.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/RISKS.md`, `docs/README-UC-SST.md`, `docs/TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md`, `.codex/MEMORY.md`, `.codex/PROJECT_MAP.md`, `.codex/TASKS.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.

**Validações:** `npm run build -w @rh/api` passou; `npx prisma migrate deploy` aplicou a migration nova no Postgres local; `npm run test -w @rh/api` passou com 62 testes verdes.

**Riscos:** treinamentos de SST continuam pendentes; eSocial SST agora cobre CAT, exames e ambientes, mas ainda depende de validação operacional/jurídica antes de congelar a política final.

**Próxima ação:** implementar treinamentos de SST.

## 2026-06-06 - Treinamentos de SST

**Objetivo:** fechar a última fatia funcional de SST com catálogo, atribuição e conclusão de treinamentos obrigatórios.

**O que foi feito:** o backend recebeu catálogo de treinamentos obrigatórios por tenant, atribuição por colaborador e conclusão auditável; a migration foi aplicada; a suite da API passou com 64 testes verdes; e a memória, o mapa do projeto, as tarefas, o handoff e a documentação base foram sincronizados.

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

## Atualização da sessão

- Data: 2026-06-06
- O Docker local ficou disponível, `postgres` e `redis` foram subidos via `infra/docker-compose.yml` e a suíte da API passou com 70 testes verdes.
- `npm run build` e `npm run typecheck` já haviam passado; o workspace ficou consistente com a validação real do runtime.
- O próximo passo volta a depender de priorização funcional do produto, não de bloqueio de infraestrutura.
- O stack completo também foi subido com `api`, `web`, `worker`, `keycloak`, `postgres`, `redis` e `minio`; o smoke OIDC real com Keycloak criou tenant e leu summary com sucesso.
- O reporte operacional da plataforma e o check de alertas passaram limpos, e o backup da plataforma gerou snapshot com `postgres.sql`, `bff-sessions.json`, `manifest.json` e `minio-data`.
- `npm run check:platform-alerts` e `npm run report:platform` agora cobrem também o discovery do Keycloak e o readiness do MinIO.
- O placeholder residual `UC-XXX-000` foi removido do catálogo mestre, eliminando a seção obsoleta de "Próxima Fase".
- A telemetria operacional da plataforma agora tem helper compartilhado e suíte dedicada `npm run test:platform` para congelar parsing e URLs de health.
- O backup da plataforma também ganhou helper compartilhado e cobertura em `npm run test:platform` para caminho e manifesto do snapshot.
- O restore da plataforma também ganhou helper compartilhado e cobertura em `npm run test:platform` para validação do manifesto e dry-run.
- A política do Redis local e a retenção da manutenção do BFF também ganharam helpers testáveis e cobertura na suíte de plataforma.
- `@rh/shared` agora é um pacote real com helpers reutilizados pelas camadas operacionais, e `npm run lint` virou checagem efetiva no monorepo.
- A transição de fase foi consolidada: o RN 022 encerra as especificações macro e o `docs/Catálogo Mestre de Casos de Uso.md` passa a ser a entrada da análise de casos de uso.
- A primeira decomposição analítica da nova fase foi registrada em `docs/README-UC-ADM.md`, priorizando cadastro-base, vínculo, histórico, dependentes e movimentações do colaborador.
- A segunda decomposição analítica da nova fase foi registrada em `docs/README-UC-JOR.md`, priorizando configuracao, marcacao, tratamento, calculo e fechamento do ponto.
- A terceira decomposição analítica da nova fase foi registrada em `docs/README-UC-FOL.md`, priorizando rubricas, incidencias, processamento mensal, encargos e fechamento da folha.
- A quarta decomposição analítica da nova fase foi registrada em `docs/README-UC-FER.md`, priorizando periodo aquisitivo, concessivo, solicitacao, aprovacao, calculo e reflexo em folha.
- A quinta decomposição analítica da nova fase foi registrada em `docs/README-UC-RES.md`, priorizando desligamento, calculos rescisorios, documentos e transmissao ao eSocial.
- A sexta decomposição analítica da nova fase foi registrada em `docs/README-UC-BEN.md`, priorizando catalogo, elegibilidade, concessao e reflexo em folha.
- A setima decomposição analítica da nova fase foi registrada em `docs/README-UC-SST.md`, priorizando ambiente, riscos, programas, exames e eventos de SST.
- A oitava decomposição analítica da nova fase foi registrada em `docs/README-UC-ESO.md`, priorizando configuracao, eventos iniciais, transmissoes periodicas e conciliacao.
- A nona decomposição analítica da nova fase foi registrada em `docs/README-UC-SEC.md`, priorizando identidade, permissao, MFA, SSO, LGPD e auditoria.
- A decima decomposição analítica da nova fase foi registrada em `docs/README-UC-API.md`, priorizando cadastro de integracao, contratos de evento e conectores externos.
- A decima primeira decomposição analítica da nova fase foi registrada em `docs/README-UC-PLT.md`, priorizando tenant, empresa, filial, isolamento e governanca da plataforma.
- O primeiro caso de uso detalhado da nova fase tambem foi alinhado em `docs/UC-ADM-001.md`, registrando o estado real do cadastro-base e a dependencia do vinculo contratual.
- O segundo caso de uso detalhado da nova fase tambem foi alinhado em `docs/UC-ADM-005.md`, registrando o estado real da formalizacao contratual separada.
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

## Validacao complementar - integracoes persistidas

- O runtime de integracoes persistidas da API passou a ter cobertura HTTP para sync de beneficios e identidade, monitoramento, falha, retentativa e DLQ.
- O reset de banco dos testes de API e store agora inclui `api_integration_requests` e `api_integration_request_histories`, evitando vazamento entre execucoes.

## Validacao complementar - host docker compartilhado

- O host Docker compartilhado usado para a stack do sistema deve ser tratado como `172.17.0.3`.
- O Docker Desktop local do Windows nao e o alvo autoritativo para os smokes da stack neste ambiente.
- O host possui Portainer ativo e varios compose projects, mas a stack do RH nao foi localizada nele nesta rodada.
- O ambiente de desenvolvimento usa o Docker local com `docker compose`.
- O ambiente de homologacao usa o Portainer no host compartilhado `172.17.0.3`.
- Os templates de variaveis estao separados em `infra/.env.development.example` e `infra/.env.homologation.example`.
- A stack de homologacao usa `infra/docker-compose.homologation.yml` como base de referencia.
- O checklist de homologacao esta em `docs/HOMOLOGATION_CHECKLIST.md`.
- O guia de publicacao de homologacao esta em `docs/HOMOLOGATION_PUBLICATION.md`.
- O mapa de endpoints publicados de homologacao esta em `docs/HOMOLOGATION_ENDPOINT_MAP.md`.
- Os smokes por servico de homologacao estao em `docs/HOMOLOGATION_SMOKES.md`.
- O runbook rapido de homologacao esta em `docs/HOMOLOGATION_RUNBOOK.md`.
- O contexto local de acesso foi guardado em `.codex/LOCAL_ACCESS_CONTEXT.md` e deve ser lido automaticamente no inicio de cada nova sessao.
- O caso de uso UC-JOR-013 foi alinhado ao contrato real do backend para usar `point-holidays`, `point-tolerance-rules` e `point-devices` por tenant.
- O backend agora tambem expõe atualizacao auditavel para `point-holidays`, `point-tolerance-rules` e `point-devices`, fechando o CRUD minimo da governanca do ponto.
- O backend agora tambem expõe atualizacao auditavel para ambientes e riscos ocupacionais do SST, com testes de persistencia cobrindo criacao, atualizacao e auditoria.
- O backend agora tambem expõe atualizacao auditavel para PGR e PCMSO, com testes de persistencia cobrindo criacao, atualizacao e auditoria.

## Ultima entrega complementar 3

- Data: 2026-06-11
- Objetivo: detalhar os pacotes `UC-GST`, `UC-WFL`, `UC-GED`, `UC-ATS`, `UC-ONB`, `UC-LMS`, `UC-PER` e `UC-CAR`.
- O que foi feito: criados 80 arquivos de casos de uso cobrindo portal do gestor, workflow, gestao documental, ATS, onboarding, LMS, avaliacao de desempenho e cargos/salarios/carreira.
- Arquivos alterados: `docs/UC-GST-001-visualizar-equipe.md`, `docs/UC-GST-002-aprovar-ferias.md`, `docs/UC-GST-003-aprovar-ajuste-de-ponto.md`, `docs/UC-GST-004-aprovar-horas-extras.md`, `docs/UC-GST-005-acompanhar-admissoes.md`, `docs/UC-GST-006-solicitar-desligamento.md`, `docs/UC-GST-007-consultar-indicadores-da-equipe.md`, `docs/UC-GST-008-consultar-absenteismo.md`, `docs/UC-GST-009-consultar-turnover.md`, `docs/UC-GST-010-exportar-dados-autorizados-da-equipe.md`, `docs/UC-WFL-001-criar-fluxo-de-aprovacao.md`, `docs/UC-WFL-002-configurar-etapas-do-fluxo.md`, `docs/UC-WFL-003-configurar-aprovadores.md`, `docs/UC-WFL-004-configurar-sla.md`, `docs/UC-WFL-005-executar-aprovacao-sequencial.md`, `docs/UC-WFL-006-executar-aprovacao-paralela.md`, `docs/UC-WFL-007-escalonar-solicitacao.md`, `docs/UC-WFL-008-delegar-aprovacao.md`, `docs/UC-WFL-009-reabrir-processo.md`, `docs/UC-WFL-010-auditar-historico-do-workflow.md`, `docs/UC-GED-001-cadastrar-tipo-documental.md`, `docs/UC-GED-002-anexar-documento-ao-colaborador.md`, `docs/UC-GED-003-gerar-documento-automaticamente.md`, `docs/UC-GED-004-versionar-documento.md`, `docs/UC-GED-005-assinar-documento-eletronicamente.md`, `docs/UC-GED-006-assinar-documento-com-icp-brasil.md`, `docs/UC-GED-007-consultar-prontuario-eletronico.md`, `docs/UC-GED-008-aplicar-politica-de-retencao.md`, `docs/UC-GED-009-descartar-documento-autorizado.md`, `docs/UC-GED-010-auditar-movimentacao-documental.md`, `docs/UC-ATS-001-criar-requisicao-de-vaga.md`, `docs/UC-ATS-002-aprovar-vaga.md`, `docs/UC-ATS-003-publicar-vaga.md`, `docs/UC-ATS-004-cadastrar-candidato.md`, `docs/UC-ATS-005-triar-curriculo.md`, `docs/UC-ATS-006-movimentar-candidato-no-pipeline.md`, `docs/UC-ATS-007-agendar-entrevista.md`, `docs/UC-ATS-008-registrar-avaliacao-do-candidato.md`, `docs/UC-ATS-009-emitir-proposta.md`, `docs/UC-ATS-010-converter-candidato-em-pre-admissao.md`, `docs/UC-ONB-001-criar-processo-de-pre-admissao.md`, `docs/UC-ONB-002-enviar-convite-ao-candidato.md`, `docs/UC-ONB-003-coletar-dados-cadastrais.md`, `docs/UC-ONB-004-coletar-documentos-admissionais.md`, `docs/UC-ONB-005-executar-checklist-admissional.md`, `docs/UC-ONB-006-assinar-contrato-de-trabalho.md`, `docs/UC-ONB-007-solicitar-provisionamento-de-acessos.md`, `docs/UC-ONB-008-solicitar-equipamentos.md`, `docs/UC-ONB-009-atribuir-treinamentos-iniciais.md`, `docs/UC-ONB-010-acompanhar-periodo-de-experiencia.md`, `docs/UC-LMS-001-cadastrar-curso.md`, `docs/UC-LMS-002-criar-trilha-de-aprendizagem.md`, `docs/UC-LMS-003-matricular-colaborador.md`, `docs/UC-LMS-004-executar-treinamento.md`, `docs/UC-LMS-005-aplicar-avaliacao.md`, `docs/UC-LMS-006-emitir-certificado.md`, `docs/UC-LMS-007-controlar-reciclagem-obrigatoria.md`, `docs/UC-LMS-008-vincular-curso-a-competencia.md`, `docs/UC-LMS-009-consultar-historico-de-treinamento.md`, `docs/UC-LMS-010-gerar-indicadores-de-aprendizagem.md`, `docs/UC-PER-001-criar-ciclo-de-avaliacao.md`, `docs/UC-PER-002-executar-avaliacao-90.md`, `docs/UC-PER-003-executar-avaliacao-180.md`, `docs/UC-PER-004-executar-avaliacao-360.md`, `docs/UC-PER-005-avaliar-competencias.md`, `docs/UC-PER-006-avaliar-metas.md`, `docs/UC-PER-007-registrar-feedback-continuo.md`, `docs/UC-PER-008-criar-pdi.md`, `docs/UC-PER-009-calibrar-resultados.md`, `docs/UC-PER-010-gerar-matriz-desempenho-potencial.md`, `docs/UC-CAR-001-cadastrar-estrutura-organizacional.md`, `docs/UC-CAR-002-cadastrar-cargo.md`, `docs/UC-CAR-003-cadastrar-funcao.md`, `docs/UC-CAR-004-cadastrar-faixa-salarial.md`, `docs/UC-CAR-005-cadastrar-tabela-salarial.md`, `docs/UC-CAR-006-registrar-promocao.md`, `docs/UC-CAR-007-registrar-progressao.md`, `docs/UC-CAR-008-criar-plano-de-carreira.md`, `docs/UC-CAR-009-monitorar-equidade-salarial.md`, `docs/UC-CAR-010-gerenciar-sucessao.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/RISKS.md` e `docs/SESSION_LOG.md`.
- Validações executadas: revisão documental dos readmes de pacote e alinhamento dos 80 arquivos ao padrão de casos de uso já usado no repositório.
- Resultado: os pacotes de portal do gestor, workflow, gestao documental, ATS, onboarding, LMS, avaliacao de desempenho e cargos/salarios/carreira ficaram detalhados em nivel individual.

## Sessão atual

- Data: 2026-06-11
- Objetivo: retomar a validação de runtime a partir da frente de SST que ficou pendente.
- O que foi feito: a suite da API foi reexecutada, o `prisma generate` voltou a falhar por `EPERM` no engine nativo, o teste direto da store falhou porque nao havia Postgres em `localhost:5432`, a tentativa de iniciar o Docker local nao teve permissao e o acesso SSH ao host compartilhado `172.17.0.3` foi recusado.
- Resultado: a validacao de runtime permaneceu bloqueada nesta sessao; nao houve alteracao funcional no codigo.
- Arquivos alterados: `.codex/MEMORY.md`, `.codex/HANDOFF.md` e `docs/SESSION_LOG.md`.
- Proximo passo recomendado: retomar a validacao quando houver Docker ativo localmente ou acesso SSH valido ao host compartilhado.

## Ultima entrega complementar 4

- Data: 2026-06-11
- Objetivo: detalhar os pacotes `UC-FER`, `UC-RES`, `UC-BEN`, `UC-SST`, `UC-ESO`, `UC-SEC`, `UC-API`, `UC-PLT` e `UC-DEC`.
- O que foi feito: criados 90 arquivos de casos de uso cobrindo ferias, rescisao, beneficios, SST, eSocial, seguranca, integracoes, plataforma e 13o salario.
- Arquivos alterados: `docs/UC-FER-001-apurar-periodo-aquisitivo.md`, `docs/UC-FER-002-controlar-periodo-concessivo.md`, `docs/UC-FER-003-consultar-saldo-de-ferias.md`, `docs/UC-FER-004-solicitar-ferias.md`, `docs/UC-FER-005-aprovar-ferias.md`, `docs/UC-FER-006-calcular-ferias.md`, `docs/UC-FER-007-calcular-abono-pecuniario.md`, `docs/UC-FER-008-programar-ferias-coletivas.md`, `docs/UC-FER-009-emitir-aviso-de-ferias.md`, `docs/UC-FER-010-integrar-ferias-com-folha.md`, `docs/UC-RES-001-registrar-desligamento.md`, `docs/UC-RES-002-definir-motivo-de-desligamento.md`, `docs/UC-RES-003-calcular-aviso-previo.md`, `docs/UC-RES-004-calcular-saldo-de-salario.md`, `docs/UC-RES-005-calcular-ferias-rescisorias.md`, `docs/UC-RES-006-calcular-decimo-terceiro-proporcional.md`, `docs/UC-RES-007-calcular-fgts-rescisorio.md`, `docs/UC-RES-008-gerar-documentos-rescisorios.md`, `docs/UC-RES-009-fechar-rescisao.md`, `docs/UC-RES-010-transmitir-desligamento-ao-esocial.md`, `docs/UC-BEN-001-cadastrar-beneficio.md`, `docs/UC-BEN-002-configurar-elegibilidade-de-beneficio.md`, `docs/UC-BEN-003-conceder-beneficio-ao-colaborador.md`, `docs/UC-BEN-004-suspender-beneficio.md`, `docs/UC-BEN-005-cancelar-beneficio.md`, `docs/UC-BEN-006-gerenciar-vale-transporte.md`, `docs/UC-BEN-007-gerenciar-vale-refeicao-ou-alimentacao.md`, `docs/UC-BEN-008-gerenciar-plano-de-saude.md`, `docs/UC-BEN-009-importar-coparticipacao.md`, `docs/UC-BEN-010-integrar-beneficios-com-folha.md`, `docs/UC-SST-001-cadastrar-ambiente-de-trabalho.md`, `docs/UC-SST-002-cadastrar-riscos-ocupacionais.md`, `docs/UC-SST-003-gerenciar-pgr.md`, `docs/UC-SST-004-gerenciar-pcmso.md`, `docs/UC-SST-005-gerenciar-ltcat.md`, `docs/UC-SST-006-registrar-exame-ocupacional.md`, `docs/UC-SST-007-emitir-aso.md`, `docs/UC-SST-008-registrar-cat.md`, `docs/UC-SST-009-controlar-entrega-de-epi.md`, `docs/UC-SST-010-controlar-treinamentos-obrigatorios-de-sst.md`, `docs/UC-ESO-001-configurar-ambiente-esocial.md`, `docs/UC-ESO-002-gerenciar-certificado-digital.md`, `docs/UC-ESO-003-transmitir-evento-s-1000.md`, `docs/UC-ESO-004-transmitir-evento-s-1005.md`, `docs/UC-ESO-005-transmitir-evento-s-1010.md`, `docs/UC-ESO-006-transmitir-evento-s-2200.md`, `docs/UC-ESO-007-transmitir-evento-s-1200.md`, `docs/UC-ESO-008-transmitir-evento-s-1210.md`, `docs/UC-ESO-009-transmitir-evento-s-1299.md`, `docs/UC-ESO-010-conciliar-totalizadores-do-esocial.md`, `docs/UC-SEC-001-gerenciar-perfis-de-acesso.md`, `docs/UC-SEC-002-gerenciar-permissoes.md`, `docs/UC-SEC-003-configurar-mfa.md`, `docs/UC-SEC-004-configurar-sso.md`, `docs/UC-SEC-005-registrar-consentimento.md`, `docs/UC-SEC-006-atender-solicitacao-do-titular.md`, `docs/UC-SEC-007-anonimizar-dados.md`, `docs/UC-SEC-008-aplicar-politica-de-retencao.md`, `docs/UC-SEC-009-registrar-incidente-de-seguranca.md`, `docs/UC-SEC-010-auditar-acessos-e-operacoes.md`, `docs/UC-API-001-cadastrar-integracao.md`, `docs/UC-API-002-configurar-api-rest.md`, `docs/UC-API-003-configurar-webhook.md`, `docs/UC-API-004-publicar-evento.md`, `docs/UC-API-005-consumir-evento.md`, `docs/UC-API-006-integrar-com-erp.md`, `docs/UC-API-007-integrar-com-banco.md`, `docs/UC-API-008-integrar-com-operadora-de-beneficios.md`, `docs/UC-API-009-integrar-com-provedor-de-identidade.md`, `docs/UC-API-010-monitorar-integracoes.md`, `docs/UC-PLT-001-cadastrar-tenant.md`, `docs/UC-PLT-002-cadastrar-empresa.md`, `docs/UC-PLT-003-cadastrar-filial.md`, `docs/UC-PLT-004-configurar-isolamento-de-dados.md`, `docs/UC-PLT-005-configurar-parametrizacoes-por-tenant.md`, `docs/UC-PLT-006-monitorar-disponibilidade.md`, `docs/UC-PLT-007-executar-backup.md`, `docs/UC-PLT-008-executar-restauracao.md`, `docs/UC-PLT-009-monitorar-performance.md`, `docs/UC-PLT-010-auditar-governanca-da-plataforma.md`, `docs/UC-DEC-001-apurar-avos-de-decimo-terceiro.md`, `docs/UC-DEC-002-calcular-primeira-parcela.md`, `docs/UC-DEC-003-calcular-segunda-parcela.md`, `docs/UC-DEC-004-calcular-medias-de-verbas-variaveis.md`, `docs/UC-DEC-005-calcular-encargos-de-decimo-terceiro.md`, `docs/UC-DEC-006-antecipar-decimo-terceiro-nas-ferias.md`, `docs/UC-DEC-007-calcular-decimo-terceiro-rescisorio.md`, `docs/UC-DEC-008-gerar-demonstrativo-de-decimo-terceiro.md`, `docs/UC-DEC-009-fechar-folha-de-decimo-terceiro.md`, `docs/UC-DEC-010-integrar-decimo-terceiro-ao-esocial.md`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `docs/RISKS.md` e `docs/SESSION_LOG.md`.
- O backend agora tambem expõe atualizacao auditavel para catalogos de EPI, exames ocupacionais e catalogos de treinamento de SST.
- Proxima validacao util: banco real para confirmar esses updates de SST em runtime, assim que o ambiente estiver disponivel.
- O runtime local foi destravado nesta sessao via Docker Desktop, com Postgres/Redis do compose, migrations aplicadas e suite completa da API verde.
- Validações executadas: revisão documental dos readmes de pacote e alinhamento dos 90 arquivos ao padrão de casos de uso já usado no repositório.
- Resultado: os pacotes de ferias, rescisao, beneficios, SST, eSocial, seguranca, integracoes, plataforma e 13o salario ficaram detalhados em nivel individual.

## Ultima entrega complementar 5

- Data: 2026-06-11
- Objetivo: destravar a homologacao final no Portainer e corrigir o worker que morria em runtime.
- O que foi feito: o repo foi tornado publico, as imagens `rh-brasil-public-*` passaram a ser puxaveis anonimamente, a stack `rh-brasil-public-hom-final` ficou ativa no endpoint `10`, o `docker-compose.yml` raiz foi ajustado para evitar colisao de portas no host compartilhado e o `apps/worker/Dockerfile` passou a gerar o Prisma Client no build.
- Validações: pull anonimo das imagens do GHCR, redeploy Git da stack no Portainer, leitura dos containers do endpoint `10`, build local do worker com `docker build -f apps/worker/Dockerfile -t rh-worker-test .` e verificacao de runtime da stack com API, web, worker, Keycloak, Postgres, Redis e MinIO em execucao.
- Arquivos alterados: `docker-compose.yml`, `apps/worker/Dockerfile`, `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md`, `.codex/OPEN_QUESTIONS.md`, `docs/HOMOLOGATION_ENDPOINT_MAP.md`, `docs/RISKS.md` e `docs/SESSION_LOG.md`.
- Resultado: a homologacao ficou funcional, com worker vivo e sem dependencias manuais de credencial GHCR.
- O realm `rh` do Keycloak nao apareceu apenas com o import do container; ele foi criado explicitamente via admin API em `38080`, e o smoke OIDC passou depois disso.
- O endpoint `10` foi limpo dos stacks RH antigos quebrados e a stack final ativa agora se chama `RH`.

## Sessão atual

- Data: 2026-06-12
- Objetivo: retomar a validação de runtime a partir da frente de SST que ficou pendente.
- O que foi feito: o Docker local continuou sem o daemon `dockerDesktopLinuxEngine`, mas o Portainer no host compartilhado `172.17.0.3` respondeu, a stack `rh` permaneceu presente no endpoint `10` e um smoke HTTP real contra `http://172.17.0.3:3000` validou criacao de tenant, company, person, employee, ambiente, risco, PGR, PCMSO, CAT, EPI, exame/ASO, treinamento e transmissao eSocial basal de SST.
- Validações: `docker version` e `docker compose -f infra/docker-compose.yml ps` continuaram sem daemon local; `GET https://172.17.0.3:9443/api/status` respondeu `200`; a listagem autenticada do Portainer mostrou a stack `rh` ativa no endpoint `10`; o smoke HTTP em `172.17.0.3:3000` retornou sucesso para todos os recursos de SST exercitados.
- Arquivos alterados: `.codex/MEMORY.md`, `.codex/HANDOFF.md`, `.codex/TASKS.md` e `docs/SESSION_LOG.md`.
- Resultado: a frente pendente de SST foi validada no runtime de homologacao; nao houve alteracao funcional no codigo.
- Proximo passo recomendado: manter o smoke de SST como guardrail ao subir novamente a stack ou ao reiniciar o Keycloak/compose do endpoint `10`.

## Atualizacao de guardrail

- Data: 2026-06-12
- O que foi feito: `npm run smoke:sst` passou a executar o smoke basal de SST contra a stack RH publicada.
- Reforco de revisao: os retries SST de `UC-ESO` agora validam o identificador do recurso pai da rota antes de reprocessar a transmissao.
- O commit `4ea25cc` foi enviado para `origin/main` e a stack `rh` no endpoint `10` foi redeployada no Portainer com sucesso.
- O smoke `npm run smoke:sst` passou novamente apos o redeploy.
- A transmissao do smoke permaneceu em `sent`; o retry pela rota errada respondeu `409` por nao estar em `failed`, entao a verificacao exata do ramo de mismatch de pai continua coberta pelo teste unitario, nao pelo runtime desta sessao.
- Depois do pull forcado das imagens e de um novo redeploy, o ramo `mark-failed -> retry` foi provado em runtime: a transmissao SST `44f597d5-5542-4550-92e5-7646c3ecf16a` foi marcada como `failed` no endpoint publicado e o retry pela rota errada de `cat` retornou `404 not found for cat 30dc0e4d-50af-4cb3-a2da-6a2d6b2c4d06`.
- O smoke `npm run smoke:sst` voltou a passar apos esse redeploy final, entao nao ficaram pontas soltas na trilha basal de SST.
- A pendencia obsoleta de `docs/PRODUCT.md` sobre "store em arquivo para persistencia relacional" foi removida, para evitar que a proxima leitura trate a persistencia relacional como algo ainda aberto.
- O runtime agora tambem possui o agregado minimo de dependentes do colaborador, com CRUD, inativacao e auditoria.
- O proximo gap real de governanca/LGPD ficou identificado em `UC-SEC`: consentimento do titular e atendimento de solicitacao do titular ainda nao possuem runtime dedicado.
- `docs/PRODUCT.md` tambem foi corrigido para refletir que a base executavel inicial usa PostgreSQL, nao um store em arquivo.
- O runtime minimo de `UC-SEC` agora tambem cobre consentimento do titular e atendimento de solicitacao do titular, com persistencia relacional e auditoria.
- O runtime minimo de `UC-SEC` agora tambem cobre anonimização executavel de dados elegiveis e aplicacao de politica de retencao com legal hold.
- O compose local de DEV foi rebuildado e ficou saudável com `api`, `web`, `worker`, `postgres`, `redis`, `keycloak`, `minio` e `bff-maintenance`; o serviço auxiliar deixou de reiniciar apos o ajuste dos imports para `@rh/shared`.

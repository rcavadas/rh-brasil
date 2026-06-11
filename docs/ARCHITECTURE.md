# Arquitetura

## Visao geral

O repositorio agora contem uma base executavel real para o slice inicial.
O desenho conceitual aponta um SaaS multiempresa centrado em pessoa, vinculo trabalhista, eventos historicos e auditoria.
A camada funcional catalogada foi expandida e consolidada em UC-JOR, UC-FOL, UC-BI, UC-SEC, UC-API e UC-PLT, e o monorepo atual materializa uma primeira fatia com API, web e worker.

## Componentes

- Frontend: `@rh/web` em React + Vite.
- O portal web usa um BFF no proprio dominio, faz login OIDC com Keycloak local e nao expÃµe tokens ao navegador.
- Backend: `@rh/api` em NestJS.
- Worker: `@rh/worker` com BullMQ.
- Banco de dados: Prisma com PostgreSQL como destino relacional do slice inicial.
- Autenticacao hibrida: guard OIDC/JWKS com fallback por headers no `@rh/api`.
- Acesso ao tenant: tabela `tenant_access` vincula o sujeito autenticado ao tenant criado e permite o fluxo OIDC sem header no caminho feliz.
- O mesmo `tenant_access` tambem suporta grant explÃ­cito para outro subject e o endpoint `GET /api/v1/tenants/me/access` expÃµe a lista de tenants acessiveis para selecao de contexto.
- O frontend atual consome essa lista via BFF, permite selecionar o tenant ativo e mantém esse contexto no Redis com TTL por inatividade, recarregando o estado após restart do portal.
- O BFF revalida o tenant ativo contra a lista atual de acessos em cada carga e em cada proxy; se o acesso foi revogado, o tenant ativo é limpo antes de encaminhar a requisicao.
- O frontend tambem renova a sessao no lado do BFF antes do vencimento, renova a atividade para evitar timeout prematuro e encerra o login via logout redirecionado ao Keycloak local.
- O BFF passou a indexar as sessoes no Redis para reduzir dependencia de SCAN e expor health com dependencia do Redis.
- A operacao do Redis do BFF agora tem politica minima documentada: AOF, volume persistente, backup diario ou sob demanda, restore manual e drill recomendado.
- O Redis do ambiente local passou a usar `infra/redis/redis.conf`, com AOF, `appendfsync everysec` e `maxmemory-policy noeviction`.
- O compose local tambem sobe `bff-maintenance`, que executa backup, verify e limpeza de snapshots da store do BFF em volume dedicado.
- O workspace tambem expõe `npm run verify:bff-sessions` para validar o round-trip backup/restore em prefixo temporario sem tocar na store real.
- O workspace tambem expõe `npm run check:redis-platform` para validar a politica do Redis local.
- A plataforma local agora expõe `npm run backup:platform`, `npm run restore:platform`, `npm run report:platform` e `npm run check:platform-alerts` para snapshot operacional do compose, com restore em modo seguro por padrão.
- A cadeia de CI/CD foi formalizada com workflows GitHub Actions para validacao em `push`/`pull_request` e promocao manual entre ambientes.
- A API agora expõe telemetria operacional em `GET /api/v1/platform/telemetry` e o workspace tem um check automatizado de alertas para o compose local.
- API, worker e BFF passaram a emitir logs estruturados em JSON para eventos de inicializacao, falha e operacao.
- O MVP consolidado nos topicos 10, 11 e 12 define a primeira entrega: plataforma minima, nucleo do colaborador e operacao essencial.
- O backlog pos-MVP foi desdobrado no Topico 13 para orientar as ondas futuras de implementacao.
- A Onda 1 do pos-MVP foi formalizada no Topico 14 como pacote de ponto.
- A Onda 2 do pos-MVP foi formalizada no Topico 15 como integracoes e contratos externos.
- A Onda 3 do pos-MVP foi formalizada no Topico 16 como plataforma e governanca.
- A Onda 4 do pos-MVP foi formalizada no Topico 17 como portais e workflow.
- A Onda 5 do pos-MVP foi formalizada no Topico 18 como BI, LGPD e auditoria ampliada.
- A Onda 6 do pos-MVP foi formalizada no Topico 19 como dominios complementares.
- A Onda 1 foi ainda detalhada no Topico 20 em frentes executaveis do pacote de ponto.
- A Onda 2 foi ainda detalhada no Topico 21 em frentes executaveis de integracoes e contratos.
- A Onda 3 foi ainda detalhada no Topico 22 em frentes executaveis de plataforma e governanca.
- A Onda 4 foi ainda detalhada no Topico 23 em frentes executaveis de portais e workflow.
- A Onda 5 foi ainda detalhada no Topico 24 em frentes executaveis de BI, LGPD e auditoria.
- A Onda 6 foi ainda detalhada no Topico 25 em frentes executaveis de dominios complementares.
- O portal agora agrega um workspace de RH com cards e timeline derivados de admissoes, desligamentos, rescissoes, monitoramento de integracoes, comprovante de ponto e snapshots contratuais.
- O portal agora tambem agrega uma visao analitica de BI/LGPD/auditoria, consumindo `GET /api/v1/tenants/:tenantId/analytics/overview` para expor headcount, pressao de fluxo, auditoria e politica de exportacao do tenant.
- O portal agora tambem expõe uma timeline de roadmap da Onda 6 para manter visiveis os dominios complementares planejados.
- O backend recebeu persistencia minima para calendarios de feriados, regras de tolerancia, dispositivos de ponto, calculo/aprovacao de adicional noturno, calculo/aprovacao de DSR e lote auditavel de consolidacao para folha.
No slice executavel atual, `Employee` e a projecao operacional de `VinculoTrabalhista`; o modelo conceitual fica reservado para a evolucao posterior do dominio.
- O backend tambem possui a primeira camada funcional de beneficios, com catalogo por tenant e atribuicao, suspensao e cancelamento de beneficios para colaboradores.
- O backend tambem possui a primeira camada funcional de ferias, com saldo por periodo, solicitacao, aprovacao e cancelamento auditavel.
- O backend tambem possui um dossie documental de admissao, com documentos de onboarding versionados e assinatura auditavel, acoplado ao fluxo de formalizacao contratual.
- O backend tambem valida a janela concessiva derivada e bloqueia solicitacoes de ferias com conflito de datas, mantendo a memoria do periodo aquisitivo no runtime.
- O backend tambem registra fracionamento, abono pecuniario, aviso formal, pagamento, envio para folha e transmissao ao eSocial das ferias como etapas auditaveis.
- O backend tambem possui uma camada funcional completa da Onda 6 para 13o salario, com calculo anual, medias variaveis, encargos, aprovacao auditavel e ponte para folha.
- O backend tambem possui a primeira base executavel de SST, com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissões eSocial SST versionados por tenant.
- O backend tambem possui a primeira base executavel de ATS, com requisicao de vaga, aprovacao, publicacao, cadastro de candidatos e movimentacao inicial no pipeline.
- O backend tambem possui o recorte inicial de entrevistas e avaliacao de candidatos no ATS, mantendo a trilha auditavel por tenant.
- O backend tambem possui proposta e conversao para pre-admissao no ATS, mantendo a origem rastreavel ate a admissao draft.
- Cache/fila: Redis alvo da fila do worker.
- Storage de documentos: nao identificado na implementacao atual.
- Integracoes: eSocial e futuras integracoes corporativas mencionadas em docs, sem implementacao localizada.

## Fluxos principais

- Recrutamento.
- Admissao.
- Onboarding.
- Operacao.
- Movimentacoes.
- Afastamentos.
- Desligamento.
- Arquivamento historico.
- Slice inicial: tenant, cadastro, ponto e auditoria.

## Pontos de atencao

- A arquitetura ja foi validada em runtime com Postgres ativo para o fluxo relacional do slice inicial.
- A arquitetura tambem possui um guard de auth/RBAC com suporte a Bearer OIDC e fallback por headers para o slice inicial.
- O runtime atual usa os roles `admin`, `rh`, `manager`, `auditor` e `employee`; no OIDC local, os claims padrao sao `tenant_id`, `rh_roles` e `sub`.
- O portal web conversa com o Keycloak local por Authorization Code + PKCE, mas a navegacao do browser fala apenas com o proprio dominio.
- A renovacao de sessao e o logout direcionado fazem parte do fluxo operacional do portal e precisam continuar cobertos por testes de runtime.
- A sessao do BFF foi validada com recarga preguiçosa do Redis e permanece disponivel apos restart do container do portal.
- O acesso ao tenant pode ser materializado no banco como `tenant_access` quando o tenant e criado por um sujeito autenticado, removendo a dependencia do header no caminho feliz.
- O pacote de ponto agora conta com tabelas proprias para calendario de feriados, tolerancia, dispositivos, adicional noturno, DSR e consolidacao para folha, ainda sem validacao completa em carga.
- Ainda nao existe evidencia de isolamento fisico ou logico entre empresas validado em carga ou multi-tenant real, apesar do schema Prisma suportar a fronteira e o BFF já impedir uso de tenant ativo revogado.
- Controles de auditoria, logs e retencao/exportacao ja possuem politica base, com formatos de exportacao definidos, mas ainda precisam de implementacao automatizada e testes de integracao e carga.
- O proximo passo arquitetural e provisionar o realm/client do Keycloak e preparar testes automatizados adicionais do fluxo relacional.
- O Topico 04 foi decomposto em um plano tecnico com backlog minimo para admissao, checklist documental, formalizacao contratual, eSocial e desligamento administrativo.
- O Topico 06 agora tambem se materializa parcialmente no runtime com beneficios operacionais minimos.
- As integracoes priorizadas no runtime/documentacao seguem a ordem: eSocial e reflexos de folha, depois ERP/SSO, e em seguida banco, operadora de beneficios e demais contratos externos.
- A etapa 1 da admissao ja esta implementada no `@rh/api` como solicitacao rastreavel por tenant, com cancelamento controlado e auditoria.
- O checklist documental minimo da admissao tambem ja esta executavel, com checklist inicial, recebimento item a item e transicao automatica para pendencia ou revisao.
- A formalizacao contratual separada tambem ja esta executavel, com snapshot proprio, vigencia, tipo de contrato e encerramento da admissao em `completed`.
- A integracao eSocial minima da admissao tambem ja esta executavel, com fila no Redis, worker consumindo `admission.esocial.transmit`, registro de recibo e persistencia de falhas.
- O desligamento administrativo minimo tambem ja esta executavel, com solicitacao, aprovacao, efetivacao e bloqueio de novos apontamentos para o colaborador desligado.
- O offboarding minimo tambem ja esta executavel, com fechamento que dispara a transmissao de desligamento.
- O eSocial de desligamento tambem ja esta executavel, com fila, worker, consulta de transmissao e persistencia de estados `queued`, `sent` e `failed`.
- O contrato de eSocial tambem passou a aceitar reprocessamento explicito de transmissao de admissao e desligamento, mantendo a origem persistida e a trilha de auditoria.
- A consolidacao de eventos de ponto para folha passou a produzir lote auditavel e handoff para folha com recibo sintetico, e as camadas minimas de ERP e banco ja recebem o lote enviado.
- O runtime tambem agora possui requests persistidos para beneficios e identidade, com monitoramento basico de integracoes sobre a trilha auditavel.
- O runtime tambem expõe retentativa e DLQ basicas para requests de integracao, usando o mesmo agregado persistido e auditoria relacional.
- Um fluxo minimo de rescisao tambem ja esta executavel, com dependencia de desligamento efetivo, memoria de calculo, prazo de pagamento calculado, documentos assinaveis, historico e auditoria de calculo/assinatura/fechamento/cancelamento.
- A politica base de LGPD tambem foi consolidada em nivel de classe, com retencao por finalidade, exportacao controlada e expurgo de artefatos temporarios.
- A infraestrutura local tambem possui um check automatizado de politica do Redis para validar AOF e `maxmemory-policy` no ambiente de compose.

## Atualizacao tecnica

- A stack executavel recomendada e monolito modular em TypeScript.
- Backend: NestJS.
- Frontend: React + Vite.
- Banco proposto: PostgreSQL.
- Fila/cache propostos: Redis + BullMQ.
- Storage proposto: MinIO ou S3 compativel.
- Identidade proposta: Keycloak via OIDC/OAuth2.
- Infraestrutura proposta: Docker Compose, GitHub Actions e observabilidade com OpenTelemetry, Prometheus e Grafana.
- O monorepo inicial ja existe com `apps/api`, `apps/web`, `apps/worker` e `packages/shared`, e os workspaces principais passaram em build/typecheck.







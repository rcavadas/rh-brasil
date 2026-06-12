# Produto

## Visao

RH Brasil e uma plataforma SaaS de gestao do ciclo de vida do colaborador para empresas brasileiras.

## Contexto confirmado

- O produto e descrito como SaaS multiempresa.
- O dominio central gira em torno de Pessoa, VinculoTrabalhista e Empresa.
- A documentacao atual cobre o ciclo de vida do colaborador, de recrutamento a arquivamento.
- A especificacao funcional catalogada foi expandida para cobrir UC-JOR, UC-FOL, UC-BI, UC-SEC, UC-API e UC-PLT de forma completa.
- A base executavel inicial ja existe com slice persistido em arquivo para tenant, cadastro, ponto, resumo e auditoria.
- A documentacao tecnica agora tambem recomenda a stack executavel e o primeiro vertical slice.
- O MVP do produto foi consolidado nos topicos 10, 11 e 12 como: plataforma minima, nucleo do colaborador e operacao essencial.
- O backlog pos-MVP foi organizado no Topico 13 como sequencia de entrega para as ondas futuras.
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
- A Onda 4 agora tambem possui um workspace operacional no portal, com visao de colaborador, gestor, documentos, excecoes e trilha de workflow a partir do tenant ativo.
- A Onda 5 agora tambem possui um snapshot analitico no portal, com headcount, pressao de fluxo, auditoria, integracoes e politica base de LGPD visiveis no tenant ativo.
- A Onda 6 agora tambem possui uma trilha de roadmap no portal, com os dominios complementares e a sequencia de expansao explicitadas para o tenant ativo.
- O pacote de ponto agora tambem possui persistencia minima para calendarios de feriados, regras de tolerancia e dispositivos.
- O adicional noturno do pacote UC-JOR agora tambem possui calculo, aprovacao e trilha de auditoria em runtime, com memoria por competencia.
- O DSR e o descanso semanal do pacote UC-JOR agora tambem possuem calculo, aprovacao e trilha de auditoria em runtime, com memoria por competencia.
- A consolidacao de eventos de ponto para folha do pacote UC-JOR agora tambem possui lote auditavel em runtime, com mapeamento versionado para rubricas de folha.
- O lote de ponto para folha agora tambem pode ser enviado para folha com recibo sintético auditavel.
- O lote de ponto para folha agora tambem pode ser sincronizado com ERP em uma camada minima auditavel.
- O lote de ponto para folha agora tambem pode ser sincronizado com banco em uma camada minima auditavel.
- O pacote de integracoes agora tambem possui sincronizacao minima para beneficios e identidade, alem de monitoramento, retentativa e DLQ basicos das integracoes.
- A operacao da plataforma agora explicita uma politica minima para o Redis do ambiente local, com verificacao automatizada dessa configuracao.
- A plataforma local possui agora contratos operacionais de backup, restore e observabilidade minima para o compose.
- A plataforma local tambem possui telemetria operacional via API e um check automatizado de alertas para o compose.
- O portal revalida o tenant ativo contra a lista corrente de acessos e não encaminha requests com tenant revogado.
- O portal agora nao reutiliza tenant ativo revogado no carregamento nem no proxy.
- O produto agora possui contrato de CI/CD para validar build e testes e para registrar um fluxo manual de promocao entre ambientes.
- A telemetria operacional da plataforma e os logs estruturados em API, worker e BFF foram incorporados ao contrato do produto.
- No MVP executavel, `Employee` e a projecao operacional do `VinculoTrabalhista`; o conceito formal fica reservado para a evolucao posterior do dominio.
- A etapa 1 de admissao foi implementada no backend como solicitacao rastreavel por tenant.
- O checklist documental minimo da admissao tambem ja esta implementado com recebimento item a item e transicao automatica de status.
- A formalizacao contratual separada tambem ja esta implementada como snapshot proprio, com transicao da admissao para `completed`.
- A admissao agora tambem expõe um dossie documental proprio, com documentos de onboarding e assinatura rastreavel sem misturar contrato com cadastro-base.
- A integracao eSocial minima da admissao tambem ja esta implementada com fila, worker e persistencia de transmissao.
- O eSocial agora tambem possui reprocessamento explicito para admissao e desligamento, com estado de fila, falha e reenvio auditavel.
- O desligamento administrativo minimo tambem ja esta implementado com solicitacao, aprovacao, efetivacao e bloqueio de novos apontamentos.
- O offboarding minimo tambem ja esta implementado com criacao, fechamento, cancelamento e disparo da transmissao de desligamento.
- A transmissao minima de eSocial de desligamento tambem ja esta implementada com fila, worker e persistencia de estados.
- O fluxo minimo de rescisao tambem ja esta implementado, vinculado a um desligamento efetivo, com memoria de calculo, prazo de pagamento, documentos rescisorios assinaveis, criacao, consulta, assinatura, fechamento e cancelamento.
- A politica base de LGPD tambem foi consolidada por classe de dado, com retencao por finalidade, exportacao controlada e expurgo de artefatos temporarios.
- A assinatura dos documentos rescisorios usa `govbr_advanced` como padrao operacional e admite `icp_brasil` como excecao valida quando exigida.
- O runtime atual opera com os roles `admin`, `rh`, `manager`, `auditor` e `employee`, usando `tenant_id`, `rh_roles` e `sub` como base do OIDC local.
- A primeira versao armazena dados de identificacao e operacao do colaborador e da empresa, incluindo CPF, CNPJ, contato, eventos de ponto, documentos, memoria de calculo, trilhas de auditoria e dados remuneratorios quando aplicaveis ao processo.
- O dominio de beneficios agora possui a primeira camada funcional, com catalogo por tenant e atribuicao, suspensao e cancelamento de beneficios por colaborador.
- O dominio de ferias agora possui a primeira camada funcional, com saldo por periodo, solicitacao, aprovacao e cancelamento auditavel.
- O dominio de ferias agora tambem valida a janela concessiva derivada do periodo aquisitivo e bloqueia solicitacoes com conflito de datas.
- O dominio de ferias agora tambem registra aviso formal, pagamento, envio para folha e transmissao ao eSocial como etapas executaveis do ciclo minimo.
- O dominio de 13o salario agora possui uma camada funcional completa da Onda 6, com calculo anual, memoria de avos, medias variaveis, encargos, aprovacao auditavel e ponte para folha.
- O dominio de SST agora possui a primeira base executavel, com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissões eSocial SST por tenant.
- O dominio de ATS agora possui a primeira base executavel, com requisicao de vaga, aprovacao, publicacao, cadastro de candidatos e movimentacao inicial no pipeline.
- O dominio de ATS agora tambem possui agendamento de entrevistas e avaliacao inicial de candidatos no runtime.
- O dominio de ATS agora tambem possui proposta e conversao para pre-admissao, ligando o recrutamento ao fluxo de admissao.

## Personas

- Administrador da empresa
- RH
- Gestor
- Colaborador
- Financeiro/contabilidade
- Auditor/consulta

## Modulos esperados

- Colaboradores
- Cargos e departamentos
- Admissao
- Desligamento
- Documentos
- Ferias
- Afastamentos
- Ponto/jornada
- Beneficios
- Avaliacoes
- Relatorios
- Configuracoes e permissoes

## Requisitos confirmados

- Todo vinculo pertence a uma empresa.
- Todo evento relevante deve gerar auditoria.
- Historico deve ser imutavel.
- Integracoes nao devem alterar historico.
- Dados sensiveis exigem tratamento LGPD.

## Requisitos pendentes

- Confirmar regras operacionais e juridicas que dependem de validacao especializada.
- Os eventos detalhados de desligamento no eSocial continuam como evolucao posterior do [Topico 04](docs/TOPICO-04-PLANO-DE-IMPLEMENTACAO-ADMISSAO-E-DESLIGAMENTO.md).
- O fluxo minimo de rescisao ja existe no runtime; o que resta agora e evoluir os calculos detalhados, a politica final de assinatura documental e o contrato completo de desligamento.
- O fluxo de ferias executavel agora cobre fracionamento, abono pecuniario, aviso formal, pagamento, envio para folha e eSocial auditaveis, sem pontas soltas funcionais no dominio.
- O fluxo de 13o salario executavel agora cobre medias, encargos e ponte operacional para folha; os refinamentos futuros serao de governanca e integracao complementar.
- O eSocial da admissao agora existe em formato minimo; o que resta e evoluir o contrato governamental final, a conciliacao e os fluxos de reprocessamento.

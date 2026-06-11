# Decisões técnicas

## Modelo

### YYYY-MM-DD - Título da decisão

**Contexto:**

**Decisão:**

**Alternativas consideradas:**

**Consequências:**

### 2026-06-03 - Tratar o repositorio como especificacao viva

**Contexto:** A auditoria inicial nao encontrou codigo executavel, manifests de stack ou infraestrutura de aplicacao; o material atual e majoritariamente documental.

**Decisao:** Considerar a documentacao existente como a fonte de verdade provisoria do produto e da arquitetura, ate existir uma base executavel confirmada.

**Alternativas consideradas:** Assumir stack/implementacao implicitamente; iniciar correcoes de codigo sem base valida; aguardar mais contexto antes de consolidar qualquer leitura.

**Consequencias:** Futuras validacoes devem diferenciar claramente requisito documentado de implementacao real; qualquer divergencia entre docs e codigo futuro precisara ser registrada.

### 2026-06-04 - Separar cadastro de rubrica da configuracao de incidencias

**Contexto:** O catalogo mestre define UC-FOL-001 para cadastro de rubrica e UC-FOL-002 para configuracao de incidencias, enquanto as regras de negocio exigem natureza, incidencias e classificacao eSocial para uso pleno da rubrica.

**Decisao:** Tratar UC-FOL-001 como cadastro estrutural da rubrica e deixar a parametrizacao de incidencias, bases e classificacao fiscal/tributaria para UC-FOL-002.

**Alternativas consideradas:** Concentrar tudo em um unico caso de uso; exigir incidencias completas ja no cadastro; modelar o cadastro como rascunho sem separacao funcional.

**Consequencias:** O sistema ganha separacao clara entre identidade estrutural da rubrica e sua aptidao operacional; a rubrica criada em UC-FOL-001 nao deve ser considerada apta para calculo ou transmissao ate a conclusao de UC-FOL-002.

### 2026-06-04 - Separar cadastro-base do colaborador da formalizacao do vinculo

**Contexto:** UC-ADM-001 previa criar colaborador e vinculo empregaticio ao mesmo tempo, enquanto UC-ADM-005 tambem formalizava o contrato.

**Decisao:** Tratar UC-ADM-001 como cadastro-base da pessoa e do colaborador, e UC-ADM-005 como a formalizacao exclusiva do vinculo contratual.

**Alternativas consideradas:** Manter a sobreposicao; mover toda a contratacao para UC-ADM-001; dividir o cadastro sem uma referencia clara de formalizacao.

**Consequencias:** O fluxo de admissao fica com fonte de verdade unica para o contrato, reduzindo duplicidade de estado e de regras de validacao.

### 2026-06-04 - Formalizar fechamento e reabertura do ponto em casos próprios

**Contexto:** As regras de jornada e os casos de tratamento, ajuste, calculo e espelho dependiam de fechamento ou reabertura formal do periodo.

**Decisao:** Criar UC-JOR-011 para fechamento do periodo e UC-JOR-012 para reabertura controlada.

**Alternativas consideradas:** Deixar o fechamento como fluxo alternativo; juntar fechamento e reabertura em um unico caso; manter a operacao implícita.

**Consequencias:** O ciclo de competencia de ponto fica explicitado e auditavel, com melhor separacao entre operacao normal e excecao.

### 2026-06-04 - Tratar adicional noturno como extensao de UC-JOR-008

**Contexto:** As regras do dominio apontavam adicional noturno como parte da apuracao de jornada, mas nao havia caso proprio formalizado.

**Decisao:** Manter o adicional noturno dentro de UC-JOR-008, como extensao formal do calculo de horas extras.

**Alternativas consideradas:** Criar um novo caso de uso; deixar a regra apenas em RN; dividir o calculo em outro modulo.

**Consequencias:** O pacote de ponto permanece enxuto, sem duplicar o motor de apuracao de horas.

### 2026-06-04 - Alinhar UC-ADM-010 ao escopo real

**Contexto:** O catalogo mestre descrevia UC-ADM-010 como inativacao de colaborador desligado, enquanto o arquivo detalhava o desligamento administrativo completo.

**Decisao:** Ajustar o catalogo mestre para refletir o desligamento administrativo como escopo real do caso de uso.

**Alternativas consideradas:** Reduzir o arquivo para uma simples inativacao; manter a divergencia entre catalogo e arquivo.

**Consequencias:** O catalogo mestre passa a representar o comportamento documentado de forma mais fiel.

### 2026-06-04 - Separar processamento mensal da folha do fechamento

**Contexto:** UC-FOL-003 foi detalhado para cálculo e conferência da folha mensal, enquanto UC-FOL-010 permanece como o caso de fechamento da folha.

**Decisao:** Manter o processamento mensal e o fechamento como casos de uso distintos.

**Alternativas consideradas:** Unificar cálculo e fechamento em um único fluxo; deixar o fechamento implícito no processamento; tratar o fechamento apenas como ação de interface.

**Consequencias:** A competência fica mais fácil de auditar, reprocessar e confere sem travar prematuramente a folha.

### 2026-06-04 - Separar adiantamento salarial da folha mensal e complementar

**Contexto:** O adiantamento salarial tem logica financeira propria, com deducao futura e eventual integracao bancaria, mas nao deve ser confundido com o processamento mensal ou com ajustes complementares.

**Decisao:** Tratar o adiantamento salarial como caso de uso proprio, com memoria de calculo, liquidacao especifica e deducao rastreavel na folha mensal.

**Alternativas consideradas:** Embutir o adiantamento na folha mensal; tratar o adiantamento como provento comum; absorver o adiantamento dentro da folha complementar.

**Consequencias:** O valor antecipado fica concilavel e auditavel, reduzindo o risco de mistura indevida entre evento financeiro autonomo e processamento normal de folha.

### 2026-06-04 - Separar calculo de FGTS da liquidacao fundiaria

**Contexto:** O calculo de FGTS precisa produzir base e memoria auditaveis, mas a liquidacao, transmissao ou recolhimento podem depender de processos e integracoes posteriores.

**Decisao:** Tratar UC-FOL-007 como caso de uso de calculo e conferencia, deixando a liquidacao ou transmissao para processos adjacentes quando aplicavel.

**Alternativas consideradas:** Embutir o recolhimento no mesmo caso; tratar o FGTS Digital apenas como detalhe de interface; deixar a etapa de liquidacao totalmente implicita.

**Consequencias:** A apuracao fundiaria permanece rastreavel e separada da etapa de recolhimento, reduzindo o risco de confundir calculo com transmissao.

### 2026-06-04 - Separar calculo de IRRF da retencao fiscal

**Contexto:** O calculo de IRRF precisa produzir base tributaria e memoria auditavel, mas a retencao, recolhimento ou transmissao podem depender de rotinas fiscais posteriores.

**Decisao:** Tratar UC-FOL-008 como caso de uso de calculo e conferencia, deixando a retencao ou transmissao para processos adjacentes quando aplicavel.

**Alternativas consideradas:** Embutir a retenção no mesmo caso; tratar as rotinas fiscais apenas como detalhe de interface; deixar a etapa de retencao totalmente implicita.

**Consequencias:** A apuracao tributaria permanece rastreavel e separada da etapa de recolhimento, reduzindo o risco de confundir calculo com transmissao.

### 2026-06-04 - Tratar holerite como documento versionado e auditavel

**Contexto:** O holerite precisa ser disponibilizado ao colaborador com bases, proventos, descontos e historico por competencia, sem ser apenas uma renderizacao de tela.

**Decisao:** Modelar UC-FOL-009 como caso de uso proprio de geracao, versionamento, disponibilizacao e auditoria do holerite.

**Alternativas consideradas:** Embutir o holerite no fechamento da folha; tratar holerite apenas como relatorio; deixar a disponibilizacao implícita no portal do colaborador.

**Consequencias:** O documento fica rastreavel, reemissivel e auditavel, com trilha de acesso e integracao com gestao documental e portal.

### 2026-06-04 - Separar geracao de holerite da disponibilizacao final

**Contexto:** A regra de dominio indica que a disponibilizacao do holerite ocorre apos o fechamento da folha, mas o caso de uso de geracao vinha publicando o documento no portal antes da competencia ser encerrada.

**Decisao:** Manter `UC-FOL-009` restrito a geracao, consolidacao e arquivamento do holerite, deixando a disponibilizacao final ao colaborador para `UC-FOL-010`.

**Alternativas consideradas:** Publicar o holerite ja em `UC-FOL-009`; remover a etapa de disponibilizacao de `UC-FOL-010`; tratar a publicacao como comportamento implícito do portal.

**Consequencias:** A sequencia de folha fica coerente com o dominio: primeiro gera e arquiva, depois fecha e disponibiliza.

### 2026-06-04 - Adotar monolito modular com stack TypeScript

**Contexto:** O repositorio segue sem base executavel confirmada, mas a documentacao ja precisava de uma diretriz concreta para viabilizar a primeira implementacao.

**Decisao:** Recomendar um monolito modular em TypeScript, com NestJS no backend, React + Vite no frontend, PostgreSQL como banco principal, Redis + BullMQ para filas, Keycloak para autenticacao/SSO, MinIO para documentos, Docker Compose para ambiente local e GitHub Actions para CI/CD.

**Alternativas consideradas:** Microservicos desde o inicio; stack com duas linguagens; adiar completamente a decisao de stack; usar solucoes proprietarias antes de fechar os contratos de dominio.

**Consequencias:** A especificacao ganha uma base executavel coerente e minimamente padronizada, reduzindo risco de fragmentacao precoce e facilitando o primeiro vertical slice.

### 2026-06-04 - Definir o primeiro vertical slice como cadastro, admissao, ponto e folha minima

**Contexto:** O produto possui escopo amplo, mas a primeira entrega precisa provar o fluxo principal sem tentar cobrir todos os modulos de uma vez.

**Decisao:** Adotar como primeiro vertical slice o fluxo: tenant, autenticacao, cadastro de pessoa e colaborador, vinculo basico, admissao simplificada, uma marcacao de ponto, consolidacao de evento, calculo simples de folha, demonstrativo basico e auditoria.

**Alternativas consideradas:** Comecar por BI; começar por portais; começar por integracoes; tentar cobrir todos os modulos no primeiro release.

**Consequencias:** O primeiro release fica pequeno, representativo e testavel, reduzindo risco de implementacao prematura de dominios transversais.

### 2026-06-04 - Fixar o MVP como plataforma minima, nucleo do colaborador e operacao essencial

**Contexto:** O Topico 10 ainda tratava o MVP como sugestao, o que mantinha ambiguidade entre escopo minimo, primeiro slice e backlog posterior.

**Decisao:** Consolidar o MVP em tres camadas: plataforma minima, nucleo do colaborador e operacao essencial, usando os Topicos 10, 11 e 12 como trilha oficial do primeiro release.

**Alternativas consideradas:** Manter o MVP em aberto; tratar o primeiro release apenas como slice tecnico; incorporar todo o catalogo ao MVP.

**Consequencias:** A priorizacao do produto fica fechada para a primeira entrega e o backlog posterior passa a ser explicitamente pos-MVP.

### 2026-06-04 - Usar Employee como projecao operacional do vinculo no MVP

**Contexto:** O dominio conceitual continua descrevendo `VinculoTrabalhista` como a relacao entre `Pessoa` e `Empresa`, mas o slice executavel do MVP persiste essa relacao em `Employee`.

**Decisao:** Tratar `Employee` como a projeao operacional de `VinculoTrabalhista` no MVP, preservando o conceito formal de vinculo para a evolucao posterior do modelo.

**Alternativas consideradas:** Criar uma tabela separada de vinculo ja no MVP; renomear `Employee` para `VinculoTrabalhista`; manter a divergencia sem registro formal.

**Consequencias:** O modelo fisico atual fica alinhado ao que o codigo ja faz, sem perder o conceito de dominio necessario para expansao futura.

### 2026-06-04 - Manter admissao e desligamento como especificacao funcional

**Contexto:** Os documentos de admissao digital, eSocial e desligamento descrevem o comportamento desejado do dominio, mas o runtime executavel atual ainda nao implementa esse fluxo.

**Decisao:** Tratar o pacote UC-ADM e o Topico 04 como especificacao funcional e backlog pos-MVP, sem assumir que haja implementacao correspondente no runtime atual.

**Alternativas consideradas:** Pressupor que o slice executavel ja cobre admissao e desligamento; reclassificar o pacote como implementado; misturar desenho de dominio com comportamento ativo.

**Consequencias:** A documentacao fica mais fiel ao estado real do produto e evita que a proxima fase confunda especificacao com runtime validado.

### 2026-06-04 - Implementar a etapa 1 da admissao como solicitacao rastreavel

**Contexto:** A primeira fatia executavel do Topico 04 precisava virar contrato real no backend sem acoplar ainda checklist documental, eSocial ou desligamento.

**Decisao:** Implementar a etapa 1 como `admission_requests` associadas a `Person`, `Company` e `Employee`, com estados basicos, auditoria e cancelamento controlado.

**Alternativas consideradas:** Pular direto para checklist ou eSocial; usar `Employee` como admissao final; manter apenas o desenho documental.

**Consequencias:** O runtime passa a ter a primeira unidade executavel de admissao, preservando isolamento por tenant e abrindo caminho para as etapas seguintes sem confundir cadastro com contrato.

### 2026-06-04 - Implementar o checklist documental minimo da admissao

**Contexto:** A etapa 1 da admissao ja existe no runtime como solicitacao rastreavel, mas o fluxo ainda precisava de um primeiro conjunto de documentos obrigatorios para mover o estado da admissao de forma controlada.

**Decisao:** Incluir o checklist documental minimo no runtime da admissao, com itens obrigatorios recebidos um a um, auditoria do recebimento e transicao automatica para `pending_documents` e `under_review`.

**Alternativas consideradas:** Deixar o checklist apenas como especificacao; exigir o checklist completo antes de implementar; misturar checklist com formalizacao contratual.

**Consequencias:** A etapa de admissao ganha uma separacao mais clara entre rascunho, pendencia documental e prontidao para contrato, sem avancar ainda para assinatura, eSocial ou desligamento.

### 2026-06-04 - Implementar a formalizacao contratual como snapshot separado

**Contexto:** O checklist documental minimo ja havia colocado a admissao em prontidao para contrato, mas ainda faltava um artefato proprio para registrar a formalizacao sem confundir o contrato com `Employee`.

**Decisao:** Criar `AdmissionContract` como snapshot contratual separado, vinculado a `AdmissionRequest`, com vigencia, tipo de contrato, auditoria e transicao da admissao para `completed`.

**Alternativas consideradas:** Reutilizar `Employee` como contrato final; guardar o contrato dentro da admissao; tratar a formalizacao apenas como evento de auditoria.

**Consequencias:** O MVP preserva `Employee` como projeao operacional do vinculo e passa a registrar a formalizacao contratual em um objeto proprio, facilitando evolucoes futuras sem quebrar o modelo existente.

### 2026-06-04 - Implementar a trilha minima de eSocial da admissao

**Contexto:** A admissao ja possuía solicitacao, checklist e snapshot contratual, mas o fluxo ainda precisava de transmissao assicrona com estados e evidencia de envio para nao depender apenas da especificacao.

**Decisao:** Implementar a trilha minima de eSocial com fila BullMQ, worker dedicado, consulta de transmissao e persistencia de estados `queued`, `sent` e `failed`, deixando o contrato governamental final para evolucao posterior.

**Alternativas consideradas:** Manter o eSocial apenas como especificacao; integrar direto ao endpoint externo sem fila; misturar contrato, admissao e transmissao em um unico passo.

**Consequencias:** O runtime ganha observabilidade, reprocessamento e trilha de falhas para a admissao, mas ainda requer validacao operacional do contrato governamental real antes de ser considerado fechado de ponta a ponta.

### 2026-06-04 - Implementar o desligamento administrativo minimo

**Contexto:** O Topico 04 ainda precisava da primeira fatia executavel de desligamento administrativo, sem misturar o fluxo com rescisao, offboarding ou eSocial de desligamento.

**Decisao:** Implementar `TerminationRequest` com aprovacao, efetivacao, cancelamento controlado, historico e bloqueio de novos apontamentos ao efetivar o desligamento.

**Alternativas consideradas:** Deixar o desligamento apenas como especificacao; pular direto para rescisao; misturar desligamento com offboarding completo.

**Consequencias:** O runtime passa a registrar o desligamento administrativo minimo de forma auditavel e operavel, mas rescisao, offboarding e eSocial de desligamento continuam como evolucao posterior.

### 2026-06-04 - Implementar um scaffold minimo de rescisao

**Contexto:** Depois do desligamento administrativo minimo, o Topico 06 precisava de uma primeira fatia executavel de rescisao sem misturar calculos rescisorios, offboarding ou transmissao governamental final.

**Decisao:** Implementar `RescissionRequest` e `RescissionHistory` vinculados a `TerminationRequest`, com criacao apenas apos desligamento efetivo, consulta, fechamento, cancelamento e trilha de historico/auditoria.

**Alternativas consideradas:** Deixar a rescisao apenas como especificacao; pular direto para calculos e documentos finais; misturar rescisao com offboarding completo.

**Consequencias:** O dominio passa a ter um ponto de entrada real para a rescisao, preservando a separacao entre desligamento administrativo, rescissao operacional e evolucao posterior do offboarding/eSocial de desligamento.

### 2026-06-04 - Implementar o offboarding minimo e o eSocial de desligamento

**Contexto:** O desligamento administrativo minimo e o scaffold de rescisao ja existiam, mas ainda faltava uma etapa operacional para concluir o offboarding e disparar a transmissao minima de desligamento ao eSocial.

**Decisao:** Implementar `TerminationOffboarding` e `TerminationEsocialTransmission` vinculados a `TerminationRequest`, com criacao do offboarding, fechamento, cancelamento e transmissao assicrona `S-2299` apos fechamento.

**Alternativas consideradas:** Manter o offboarding apenas em documento; embutir o eSocial de desligamento dentro do desligamento administrativo; misturar a transmissao com a rescisao.

**Consequencias:** O fluxo de desligamento passa a ter uma trilha executavel entre desligamento administrativo, offboarding e eSocial de desligamento, mantendo a rescisao separada como camada posterior.

### 2026-06-05 - Implementar memoria de calculo e documentos da rescisao

**Contexto:** O fluxo minimo de rescisao ja existia, mas ainda faltava a etapa operacional de memoria de calculo e geracao de documentos finais antes do fechamento.

**Decisao:** Implementar `RescissionCalculation` e `RescissionDocument` vinculados a `RescissionRequest`, com calculo manual estruturado, geracao de documentos rescisorios, fechamento apenas apos documentacao e trilha de historico/auditoria.

**Alternativas consideradas:** Manter a rescisao apenas como scaffold; pular direto para o contrato final e legal completo; misturar calculo rescisorio com offboarding.

**Consequencias:** A rescisao sai do estado de scaffold e passa a ter memoria de calculo e documentos, sem ainda congelar todas as regras legais finais de verbas, prazos e assinaturas.

### 2026-06-05 - Parametrizar prazo e assinatura da rescisao completa

**Contexto:** A rescisao minima ja tinha memoria de calculo e documentos, mas ainda faltava um prazo operacional de pagamento e o rastreamento da assinatura dos documentos rescisorios antes do fechamento.

**Decisao:** Calcular `paymentDueAt` a partir da data de desligamento informada na `TerminationRequest`, usando dez dias corridos como prazo base, e registrar assinatura eletrônica nos documentos rescisorios com bloqueio de fechamento enquanto houver documentos sem assinatura.

**Alternativas consideradas:** Manter o prazo manual; permitir fechamento sem assinatura; exigir apenas assinatura fora do backend; adiar a modelagem para uma camada futura.

**Consequencias:** O fluxo rescisorio passa a expor prazo e assinatura como regra de maquina, mas a politica final por tipo documental e nivel de assinatura ainda deve ser validada com a operacao e o juridico.

### 2026-06-05 - Definir politica base de retencao e exportacao

**Contexto:** A frente de LGPD e auditoria reduziu a exposicao de dados sensiveis, mas a politica operacional de retencao e exportacao ainda precisava sair do estado apenas declarativo.

**Decisao:** Adotar uma politica base orientada por classe de dado, finalidade, obrigacao legal/regulatoria e necessidade operacional. Dados operacionais ficam restritos ao ciclo de vida ativo, trilhas de auditoria mantem apenas metadados essenciais, documentos sensiveis seguem a guarda aplicavel e exportacoes sao geradas sob demanda, com escopo controlado, trilha de auditoria e expurgo automatico do artefato temporario.

**Alternativas consideradas:** Manter a politica em aberto; fixar prazos numericos sem validacao juridica; tratar exportacao como dump livre; reter tudo indefinidamente.

**Consequencias:** O sistema passa a ter um contrato de privacidade minimamente executavel em nivel de politica. Os prazos numericos finais, os formatos autorizados e as excecoes por classe ainda precisam de validacao juridico-operacional.

### 2026-06-05 - Definir politica de assinatura dos documentos rescisorios

**Contexto:** O fluxo de rescisao ja expunha assinatura rastreavel por documento, mas faltava fechar qual nivel de assinatura usar por padrao e quando admitir excecao.

**Decisao:** Adotar `govbr_advanced` como assinatura padrao para os documentos rescisorios do runtime, permitindo `icp_brasil` como excecao quando houver exigencia juridica, contratual ou operacional mais forte. O backend deve aceitar apenas esses dois metodos.

**Alternativas consideradas:** Exigir sempre ICP-Brasil; aceitar qualquer string; manter a escolha apenas em documentacao; deixar o metodo livre por documento sem contrato.

**Consequencias:** O comportamento fica previsivel e auditavel, sem impedir excecao quando houver necessidade. A politica ainda depende de validacao juridico-operacional para os tipos documentais futuros, mas o contrato atual ja fica fechado.

### 2026-06-05 - Definir formatos de exportacao controlada

**Contexto:** A politica base de LGPD precisava fechar os formatos autorizados para exportacao, para que o comportamento esperado ficasse claro antes de existir um exportador dedicado.

**Decisao:** Limitar exportacoes controladas a `json`, `csv`, `pdf` e `zip`, selecionados conforme a finalidade, e exigir mascaramento de campos sensiveis quando o valor integral nao for necessario.

**Alternativas consideradas:** Permitir qualquer formato; restringir a um formato unico; deixar a exportacao totalmente indefinida; acoplar a exportacao ao formato interno do banco.

**Consequencias:** A politica passa a ser clara para integracoes, auditoria e portabilidade controlada. A implementacao tecnica do exportador ainda pode ser evoluida depois, mas o contrato de formato fica fechado.

### 2026-06-05 - Definir niveis de mascaramento para exportacao

**Contexto:** Os formatos de exportacao ja estavam fechados, mas faltava explicitar qual nivel de mascaramento cada trilha ou pacote deve aplicar.

**Decisao:** Adotar tres niveis: `strict` para trilhas de auditoria sensiveis e exportacoes externas, `controlled` para espelho e comprovantes com contexto operacional, e `aggregate` para BI e analitica.

**Alternativas consideradas:** Usar um unico nivel para tudo; deixar o mascaramento no criterio do operador; mascarar apenas CPF; expor dados integrais por padrao.

**Consequencias:** A politica fica aplicavel por caso de uso, reduzindo ambiguidade e evitando exposicao excessiva de dados pessoais e sensiveis.

### 2026-06-05 - Definir retencao por classe sem prazo unico

**Contexto:** A LGPD nao fixa um prazo numerico unico para todo o tratamento, entao a politica precisava parar de sugerir um numero global e passar a refletir o criterio real de finalidade e classe.

**Decisao:** A politica de retencao nao adota um prazo unico. Cada classe de dado deve ter sua propria politica versionada, definida por finalidade, base legal e necessidade operacional, com legal hold como excecao.

**Alternativas consideradas:** Fixar um prazo universal; manter a retencao indefinida; deixar tudo apenas como configuracao futura; tratar toda classe igual.

**Consequencias:** O produto evita prometer um numero arbitrario e passa a exigir que cada classe seja tratada conforme a natureza do dado e o fundamento de retenção aplicavel.

### 2026-06-05 - Definir baseline operacional do UC-JOR

**Contexto:** Os casos UC-JOR 013 a 019 estavam descritos, mas faltava explicitar o baseline operacional que o runtime e a documentacao passam a adotar como padrao para feriados, tolerancia, dispositivos, comprovantes, adicional noturno, DSR e consolidacao para folha.

**Decisao:** Adotar como baseline: feriados nacionais pela legislação federal e feriados locais por norma oficial da respectiva localidade; tolerancia configurada por empresa/jornada/perfil com precedencia explicita; dispositivos com base em terminal fisico, mobile e web/kiosk, com recursos opcionais; comprovante de ponto como PDF rastreavel; adicional noturno com baseline legal de 20% e hora reduzida; DSR conforme Lei 605/49 e politica coletiva/corporativa; e consolidacao para folha por mapeamento versionado de evento para rubrica.

**Alternativas consideradas:** Manter os casos apenas como especificacao abstrata; fixar um valor unico para todos os cenarios; deixar cada item sem baseline; misturar regra legal com configuracao sem precedencia.

**Consequencias:** O pacote UC-JOR fica com comportamento esperado mais claro e com menos lacunas para a proxima etapa de implementacao, embora a aplicacao final por empresa continue dependente de configuracao e validacao especializada quando houver conflito local ou coletivo.

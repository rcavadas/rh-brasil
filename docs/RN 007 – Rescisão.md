# Sistema de RH para o Mercado Brasileiro

# Regras de Negócio (RN)

## Bloco 07 – Rescisão

### Versão

1.0

### Objetivo

Este documento descreve as regras de negócio relacionadas ao processo de desligamento, cálculo de verbas rescisórias, aviso prévio, férias, décimo terceiro, FGTS, eSocial, documentos rescisórios, prazos legais, auditoria e integração com folha de pagamento.

---

# Tipos de Desligamento

## RN-611

O sistema deve permitir registrar diferentes tipos de desligamento.

## RN-612

O sistema deve permitir desligamento por pedido de demissão.

## RN-613

O sistema deve permitir desligamento sem justa causa por iniciativa do empregador.

## RN-614

O sistema deve permitir desligamento por justa causa.

## RN-615

O sistema deve permitir desligamento por término de contrato por prazo determinado.

## RN-616

O sistema deve permitir desligamento por acordo entre empregado e empregador.

## RN-617

O sistema deve permitir desligamento por falecimento do colaborador.

## RN-618

O sistema deve permitir desligamento por aposentadoria quando aplicável.

## RN-619

O motivo de desligamento deve ser compatível com as tabelas oficiais do eSocial.

## RN-620

Cada tipo de desligamento deve determinar automaticamente as verbas rescisórias aplicáveis.

---

# Cadastro da Rescisão

## RN-621

Toda rescisão deve possuir data de desligamento.

## RN-622

Toda rescisão deve possuir motivo de desligamento.

## RN-623

Toda rescisão deve possuir tipo de aviso prévio informado.

## RN-624

Toda rescisão deve possuir responsável pelo cadastro.

## RN-625

O sistema deve validar se o colaborador possui vínculo ativo antes da rescisão.

## RN-626

O sistema deve impedir duplicidade de rescisão para o mesmo contrato.

## RN-627

O sistema deve permitir cancelamento de rescisão antes do fechamento definitivo.

## RN-628

Cancelamentos devem exigir justificativa.

## RN-629

Toda alteração na rescisão deve manter histórico.

## RN-630

A rescisão deve possuir status: rascunho, calculada, conferida, fechada, transmitida ou cancelada.

---

# Aviso Prévio

## RN-631

O sistema deve permitir aviso prévio trabalhado.

## RN-632

O sistema deve permitir aviso prévio indenizado.

## RN-633

O sistema deve permitir dispensa do cumprimento do aviso prévio.

## RN-634

O sistema deve permitir ausência de aviso prévio quando aplicável.

## RN-635

O aviso prévio deve ser calculado conforme tipo de desligamento.

## RN-636

O sistema deve calcular dias de aviso prévio conforme tempo de serviço quando aplicável.

## RN-637

O sistema deve controlar data de início do aviso prévio.

## RN-638

O sistema deve controlar data de término do aviso prévio.

## RN-639

O aviso prévio indenizado deve refletir nas verbas rescisórias quando aplicável.

## RN-640

O aviso prévio deve possuir memória de cálculo.

---

# Saldo de Salário

## RN-641

O sistema deve calcular saldo de salário até a data de desligamento.

## RN-642

O cálculo deve considerar dias efetivamente trabalhados na competência da rescisão.

## RN-643

Faltas injustificadas devem impactar o saldo de salário.

## RN-644

Afastamentos devem impactar o saldo conforme tipo e período.

## RN-645

Horas extras pendentes devem ser consideradas quando aprovadas.

## RN-646

Adicional noturno pendente deve ser considerado quando aplicável.

## RN-647

Banco de horas positivo deve ser quitado quando aplicável.

## RN-648

Banco de horas negativo deve ser tratado conforme regra legal, contratual ou coletiva aplicável.

## RN-649

Verbas variáveis da competência devem ser consideradas quando aplicável.

## RN-650

Todo cálculo de saldo de salário deve possuir memória de cálculo.

---

# Férias na Rescisão

## RN-651

O sistema deve calcular férias vencidas quando existentes.

## RN-652

O sistema deve calcular férias proporcionais quando aplicáveis.

## RN-653

O sistema deve calcular adicional constitucional de um terço sobre férias devidas.

## RN-654

O sistema deve considerar períodos aquisitivos já quitados.

## RN-655

O sistema deve considerar períodos aquisitivos em aberto.

## RN-656

Férias indenizadas devem possuir rubrica específica.

## RN-657

Férias vencidas em dobro devem ser calculadas quando aplicável.

## RN-658

O sistema deve considerar faltas injustificadas no período aquisitivo.

## RN-659

O sistema deve registrar memória de cálculo das férias rescisórias.

## RN-660

Alterações no histórico de férias devem gerar alerta para recálculo da rescisão.

---

# Décimo Terceiro na Rescisão

## RN-661

O sistema deve calcular décimo terceiro proporcional na rescisão quando aplicável.

## RN-662

O cálculo deve considerar os avos adquiridos até a data de desligamento.

## RN-663

Valores de décimo terceiro já pagos no ano-base devem ser abatidos quando aplicável.

## RN-664

O sistema deve calcular médias de verbas variáveis quando aplicável.

## RN-665

O sistema deve considerar afastamentos que impactem o décimo terceiro.

## RN-666

O décimo terceiro rescisório deve possuir rubrica própria.

## RN-667

O sistema deve calcular encargos incidentes sobre o décimo terceiro rescisório.

## RN-668

O sistema deve registrar memória de cálculo.

## RN-669

Alterações em verbas variáveis devem gerar alerta para recálculo.

## RN-670

Todo cálculo deve ser auditável.

---

# Multa e Depósitos de FGTS

## RN-671

O sistema deve calcular FGTS incidente sobre verbas rescisórias quando aplicável.

## RN-672

O sistema deve identificar verbas com incidência de FGTS.

## RN-673

O sistema deve calcular multa rescisória do FGTS quando devida.

## RN-674

O percentual da multa deve variar conforme tipo de desligamento.

## RN-675

O sistema deve considerar bases históricas necessárias ao cálculo.

## RN-676

O sistema deve permitir conferência da base de FGTS.

## RN-677

O sistema deve gerar informações compatíveis com o FGTS Digital.

## RN-678

Divergências entre folha, eSocial e FGTS Digital devem gerar alerta.

## RN-679

O sistema deve registrar memória de cálculo do FGTS rescisório.

## RN-680

Todo cálculo relacionado ao FGTS deve ser auditável.

---

# Descontos Rescisórios

## RN-681

O sistema deve calcular descontos legais aplicáveis.

## RN-682

O sistema deve calcular INSS quando aplicável.

## RN-683

O sistema deve calcular IRRF quando aplicável.

## RN-684

O sistema deve descontar adiantamentos salariais pendentes quando aplicável.

## RN-685

O sistema deve descontar benefícios utilizados e não compensados quando aplicável.

## RN-686

O sistema deve descontar empréstimos consignados conforme saldo informado.

## RN-687

O sistema deve respeitar limites legais de desconto quando aplicáveis.

## RN-688

Descontos manuais devem exigir justificativa.

## RN-689

Todo desconto deve possuir origem rastreável.

## RN-690

O sistema deve registrar memória de cálculo dos descontos.

---

# Verbas por Tipo de Rescisão

## RN-691

Pedido de demissão deve gerar apenas as verbas aplicáveis ao respectivo motivo.

## RN-692

Dispensa sem justa causa deve gerar verbas específicas do desligamento sem justa causa.

## RN-693

Dispensa por justa causa deve restringir verbas conforme regra aplicável.

## RN-694

Término de contrato por prazo determinado deve gerar verbas compatíveis com o contrato.

## RN-695

Rescisão antecipada de contrato por prazo determinado deve permitir cálculo de indenizações quando aplicável.

## RN-696

Acordo entre as partes deve aplicar regras próprias de aviso prévio, multa de FGTS e demais verbas.

## RN-697

Falecimento deve possuir tratamento específico para pagamento a dependentes ou sucessores.

## RN-698

O sistema deve permitir parametrização de verbas por motivo de desligamento.

## RN-699

Alterações na parametrização devem manter histórico.

## RN-700

O sistema deve impedir cálculo com motivo de desligamento incompatível com o vínculo.

---

# Prazos Legais e Pagamento

## RN-701

O sistema deve calcular a data limite para pagamento das verbas rescisórias.

## RN-702

O sistema deve gerar alerta de prazo próximo ao vencimento.

## RN-703

O sistema deve gerar alerta de prazo vencido.

## RN-704

O sistema deve registrar data efetiva de pagamento.

## RN-705

Pagamentos fora do prazo devem gerar alerta de risco trabalhista.

## RN-706

O sistema deve permitir controle de multas ou penalidades quando aplicáveis.

## RN-707

O sistema deve gerar demonstrativo financeiro da rescisão.

## RN-708

O sistema deve permitir geração de arquivo bancário para pagamento.

## RN-709

Rejeições bancárias devem gerar pendência.

## RN-710

Todo pagamento rescisório deve possuir rastreabilidade.

---

# Documentos Rescisórios

## RN-711

O sistema deve gerar Termo de Rescisão do Contrato de Trabalho.

## RN-712

O sistema deve gerar Termo de Quitação quando aplicável.

## RN-713

O sistema deve gerar demonstrativo de verbas rescisórias.

## RN-714

O sistema deve gerar comprovante de pagamento quando aplicável.

## RN-715

O sistema deve permitir anexar documentos assinados.

## RN-716

O sistema deve permitir assinatura eletrônica de documentos rescisórios.

## RN-717

O sistema deve registrar data de emissão dos documentos.

## RN-718

O sistema deve registrar ciência do colaborador quando aplicável.

## RN-719

Documentos rescisórios devem permanecer disponíveis para auditoria.

## RN-720

O sistema deve controlar versões dos documentos gerados.

---

# Homologação e Conferência

## RN-721

O sistema deve permitir etapa de conferência da rescisão.

## RN-722

O sistema deve permitir aprovação da rescisão por usuário autorizado.

## RN-723

O sistema deve permitir fluxo de aprovação multinível.

## RN-724

A aprovação deve registrar usuário, data e hora.

## RN-725

Reprovações devem exigir justificativa.

## RN-726

O sistema deve permitir checklist rescisório.

## RN-727

O checklist deve ser parametrizável por tipo de desligamento.

## RN-728

Pendências obrigatórias devem bloquear o fechamento.

## RN-729

O sistema deve registrar histórico de conferências.

## RN-730

Toda homologação interna deve ser auditável.

---

# Integração com Folha

## RN-731

A rescisão deve integrar automaticamente com a folha de pagamento.

## RN-732

Verbas rescisórias devem possuir rubricas específicas.

## RN-733

Rubricas rescisórias devem possuir incidências configuradas.

## RN-734

O sistema deve impedir duplicidade entre folha mensal e rescisão.

## RN-735

Eventos de ponto posteriores ao cálculo devem gerar alerta.

## RN-736

Eventos de férias posteriores ao cálculo devem gerar alerta.

## RN-737

Alterações salariais retroativas devem gerar alerta para recálculo.

## RN-738

A rescisão fechada deve bloquear alterações em lançamentos utilizados.

## RN-739

A reabertura deve exigir justificativa.

## RN-740

Toda integração com folha deve ser rastreável.

---

# Integração com eSocial

## RN-741

Toda rescisão deve gerar evento S-2299 quando aplicável.

## RN-742

O sistema deve gerar evento S-2399 quando aplicável a trabalhador sem vínculo.

## RN-743

O motivo de desligamento informado deve ser compatível com as tabelas do eSocial.

## RN-744

O sistema deve validar dados obrigatórios antes da transmissão.

## RN-745

Eventos rejeitados pelo eSocial devem permanecer pendentes de correção.

## RN-746

O sistema deve registrar motivo da rejeição.

## RN-747

Eventos corrigidos devem permitir reenvio.

## RN-748

O recibo retornado pelo eSocial deve ser armazenado.

## RN-749

O sistema deve permitir retificação de evento quando aplicável.

## RN-750

Toda transmissão deve possuir protocolo e trilha de auditoria.

---

# FGTS Digital e Obrigações Rescisórias

## RN-751

O sistema deve gerar dados compatíveis com o FGTS Digital para recolhimentos rescisórios.

## RN-752

O sistema deve permitir conferência das bases utilizadas no FGTS Digital.

## RN-753

O sistema deve identificar recolhimentos rescisórios devidos.

## RN-754

O sistema deve controlar status da guia rescisória.

## RN-755

O sistema deve registrar vencimento da guia.

## RN-756

O sistema deve registrar pagamento da guia quando informado.

## RN-757

Guias vencidas devem gerar alerta.

## RN-758

Diferenças entre valores calculados e valores recolhidos devem gerar pendência.

## RN-759

O sistema deve manter histórico dos recolhimentos.

## RN-760

Toda integração ou conferência de FGTS Digital deve ser auditável.

---

# Cancelamento, Retificação e Reabertura

## RN-761

O sistema deve permitir cancelamento de rescisão quando legalmente possível.

## RN-762

Cancelamentos devem exigir justificativa.

## RN-763

Cancelamentos devem registrar usuário, data e hora.

## RN-764

O sistema deve permitir reabertura de rescisão fechada mediante permissão específica.

## RN-765

A reabertura deve exigir justificativa formal.

## RN-766

Alterações após reabertura devem manter histórico completo.

## RN-767

Rescisões transmitidas ao eSocial devem exigir tratamento compatível com retificação ou exclusão de evento.

## RN-768

O sistema deve impedir cancelamento sem análise de impactos em folha, eSocial e FGTS.

## RN-769

O sistema deve registrar impactos gerados por cancelamento ou retificação.

## RN-770

Toda reabertura, retificação ou cancelamento deve ser auditável.

---

# Relatórios

## RN-771

O sistema deve gerar relatório analítico de rescisões.

## RN-772

O sistema deve gerar relatório sintético de rescisões.

## RN-773

O sistema deve gerar relatório por motivo de desligamento.

## RN-774

O sistema deve gerar relatório de verbas rescisórias.

## RN-775

O sistema deve gerar relatório de FGTS rescisório.

## RN-776

O sistema deve gerar relatório de prazos de pagamento.

## RN-777

O sistema deve gerar relatório de eventos eSocial pendentes.

## RN-778

O sistema deve gerar relatório de rescisões canceladas.

## RN-779

O sistema deve permitir exportação dos relatórios.

## RN-780

Toda exportação deve respeitar permissões de acesso.

---

# Auditoria e Segurança

## RN-781

Todo cálculo rescisório deve possuir memória de cálculo.

## RN-782

Toda alteração manual deve exigir justificativa.

## RN-783

Toda alteração manual deve registrar usuário, data e hora.

## RN-784

O sistema deve controlar permissões para cálculo, conferência, fechamento, reabertura e cancelamento.

## RN-785

Usuários sem permissão não podem visualizar valores rescisórios.

## RN-786

O sistema deve proteger dados pessoais e financeiros conforme LGPD.

## RN-787

O sistema deve registrar acessos aos documentos rescisórios.

## RN-788

O sistema deve registrar exportações de dados rescisórios.

## RN-789

O sistema deve permitir auditoria por colaborador, competência, motivo e usuário.

## RN-790

O sistema deve manter trilha completa de auditoria da rescisão.

---

# Resumo do Bloco

Este bloco contempla:

* Tipos de desligamento
* Cadastro e status da rescisão
* Aviso prévio
* Saldo de salário
* Férias vencidas, proporcionais e indenizadas
* Décimo terceiro proporcional
* FGTS e multa rescisória
* Descontos rescisórios
* Verbas por motivo de desligamento
* Prazos legais
* Documentos rescisórios
* Homologação e conferência
* Integração com folha
* Integração com eSocial
* FGTS Digital
* Cancelamento, retificação e reabertura
* Relatórios
* Auditoria e segurança

---

# Próximo Bloco

## Bloco 08 – SST, Medicina Ocupacional e Segurança do Trabalho

Faixa prevista:

**RN-791 a RN-900**

Abrangendo:

* ASO
* Exames ocupacionais
* CAT
* PGR
* PCMSO
* LTCAT
* EPI
* Treinamentos obrigatórios
* Riscos ocupacionais
* Ambientes de trabalho
* Eventos S-2210, S-2220 e S-2240
* Auditoria de SST

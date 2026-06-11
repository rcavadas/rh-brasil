# Sistema de RH para o Mercado Brasileiro

# Regras de Negócio (RN)

## Bloco 12 – Workflow e Aprovações

### Versão

1.0

### Objetivo

Este documento descreve as regras de negócio relacionadas ao motor de workflow, fluxos de aprovação, regras condicionais, SLAs, escalonamentos, notificações, delegações e auditoria de processos de RH.

---

# Motor de Workflow

## RN-1451

O sistema deve possuir motor de workflow parametrizável.

## RN-1452

O sistema deve permitir criação de fluxos por tipo de processo.

## RN-1453

Cada fluxo deve possuir etapas configuráveis.

## RN-1454

Cada etapa deve possuir responsáveis definidos.

## RN-1455

O sistema deve permitir aprovação sequencial.

## RN-1456

O sistema deve permitir aprovação paralela.

## RN-1457

O sistema deve permitir aprovação condicional.

## RN-1458

O sistema deve permitir fluxo automático sem aprovação quando configurado.

## RN-1459

O sistema deve registrar versão do fluxo utilizado.

## RN-1460

Toda execução de workflow deve ser auditável.

---

# Tipos de Processos

## RN-1461

O sistema deve suportar workflow para solicitação de férias.

## RN-1462

O sistema deve suportar workflow para ajuste de ponto.

## RN-1463

O sistema deve suportar workflow para horas extras.

## RN-1464

O sistema deve suportar workflow para admissão.

## RN-1465

O sistema deve suportar workflow para desligamento.

## RN-1466

O sistema deve suportar workflow para alteração salarial.

## RN-1467

O sistema deve suportar workflow para promoção.

## RN-1468

O sistema deve suportar workflow para transferência.

## RN-1469

O sistema deve suportar workflow para benefícios.

## RN-1470

O sistema deve suportar workflow para solicitações gerais ao RH.

---

# Regras Condicionais

## RN-1471

O sistema deve permitir regras condicionais por cargo.

## RN-1472

O sistema deve permitir regras condicionais por departamento.

## RN-1473

O sistema deve permitir regras condicionais por centro de custo.

## RN-1474

O sistema deve permitir regras condicionais por unidade organizacional.

## RN-1475

O sistema deve permitir regras condicionais por valor financeiro.

## RN-1476

O sistema deve permitir regras condicionais por tipo de contrato.

## RN-1477

O sistema deve permitir regras condicionais por sindicato.

## RN-1478

O sistema deve permitir regras condicionais por nível hierárquico.

## RN-1479

O sistema deve permitir regras condicionais por empresa ou filial.

## RN-1480

Toda regra condicional deve possuir vigência e histórico.

---

# Aprovações

## RN-1481

Toda aprovação deve registrar aprovador.

## RN-1482

Toda aprovação deve registrar data e hora.

## RN-1483

Toda aprovação deve registrar etapa correspondente.

## RN-1484

O sistema deve permitir aprovação individual.

## RN-1485

O sistema deve permitir aprovação em lote quando configurado.

## RN-1486

O sistema deve permitir reprovação.

## RN-1487

Toda reprovação deve exigir justificativa.

## RN-1488

O sistema deve permitir solicitação de ajustes antes da aprovação.

## RN-1489

O sistema deve registrar histórico completo das decisões.

## RN-1490

Toda aprovação deve ser auditável.

---

# SLAs

## RN-1491

Cada etapa de workflow deve permitir configuração de SLA.

## RN-1492

O SLA deve poder ser definido em horas ou dias úteis.

## RN-1493

O sistema deve calcular vencimento do SLA automaticamente.

## RN-1494

O sistema deve gerar alerta de SLA próximo do vencimento.

## RN-1495

O sistema deve gerar alerta de SLA vencido.

## RN-1496

O sistema deve registrar tempo total de atendimento.

## RN-1497

O sistema deve registrar tempo por etapa.

## RN-1498

O sistema deve permitir relatório de cumprimento de SLA.

## RN-1499

O sistema deve permitir configuração de calendários úteis.

## RN-1500

Todo descumprimento de SLA deve ser rastreável.

---

# Escalonamento

## RN-1501

O sistema deve permitir escalonamento automático.

## RN-1502

O escalonamento deve ocorrer quando o SLA for vencido.

## RN-1503

O sistema deve permitir escalonamento para superior hierárquico.

## RN-1504

O sistema deve permitir escalonamento para grupo de usuários.

## RN-1505

O sistema deve permitir escalonamento para o RH.

## RN-1506

O sistema deve registrar motivo do escalonamento.

## RN-1507

O sistema deve notificar responsáveis pelo escalonamento.

## RN-1508

O sistema deve manter histórico do escalonamento.

## RN-1509

O sistema deve permitir escalonamento manual por usuário autorizado.

## RN-1510

Todo escalonamento deve ser auditável.

---

# Delegação

## RN-1511

O sistema deve permitir delegação temporária de aprovações.

## RN-1512

A delegação deve possuir data inicial.

## RN-1513

A delegação deve possuir data final.

## RN-1514

A delegação deve indicar usuário delegante.

## RN-1515

A delegação deve indicar usuário delegado.

## RN-1516

O sistema deve impedir delegação sem vigência válida.

## RN-1517

O sistema deve permitir revogação da delegação.

## RN-1518

A revogação deve registrar data, hora e responsável.

## RN-1519

O sistema deve manter histórico das delegações.

## RN-1520

Toda delegação deve ser auditável.

---

# Notificações

## RN-1521

O sistema deve notificar abertura de nova solicitação.

## RN-1522

O sistema deve notificar pendência de aprovação.

## RN-1523

O sistema deve notificar aprovação realizada.

## RN-1524

O sistema deve notificar reprovação realizada.

## RN-1525

O sistema deve notificar solicitação de ajuste.

## RN-1526

O sistema deve notificar SLA próximo do vencimento.

## RN-1527

O sistema deve notificar SLA vencido.

## RN-1528

O sistema deve permitir notificações por e-mail.

## RN-1529

O sistema deve permitir notificações por aplicativo móvel.

## RN-1530

Toda notificação deve possuir registro de envio.

---

# Histórico e Rastreabilidade

## RN-1531

Cada processo deve possuir linha do tempo.

## RN-1532

A linha do tempo deve registrar criação do processo.

## RN-1533

A linha do tempo deve registrar mudanças de etapa.

## RN-1534

A linha do tempo deve registrar aprovações.

## RN-1535

A linha do tempo deve registrar reprovações.

## RN-1536

A linha do tempo deve registrar comentários.

## RN-1537

A linha do tempo deve registrar anexos.

## RN-1538

A linha do tempo deve registrar escalonamentos.

## RN-1539

A linha do tempo deve registrar encerramento.

## RN-1540

Toda linha do tempo deve ser imutável para usuários comuns.

---

# Permissões e Segurança

## RN-1541

O sistema deve controlar quem pode criar fluxos.

## RN-1542

O sistema deve controlar quem pode editar fluxos.

## RN-1543

O sistema deve controlar quem pode aprovar solicitações.

## RN-1544

O sistema deve controlar quem pode cancelar solicitações.

## RN-1545

O sistema deve controlar quem pode reabrir processos.

## RN-1546

O sistema deve impedir aprovação por usuário não autorizado.

## RN-1547

O sistema deve impedir autoaprovação quando configurado.

## RN-1548

O sistema deve proteger dados sensíveis dos processos.

## RN-1549

O sistema deve registrar acessos aos processos.

## RN-1550

Toda ação no workflow deve possuir trilha de auditoria.

---

# Resumo do Bloco

Este bloco contempla:

* Motor de workflow
* Tipos de processos
* Regras condicionais
* Aprovações
* SLAs
* Escalonamento
* Delegação
* Notificações
* Histórico e rastreabilidade
* Permissões e segurança

---

# Próximo Bloco

## Bloco 13 – Gestão Documental e Assinaturas

Faixa prevista:

**RN-1551 a RN-1650**

Abrangendo:

* GED
* Tipos documentais
* Documentos do colaborador
* Contratos
* ASO
* Recibos
* Holerites
* Versionamento
* Retenção documental
* Assinatura eletrônica
* Assinatura ICP-Brasil
* Evidências de assinatura
* Auditoria documental

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-019 - Consolidar Eventos de Ponto para Folha

### Versao

1.0

---

# Objetivo

Permitir a consolidacao dos eventos de ponto que possuem reflexo em folha, como horas extras, adicional noturno, DSR, faltas, atrasos, saidas antecipadas, abonos e outros eventos correlatos, garantindo memoria de integracao, rastreabilidade e coerencia com a apuracao de ponto e com a competencia de folha.

Baseline operacional:

- o mapeamento de ponto para folha e configurado por empresa e por competencia;
- os eventos base da primeira versao incluem horas extras, adicional noturno, DSR, faltas, atrasos, saidas antecipadas e abonos;
- a rubrica de folha e sempre uma configuracao versionada, nunca inferida silenciosamente;
- divergencias de integracao geram pendencia auditavel em vez de sobrescrever a origem.

---

# Atores

- Sistema de Ponto
- Analista de RH
- Folha de Pagamento
- Gestor
- Auditor

---

# Pre-condicoes

- Ponto tratado e consolidado.
- Regra de integracao com folha configurada.
- Eventos de ponto elegiveis disponiveis.
- Competencia de folha identificada.
- Usuario autenticado e com permissao para consolidacao.

---

# Gatilho

O processo inicia quando o sistema precisa preparar os eventos de ponto para envio, conferencia ou integracao com a folha de pagamento.

---

# Fluxo Principal

1. Sistema identifica a competencia de origem do ponto.
2. Sistema carrega eventos elegiveis com reflexo em folha.
3. Sistema valida fechamento, reabertura e status de aprovacao quando aplicavel.
4. Sistema consolida horas extras, adicional noturno, DSR e demais eventos configurados.
5. Sistema separa eventos por rubrica, natureza e competencia de reflexo.
6. Sistema calcula totais de integracao.
7. Sistema registra memoria de consolidacao.
8. Sistema disponibiliza os eventos consolidados para folha.
9. Sistema registra auditoria da consolidacao.
10. Sistema sinaliza pendencias quando houver inconsistencias.

---

# Fluxos Alternativos

## FA-01 - Ponto nao tratado

Sistema bloqueia a consolidacao.

## FA-02 - Evento sem aprovacao

Sistema bloqueia ou cria pendencia conforme regra configurada.

## FA-03 - Competencia fechada com divergencia

Sistema exige fluxo de reabertura ou excecao formal.

## FA-04 - Regra de integracao ausente

Sistema usa mapeamento padrao ou gera pendencia conforme politica.

---

# Pos-condicoes

- Eventos de ponto consolidados.
- Memoria de integracao registrada.
- Informacoes disponiveis para folha.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- Somente eventos aprovados ou consolidados conforme politica devem seguir para folha.
- A consolidacao deve respeitar a competencia de ponto e a competencia de reflexo em folha.
- A consolidacao nao pode alterar a marcação original nem os calculos de origem.
- O mapeamento para folha deve ser rastreavel por tipo de evento e por rubrica.
- Divergencias de integracao devem gerar pendencia auditavel.

---

# Entidades Envolvidas

## TimeSheetPayrollEventBatch

```text
id
company_id
period_id
payroll_period_id
status
created_at
created_by
updated_at
updated_by
```

## TimeSheetPayrollEventBatchItem

```text
id
batch_id
source_event_type
source_event_id
payroll_rubric_id
amount
reference_date
status
reason
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Competencia de origem | Obrigatorio |
| Competencia de reflexo | Obrigatorio |
| Evento de ponto | Obrigatorio |
| Rubrica de folha | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Consolidar |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-sheet/payroll-events/consolidate
```

```http
GET /api/v1/time-sheet/payroll-events/batches/{id}
```

```http
POST /api/v1/time-sheet/payroll-events/batches/{id}/approve
```

---

# Eventos de Dominio

```text
TimeSheetPayrollEventsConsolidated
TimeSheetPayrollEventsApproved
TimeSheetPayrollEventsSentToPayroll
```

---

# Integracoes Impactadas

- Folha
- Banco de horas
- Workflow
- Auditoria
- Analytics

---

# Casos de Teste

## CT-JOR-019-001

Consolidar eventos validos para a competencia.

Resultado esperado:

```text
Eventos consolidados com sucesso.
```

## CT-JOR-019-002

Consolidar com evento nao aprovado.

Resultado esperado:

```text
Sistema bloqueia ou cria pendencia.
```

## CT-JOR-019-003

Consolidar competencia fechada com divergencia.

Resultado esperado:

```text
Sistema exige fluxo autorizado.
```

---

# Metricas

- Lotes de eventos consolidados
- Pendencias de integracao por competencia
- Eventos de ponto enviados para folha

---

# Observacoes Arquiteturais

A consolidacao de eventos de ponto para folha deve ser tratada como camada de integracao auditavel, distinta da apuracao de ponto e distinta do fechamento de folha.

O lote de consolidacao precisa ser reproduzivel por competencia e por regra de integracao.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra a trilha operacional do ponto antes da folha. Ele deve ser lido depois da apuracao de horas, adicionais e regras de descanso, porque produz o lote consumido por `UC-FOL`.

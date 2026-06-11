# UC-GST-007

## Consultar Indicadores da Equipe

### Objetivo

Permitir que o gestor consulte indicadores operacionais da sua equipe, com recorte por periodo e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* API de BI
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Indicadores disponiveis para a equipe.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa indicadores da equipe.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Indicadores da Equipe
```

### Etapa 2

Sistema apresenta os indicadores disponiveis.

### Etapa 3

Gestor seleciona o indicador e o periodo.

### Etapa 4

Sistema exibe os valores consolidados.

### Etapa 5

Sistema permite filtros adicionais quando disponiveis.

### Etapa 6

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Indicador indisponivel

### Condicao

O indicador nao possui dados suficientes.

### Fluxo

* Sistema informa indisponibilidade parcial.

## FA-02 - Periodo invalido

### Condicao

O periodo solicitado nao e suportado.

### Fluxo

* Sistema bloqueia a consulta.
* Sistema orienta ajuste.

---

# Pos-condicoes

* Indicadores consultados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor ve apenas os dados da sua equipe.
* Indicadores com dados pessoais seguem agregacao adequada.

---

# Entidades Envolvidas

## TeamIndicatorSnapshot

```text
id
manager_id
indicator_name
period
value
```

## AuditEvent

```text
id
actor_subject
tenant_id
action
resource_type
resource_id
created_at
```

---

# Casos Relacionados

* UC-BI-001 - Consultar Dashboard Executivo
* UC-BI-002 - Consultar Headcount
* UC-BI-003 - Consultar Turnover
* UC-BI-004 - Consultar Absenteismo


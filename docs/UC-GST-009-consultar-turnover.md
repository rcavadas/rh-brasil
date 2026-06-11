# UC-GST-009

## Consultar Turnover

### Objetivo

Permitir que o gestor consulte a rotatividade da equipe, com indicadores consolidados e trilha de auditoria.

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
* Indicador de turnover disponivel.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa turnover da equipe.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Turnover
```

### Etapa 2

Sistema apresenta os periodos disponiveis.

### Etapa 3

Gestor seleciona o periodo.

### Etapa 4

Sistema consolida entradas, saidas e rotatividade.

### Etapa 5

Sistema exibe o indicador e os recortes permitidos.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Periodo sem base

### Condicao

Nao ha dados suficientes.

### Fluxo

* Sistema informa indisponibilidade parcial.

---

# Pos-condicoes

* Turnover consultado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor consulta apenas a propria base.
* A apuracao deve respeitar agregacao por periodo.

---

# Entidades Envolvidas

## TurnoverSnapshot

```text
id
manager_id
period
admissions
departures
turnover_rate
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

* UC-BI-003 - Consultar Turnover
* UC-BI-001 - Consultar Dashboard Executivo


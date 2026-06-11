# UC-COL-007

## Consultar Banco de Horas

### Objetivo

Permitir que o colaborador consulte o saldo e o historico do banco de horas no portal, com visao consolidada e trilha de auditoria.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* API de jornada e ponto
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado.
* Tenant ativo validado.
* Banco de horas habilitado para o vinculo.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o colaborador acessa a area de banco de horas.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Banco de Horas
```

### Etapa 2

Sistema apresenta o saldo atual e os periodos consolidados.

### Etapa 3

Colaborador seleciona um periodo para detalhamento.

### Etapa 4

Sistema exibe creditos, debitos, ajustes e saldo acumulado.

### Etapa 5

Sistema mostra a origem das movimentacoes quando disponivel.

### Etapa 6

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Banco de horas indisponivel

### Condicao

O vinculo nao possui banco de horas habilitado.

### Fluxo

* Sistema informa indisponibilidade.
* Sistema exibe orientacao padrao do RH.

## FA-02 - Periodo sem movimentacao

### Condicao

Nao ha eventos consolidados para o periodo consultado.

### Fluxo

* Sistema exibe saldo zerado ou sem movimentacoes.

## FA-03 - Falha de consulta

### Condicao

A API de jornada e ponto nao responde.

### Fluxo

* Sistema informa indisponibilidade temporaria.
* Sistema registra a falha.

---

# Pos-condicoes

* Banco de horas consultado em modo leitura.
* Historico de acesso registrado.

---

# Regras de Negocio Relacionadas

* A consulta deve refletir a competencia e o periodo vigente.
* O colaborador pode ver apenas o proprio saldo.
* A trilha de auditoria e obrigatoria.

---

# Entidades Envolvidas

## TimeBankSummary

```text
id
employee_id
period
balance_minutes
status
```

## TimeBankEntry

```text
id
summary_id
event_type
minutes
origin
occurred_at
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

* UC-COL-001 - Acessar Portal do Colaborador
* UC-JOR-009 - Calcular Banco de Horas
* UC-JOR-019 - Consolidar Eventos de Ponto para Folha
* UC-SEC-010 - Auditar Acessos e Operacoes


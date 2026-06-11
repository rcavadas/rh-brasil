# UC-WFL-010

## Auditar Historico do Workflow

### Objetivo

Permitir a consulta do historico de eventos, decisoes e mudancas de estado de um workflow.

---

# Atores

## Primarios

* Auditor ou gestor autorizado

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Workflow existente.
* Usuario autenticado.
* Permissao de consulta de historico habilitada.

---

# Gatilho

O processo inicia quando o usuario abre a trilha historica do workflow.

---

# Fluxo Principal

### Etapa 1

Usuario acessa o historico.

### Etapa 2

Sistema lista eventos, mudancas e decisoes.

### Etapa 3

Usuario filtra por periodo, etapa ou ator.

### Etapa 4

Sistema apresenta a trilha consolidada.

### Etapa 5

Sistema registra a consulta quando exigido.

---

# Fluxos Alternativos

## FA-01 - Historico incompleto

### Condicao

A origem de algum evento nao esta disponivel.

### Fluxo

* Sistema exibe o historico parcial e sinaliza a lacuna.

---

# Pos-condicoes

* Historico consultado.
* Consulta registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* Historico deve ser imutavel.
* Consultas devem respeitar autorizacao e finalidade.

---

# Entidades Envolvidas

## WorkflowAuditEvent

```text
id
workflow_request_id
event_type
actor_subject
created_at
```

---

# Casos Relacionados

* UC-WFL-001 - Criar Fluxo de Aprovacao
* UC-WFL-007 - Escalonar Solicitacao

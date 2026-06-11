# UC-WFL-004

## Configurar SLA

### Objetivo

Permitir a configuracao de prazos de atendimento, escalonamento e limites por tipo de solicitacao.

---

# Atores

## Primarios

* Administrador de processo

## Secundarios

* Motor de workflow
* Auditoria

---

# Pre-condicoes

* Fluxo existente.
* Usuario autenticado.
* Permissao de configuracao habilitada.

---

# Gatilho

O processo inicia quando o usuario define um SLA para o fluxo.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o fluxo e a etapa.

### Etapa 2

Sistema apresenta os prazos possiveis.

### Etapa 3

Usuario informa limite, alerta e escalonamento.

### Etapa 4

Sistema valida consistencia temporal.

### Etapa 5

Sistema salva a politica de SLA.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - SLA inconsistente

### Condicao

O prazo configurado conflita com a regra do fluxo.

### Fluxo

* Sistema bloqueia a alteracao.

---

# Pos-condicoes

* SLA definido.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O prazo deve ser maior que zero.
* O escalonamento deve respeitar o contexto do fluxo.

---

# Entidades Envolvidas

## WorkflowSla

```text
id
workflow_definition_id
step_name
due_in_minutes
escalate_after_minutes
```

---

# Casos Relacionados

* UC-WFL-007 - Escalonar Solicitacao
* UC-WFL-010 - Auditar Historico do Workflow

# UC-WFL-008

## Delegar Aprovacao

### Objetivo

Permitir delegacao temporaria de aprovacao em casos de ausencia, com validade e auditoria.

---

# Atores

## Primarios

* Aprovador titular

## Secundarios

* Aprovador delegado
* Motor de workflow
* Auditoria

---

# Pre-condicoes

* Aprovador titular autenticado.
* Delegado elegivel.
* Fluxo permite delegacao.

---

# Gatilho

O processo inicia quando o aprovador define um delegado.

---

# Fluxo Principal

### Etapa 1

Aprovador titular seleciona um delegado.

### Etapa 2

Sistema valida o periodo de vigencia.

### Etapa 3

Sistema aplica a delegacao.

### Etapa 4

Solicitacoes passam a considerar o delegado quando cabivel.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Delegado inelegivel

### Condicao

O usuario indicado nao pode assumir a alçada.

### Fluxo

* Sistema bloqueia a delegacao.

---

# Pos-condicoes

* Delegacao ativa ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A delegacao deve ter vigencia.
* A delegacao nao pode quebrar segregacao de tenant.

---

# Entidades Envolvidas

## WorkflowDelegation

```text
id
approver_subject
delegate_subject
starts_at
ends_at
```

---

# Casos Relacionados

* UC-WFL-003 - Configurar Aprovadores
* UC-WFL-010 - Auditar Historico do Workflow

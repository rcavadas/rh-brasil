# UC-WFL-009

## Reabrir Processo

### Objetivo

Permitir a reabertura controlada de um processo de workflow ja encerrado, mediante permissao e motivo.

---

# Atores

## Primarios

* Gestor ou administrador

## Secundarios

* Motor de workflow
* Auditoria

---

# Pre-condicoes

* Processo encerrado.
* Usuario autenticado.
* Permissao de reabertura habilitada.

---

# Gatilho

O processo inicia quando o usuario solicita reabertura.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona um processo encerrado.

### Etapa 2

Sistema solicita motivo da reabertura.

### Etapa 3

Sistema valida permissao e elegibilidade.

### Etapa 4

Sistema reabre o processo.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Reabertura negada

### Condicao

O processo nao pode ser reaberto por regra.

### Fluxo

* Sistema bloqueia a operacao.

---

# Pos-condicoes

* Processo reaberto ou negado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A reabertura precisa de justificativa.
* O historico do processo deve ser preservado.

---

# Entidades Envolvidas

## WorkflowRequest

```text
id
status
reopened_by
reopen_reason
reopened_at
```

---

# Casos Relacionados

* UC-WFL-005 - Executar Aprovacao Sequencial
* UC-WFL-010 - Auditar Historico do Workflow

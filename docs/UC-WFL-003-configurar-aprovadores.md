# UC-WFL-003

## Configurar Aprovadores

### Objetivo

Permitir a definicao de aprovadores, alçadas e regras de substituicao para um fluxo.

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

O processo inicia quando o usuario configura aprovadores do fluxo.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona um fluxo.

### Etapa 2

Sistema apresenta as etapas que exigem aprovacao.

### Etapa 3

Usuario define aprovadores, grupos ou papéis.

### Etapa 4

Sistema valida duplicidade e conflito de alçada.

### Etapa 5

Sistema salva a configuracao.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Aprovador sem permissao

### Condicao

O aprovador indicado nao possui acesso ao contexto.

### Fluxo

* Sistema bloqueia a configuracao.

---

# Pos-condicoes

* Aprovadores configurados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Aprovadores devem respeitar segregacao por tenant e contexto.
* A alçada deve ser coerente com a etapa configurada.

---

# Entidades Envolvidas

## WorkflowApprover

```text
id
workflow_step_id
approver_subject
approver_role
threshold
```

---

# Casos Relacionados

* UC-WFL-002 - Configurar Etapas do Fluxo
* UC-WFL-008 - Delegar Aprovacao

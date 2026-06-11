# UC-PER-008

## Criar PDI

### Objetivo

Permitir a criação de um plano de desenvolvimento individual a partir da avaliacao.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Performance
* Auditoria

---

# Pre-condicoes

* Avaliacao disponivel.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando o PDI e criado.

---

# Fluxo Principal

### Etapa 1

Usuario define objetivos de desenvolvimento.

### Etapa 2

Sistema vincula o PDI a avaliacao.

### Etapa 3

Sistema grava as ações e prazos.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Objetivo inconsistente

### Condicao

O objetivo nao possui prazo ou responsavel.

### Fluxo

* Sistema bloqueia o salvamento.

---

# Pos-condicoes

* PDI criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O PDI deve ser rastreavel.
* Pode ter vinculo com competencias e treinamentos.

---

# Entidades Envolvidas

## DevelopmentPlan

```text
id
employee_id
review_id
goals
status
```

---

# Casos Relacionados

* UC-PER-007 - Registrar Feedback Continuo
* UC-LMS-008 - Vincular Curso a Competencia

# UC-PER-006

## Avaliar Metas

### Objetivo

Permitir a avaliacao de metas e resultados do colaborador no ciclo.

---

# Atores

## Primarios

* Avaliador

## Secundarios

* Performance
* Auditoria

---

# Pre-condicoes

* Ciclo ativo.
* Metas configuradas.

---

# Gatilho

O processo inicia quando as metas sao avaliadas.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta as metas.

### Etapa 2

Avaliador registra o resultado.

### Etapa 3

Sistema calcula a aderencia.

### Etapa 4

Sistema grava a avaliacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Meta sem criterio

### Condicao

A meta nao possui indicador associado.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* Metas avaliadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A meta deve ser mensuravel.
* O resultado precisa ser preservado no historico.

---

# Entidades Envolvidas

## GoalAssessment

```text
id
review_id
goal
score
status
```

---

# Casos Relacionados

* UC-PER-005 - Avaliar Competencias
* UC-PER-009 - Calibrar Resultados

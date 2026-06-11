# UC-PER-003

## Executar Avaliacao 180

### Objetivo

Permitir a avaliacao com visao ampliada, incluindo pares e lideranca quando aplicavel.

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
* Avaliado elegivel.

---

# Gatilho

O processo inicia quando a avaliacao 180 e iniciada.

---

# Fluxo Principal

### Etapa 1

Sistema abre a pauta de avaliacao.

### Etapa 2

Avaliador e eventuais coavaliadores registram inputs.

### Etapa 3

Sistema consolida os dados.

### Etapa 4

Sistema grava a avaliacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Coavaliador ausente

### Condicao

Nao ha resposta de um participante previsto.

### Fluxo

* Sistema sinaliza pendencia e segue conforme regra.

---

# Pos-condicoes

* Avaliacao consolidada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A avaliacao deve respeitar o modelo configurado.
* As participacoes precisam ser rastreaveis.

---

# Entidades Envolvidas

## PerformanceReview

```text
id
cycle_id
employee_id
model
score
status
```

---

# Casos Relacionados

* UC-PER-004 - Executar Avaliacao 360
* UC-PER-009 - Calibrar Resultados

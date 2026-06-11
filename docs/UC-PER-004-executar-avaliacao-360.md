# UC-PER-004

## Executar Avaliacao 360

### Objetivo

Permitir a avaliacao multivisao com feedback de lideranca, pares e autoavaliacao.

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
* Modelo 360 configurado.

---

# Gatilho

O processo inicia quando a avaliacao 360 e aberta.

---

# Fluxo Principal

### Etapa 1

Sistema distribui formulários aos participantes.

### Etapa 2

Participantes registram as respostas.

### Etapa 3

Sistema consolida os resultados.

### Etapa 4

Sistema grava a avaliacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Participacao parcial

### Condicao

Nem todos os participantes responderam.

### Fluxo

* Sistema mantém a avaliacao em aberto.

---

# Pos-condicoes

* Avaliacao registrada ou pendente.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A avaliacao 360 depende de multipla participacao.
* O resultado deve preservar origem dos inputs.

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

* UC-PER-005 - Avaliar Competencias
* UC-PER-006 - Avaliar Metas

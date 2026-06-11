# UC-PER-002

## Executar Avaliacao 90

### Objetivo

Permitir a avaliacao direta com base no modelo de 90 graus.

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

O processo inicia quando a avaliacao 90 e executada.

---

# Fluxo Principal

### Etapa 1

Avaliador abre a ficha.

### Etapa 2

Sistema apresenta os criterios.

### Etapa 3

Avaliador registra notas e comentarios.

### Etapa 4

Sistema grava a avaliacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Formulario incompleto

### Condicao

Algum criterio nao foi preenchido.

### Fluxo

* Sistema bloqueia o envio final.

---

# Pos-condicoes

* Avaliacao registrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A avaliacao deve ficar vinculada ao ciclo.
* As observacoes podem exigir controle de acesso.

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

* UC-PER-003 - Executar Avaliacao 180
* UC-PER-007 - Registrar Feedback Continuo

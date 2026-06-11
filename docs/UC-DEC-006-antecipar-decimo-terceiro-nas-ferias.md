# UC-DEC-006

## Antecipar Decimo Terceiro nas Ferias

### Objetivo

Permitir a antecipacao do 13o nas ferias quando aplicavel.

---

# Atores

## Primarios

* Gestor de folha

## Secundarios

* Motor de 13o
* Auditoria

---

# Pre-condicoes

* Ferias programadas ou em andamento.

---

# Gatilho

O processo inicia quando a antecipacao e solicitada.

---

# Fluxo Principal

### Etapa 1

Sistema verifica a elegibilidade.

### Etapa 2

Sistema calcula o adiantamento.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Antecipacao nao permitida

### Condicao

A politica nao autoriza o adiantamento.

### Fluxo

* Sistema bloqueia a operacao.

---

# Pos-condicoes

* Antecipacao calculada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A antecipacao precisa seguir politica e competencia.
* O historico deve ser preservado.

---

# Entidades Envolvidas

## ThirteenthSalaryAdvance

```text
id
employee_id
amount
status
calculated_at
```

---

# Casos Relacionados

* UC-FER-010 - Integrar Ferias com Folha
* UC-DEC-002 - Calcular Primeira Parcela

# UC-FER-007

## Calcular Abono Pecuniario

### Objetivo

Permitir a conversao parcial de ferias em abono pecuniario com rastreabilidade.

---

# Atores

## Primarios

* Motor de ferias

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Ferias aprovadas.
* Politica de abono habilitada.

---

# Gatilho

O processo inicia quando o abono e calculado.

---

# Fluxo Principal

### Etapa 1

Sistema verifica elegibilidade.

### Etapa 2

Sistema apura a conversao permitida.

### Etapa 3

Sistema calcula o valor do abono.

### Etapa 4

Sistema grava a memoria de calculo.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Abono indisponivel

### Condicao

A politica nao permite conversao.

### Fluxo

* Sistema bloqueia o calculo.

---

# Pos-condicoes

* Abono calculado ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O abono depende de politica e elegibilidade.
* O calculo deve ser rastreavel.

---

# Entidades Envolvidas

## VacationAbono

```text
id
vacation_request_id
amount
status
calculated_at
```

---

# Casos Relacionados

* UC-FER-006 - Calcular Ferias
* UC-FER-010 - Integrar Ferias com Folha

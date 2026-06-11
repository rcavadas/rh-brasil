# UC-DEC-002

## Calcular Primeira Parcela

### Objetivo

Permitir o calculo da primeira parcela do 13o salario.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Avos apurados.

---

# Gatilho

O processo inicia quando a primeira parcela e calculada.

---

# Fluxo Principal

### Etapa 1

Sistema identifica a base.

### Etapa 2

Sistema calcula a parcela.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base insuficiente

### Condicao

A base nao e valida.

### Fluxo

* Sistema bloqueia o calculo.

---

# Pos-condicoes

* Primeira parcela calculada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A parcela precisa respeitar a competencia.
* O calculo deve ser rastreavel.

---

# Entidades Envolvidas

## ThirteenthSalaryInstallment

```text
id
employee_id
installment_number
amount
calculated_at
```

---

# Casos Relacionados

* UC-DEC-001 - Apurar Avos de Decimo Terceiro
* UC-DEC-003 - Calcular Segunda Parcela

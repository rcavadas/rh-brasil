# UC-DEC-003

## Calcular Segunda Parcela

### Objetivo

Permitir o calculo da segunda parcela do 13o salario.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Primeira parcela calculada ou avos apurados.

---

# Gatilho

O processo inicia quando a segunda parcela e calculada.

---

# Fluxo Principal

### Etapa 1

Sistema identifica a base liquida.

### Etapa 2

Sistema calcula a parcela restante.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base conflitante

### Condicao

A memoria nao bate com a folha.

### Fluxo

* Sistema sinaliza a divergencia.

---

# Pos-condicoes

* Segunda parcela calculada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo precisa preservar o historico.
* A deducao de adiantamento deve ser rastreavel.

---

# Entidades Envolvidas

## ThirteenthSalarySettlement

```text
id
employee_id
gross_amount
net_amount
calculated_at
```

---

# Casos Relacionados

* UC-DEC-002 - Calcular Primeira Parcela
* UC-DEC-005 - Calcular Encargos de Decimo Terceiro

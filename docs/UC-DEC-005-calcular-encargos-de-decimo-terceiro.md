# UC-DEC-005

## Calcular Encargos de Decimo Terceiro

### Objetivo

Permitir o calculo de encargos de INSS, FGTS e correlatos sobre o 13o salario.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Base do 13o calculada.

---

# Gatilho

O processo inicia quando os encargos sao calculados.

---

# Fluxo Principal

### Etapa 1

Sistema identifica a base tributavel.

### Etapa 2

Sistema aplica as alíquotas.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Regra invalida

### Condicao

Uma alíquota nao esta configurada.

### Fluxo

* Sistema bloqueia o calculo.

---

# Pos-condicoes

* Encargos calculados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo depende de regras vigentes.
* A memoria precisa permanecer acessivel.

---

# Entidades Envolvidas

## ThirteenthSalaryCharge

```text
id
employee_id
charge_type
amount
calculated_at
```

---

# Casos Relacionados

* UC-DEC-004 - Calcular Medias de Verbas Variaveis
* UC-DEC-010 - Integrar Decimo Terceiro ao eSocial

# UC-DEC-001

## Apurar Avos de Decimo Terceiro

### Objetivo

Permitir a apuracao dos avos e da elegibilidade do decimo terceiro salario.

---

# Atores

## Primarios

* Gestor de folha

## Secundarios

* Motor de 13o
* Auditoria

---

# Pre-condicoes

* Colaborador ativo ou elegivel.
* Historico de competencias disponivel.

---

# Gatilho

O processo inicia quando os avos de 13o sao apurados.

---

# Fluxo Principal

### Etapa 1

Sistema identifica as competencias elegiveis.

### Etapa 2

Sistema calcula os avos.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base incompleta

### Condicao

Nao ha historico suficiente.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* Avos apurados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A apuracao precisa ser por competencia.
* O historico deve ser rastreavel.

---

# Entidades Envolvidas

## ThirteenthSalaryAccrual

```text
id
employee_id
months
status
calculated_at
```

---

# Casos Relacionados

* UC-DEC-002 - Calcular Primeira Parcela
* UC-DEC-004 - Calcular Medias de Verbas Variaveis

# UC-DEC-007

## Calcular Decimo Terceiro Rescisorio

### Objetivo

Permitir o calculo do 13o proporcional devido na rescisao.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* Rescisao
* Auditoria

---

# Pre-condicoes

* Desligamento registrado.

---

# Gatilho

O processo inicia quando o 13o rescisorio e calculado.

---

# Fluxo Principal

### Etapa 1

Sistema apura os avos proporcionais.

### Etapa 2

Sistema calcula a verba.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base insuficiente

### Condicao

Nao ha historico suficiente.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* 13o rescisorio calculado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo deve respeitar o desligamento.
* A memoria precisa ser rastreavel.

---

# Entidades Envolvidas

## ThirteenthSalaryTermination

```text
id
termination_request_id
months
amount
calculated_at
```

---

# Casos Relacionados

* UC-RES-006 - Calcular Decimo Terceiro Proporcional
* UC-DEC-010 - Integrar Decimo Terceiro ao eSocial

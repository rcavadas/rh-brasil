# UC-RES-006

## Calcular Decimo Terceiro Proporcional

### Objetivo

Permitir o calculo do 13o proporcional na rescisao.

---

# Atores

## Primarios

* Motor de rescisao

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Desligamento registrado.
* Competencias disponiveis.

---

# Gatilho

O processo inicia quando o 13o proporcional e calculado.

---

# Fluxo Principal

### Etapa 1

Sistema apura os avos devidos.

### Etapa 2

Sistema aplica medias e adicionais.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Avo invalido

### Condicao

Nao ha base suficiente para o avo.

### Fluxo

* Sistema sinaliza a divergencia.

---

# Pos-condicoes

* 13o proporcional calculado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo deve respeitar a competencia de desligamento.
* O historico deve ser preservado.

---

# Entidades Envolvidas

## RescissionThirteenthSalary

```text
id
termination_request_id
months
amount
calculated_at
```

---

# Casos Relacionados

* UC-FOL-008 - Calcular IRRF
* UC-RES-007 - Calcular FGTS Rescisorio

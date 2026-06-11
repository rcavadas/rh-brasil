# UC-RES-003

## Calcular Aviso Previo

### Objetivo

Permitir o calculo do aviso previo trabalhado ou indenizado.

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
* Motivo definido.

---

# Gatilho

O processo inicia quando o aviso previo e calculado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica o tipo de aviso.

### Etapa 2

Sistema calcula o periodo ou a indenizacao.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Aviso dispensado

### Condicao

A politica nao exige aviso previo.

### Fluxo

* Sistema sinaliza a dispensa.

---

# Pos-condicoes

* Aviso calculado ou dispensado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo deve respeitar a politica legal aplicavel.
* A memoria precisa ser preservada.

---

# Entidades Envolvidas

## RescissionNotice

```text
id
termination_request_id
type
days
amount
```

---

# Casos Relacionados

* UC-RES-004 - Calcular Saldo de Salario
* UC-RES-009 - Fechar Rescisao

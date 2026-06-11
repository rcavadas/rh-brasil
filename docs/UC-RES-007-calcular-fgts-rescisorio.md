# UC-RES-007

## Calcular FGTS Rescisorio

### Objetivo

Permitir o calculo do FGTS rescisorio e multa quando aplicavel.

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
* Base fundiaria disponivel.

---

# Gatilho

O processo inicia quando o FGTS rescisorio e calculado.

---

# Fluxo Principal

### Etapa 1

Sistema apura a base fundiaria.

### Etapa 2

Sistema calcula multa e reflexos.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base fundiaria ausente

### Condicao

Nao ha dados suficientes para o calculo.

### Fluxo

* Sistema bloqueia a conclusao.

---

# Pos-condicoes

* FGTS rescisorio calculado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo deve respeitar a regra fundiaria vigente.
* A memoria precisa ser auditavel.

---

# Entidades Envolvidas

## RescissionFgt

```text
id
termination_request_id
base_amount
penalty_amount
calculated_at
```

---

# Casos Relacionados

* UC-RES-006 - Calcular Decimo Terceiro Proporcional
* UC-RES-008 - Gerar Documentos Rescisorios

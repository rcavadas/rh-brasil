# UC-FER-006

## Calcular Ferias

### Objetivo

Permitir o calculo de ferias, medias e verbas correlatas por competencia.

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
* Dados de remuneracao disponiveis.

---

# Gatilho

O processo inicia quando o calculo de ferias e executado.

---

# Fluxo Principal

### Etapa 1

Sistema recupera a base de calculo.

### Etapa 2

Sistema apura medias e adicionais.

### Etapa 3

Sistema calcula verbas de ferias.

### Etapa 4

Sistema grava a memoria de calculo.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base inconsistente

### Condicao

A base de remuneracao nao esta valida.

### Fluxo

* Sistema sinaliza a inconsistência.

---

# Pos-condicoes

* Calculo de ferias registrado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O calculo deve ser rastreavel por competencia.
* Medias e descontos dependem da politica do periodo.

---

# Entidades Envolvidas

## VacationCalculation

```text
id
vacation_request_id
gross_amount
net_amount
calculated_at
```

---

# Casos Relacionados

* UC-FER-007 - Calcular Abono Pecuniario
* UC-FER-010 - Integrar Ferias com Folha

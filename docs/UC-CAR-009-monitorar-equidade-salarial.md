# UC-CAR-009

## Monitorar Equidade Salarial

### Objetivo

Permitir a analise de equidade salarial por recorte organizacional.

---

# Atores

## Primarios

* Gestor de remuneracao

## Secundarios

* Analytics
* Auditoria

---

# Pre-condicoes

* Dados salariais disponiveis.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando a equidade e monitorada.

---

# Fluxo Principal

### Etapa 1

Sistema coleta dados de cargo e salario.

### Etapa 2

Sistema calcula comparativos.

### Etapa 3

Sistema apresenta desvios e sinais.

### Etapa 4

Sistema registra auditoria quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Base insuficiente

### Condicao

Nao ha dados suficientes para comparar.

### Fluxo

* Sistema sinaliza a limitacao.

---

# Pos-condicoes

* Equidade monitorada.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A analise deve respeitar LGPD.
* O recorte nao pode expor dados individuais sem necessidade.

---

# Entidades Envolvidas

## SalaryEquitySnapshot

```text
id
tenant_id
scope
metric
value
```

---

# Casos Relacionados

* UC-CAR-004 - Cadastrar Faixa Salarial
* UC-BI-005 - Consultar Custos de Pessoal

# UC-SST-009

## Controlar Entrega de EPI

### Objetivo

Permitir o controle de entrega, ciencia e devolucao de EPI.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Auditoria

---

# Pre-condicoes

* EPI catalogado.
* Colaborador elegivel.

---

# Gatilho

O processo inicia quando o EPI e entregue.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o colaborador e o equipamento.

### Etapa 2

Sistema registra a entrega.

### Etapa 3

Colaborador confirma a ciencia.

### Etapa 4

Sistema controla validade e devolucao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - EPI indisponivel

### Condicao

O equipamento nao esta em estoque.

### Fluxo

* Sistema sinaliza a indisponibilidade.

---

# Pos-condicoes

* EPI controlado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O controle deve manter rastreabilidade por entrega.
* A ciencia do colaborador e obrigatoria quando aplicavel.

---

# Entidades Envolvidas

## PersonalProtectiveEquipment

```text
id
tenant_id
name
status
stock_status
```

---

# Casos Relacionados

* UC-SST-008 - Registrar CAT
* UC-SST-010 - Controlar Treinamentos Obrigatorios de SST

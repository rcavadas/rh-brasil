# UC-ESO-009

## Transmitir Evento S-1299

### Objetivo

Permitir o fechamento do periodo no eSocial.

---

# Atores

## Primarios

* Motor de eSocial

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Eventos periodicos enviados.

---

# Gatilho

O processo inicia quando o S-1299 e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema valida pendencias.

### Etapa 2

Sistema envia o fechamento.

### Etapa 3

Sistema grava o protocolo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Pendencia aberta

### Condicao

Ainda ha evento periodico pendente.

### Fluxo

* Sistema bloqueia o fechamento.

---

# Pos-condicoes

* Periodo fechado ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O fechamento depende da conciliacao de pendencias.
* O historico deve ser mantido.

---

# Entidades Envolvidas

## EsocialClosing

```text
id
tenant_id
status
protocol
closed_at
```

---

# Casos Relacionados

* UC-ESO-010 - Conciliar Totalizadores do eSocial
* UC-RES-010 - Transmitir Desligamento ao eSocial

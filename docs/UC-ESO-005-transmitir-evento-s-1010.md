# UC-ESO-005

## Transmitir Evento S-1010

### Objetivo

Permitir a transmissao da tabela de rubricas.

---

# Atores

## Primarios

* Motor de eSocial

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Tabelas iniciais disponiveis.

---

# Gatilho

O processo inicia quando o S-1010 e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema monta a tabela de rubricas.

### Etapa 2

Sistema envia o evento.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Rubrica inconsistente

### Condicao

A tabela local nao e compativel.

### Fluxo

* Sistema sinaliza divergencia.

---

# Pos-condicoes

* Evento transmitido ou sinalizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A transmissao precisa respeitar a base da folha.
* A tabela deve ser versionada.

---

# Entidades Envolvidas

## EsocialEvent

```text
id
event_type
status
protocol
sent_at
```

---

# Casos Relacionados

* UC-ESO-004 - Transmitir Evento S-1005
* UC-ESO-007 - Transmitir Evento S-1200

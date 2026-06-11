# UC-ESO-004

## Transmitir Evento S-1005

### Objetivo

Permitir a transmissao da tabela de estabelecimentos e lotacoes.

---

# Atores

## Primarios

* Motor de eSocial

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Ambiente configurado.
* S-1000 transmitido ou elegivel.

---

# Gatilho

O processo inicia quando o S-1005 e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema monta a tabela.

### Etapa 2

Sistema envia o evento.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dependencia ausente

### Condicao

O ambiente inicial nao foi aceito.

### Fluxo

* Sistema bloqueia o envio.

---

# Pos-condicoes

* Evento transmitido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O evento depende da configuracao inicial.
* A ordem deve ser preservada.

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

* UC-ESO-003 - Transmitir Evento S-1000
* UC-ESO-005 - Transmitir Evento S-1010

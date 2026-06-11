# UC-DEC-010

## Integrar Decimo Terceiro ao eSocial

### Objetivo

Permitir a integracao do decimo terceiro ao eSocial com rastreabilidade.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* 13o calculado ou fechado.

---

# Gatilho

O processo inicia quando o 13o e integrado ao eSocial.

---

# Fluxo Principal

### Etapa 1

Sistema monta os eventos necessarios.

### Etapa 2

Sistema envia ao eSocial.

### Etapa 3

Sistema grava o protocolo ou pendencia.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Rejeicao do evento

### Condicao

O eSocial rejeita a transmissao.

### Fluxo

* Sistema sinaliza a divergencia.

---

# Pos-condicoes

* Integracao realizada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A transmissao deve ser rastreavel.
* O reprocessamento precisa ser possivel.

---

# Entidades Envolvidas

## ThirteenthSalaryIntegration

```text
id
tenant_id
status
protocol
sent_at
```

---

# Casos Relacionados

* UC-ESO-007 - Transmitir Evento S-1200
* UC-ESO-009 - Transmitir Evento S-1299

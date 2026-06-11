# UC-ESO-008

## Transmitir Evento S-1210

### Objetivo

Permitir a transmissao de pagamentos e rendimentos ao eSocial.

---

# Atores

## Primarios

* Motor de eSocial

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Pagamentos disponiveis.

---

# Gatilho

O processo inicia quando o S-1210 e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema monta os pagamentos.

### Etapa 2

Sistema envia o evento.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Pagamento incompleto

### Condicao

Nao ha dados suficientes para o envio.

### Fluxo

* Sistema bloqueia a transmissao.

---

# Pos-condicoes

* Evento transmitido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O pagamento deve ser consistente com a folha.
* O protocolo precisa ser preservado.

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

* UC-FOL-009 - Gerar Holerite
* UC-ESO-007 - Transmitir Evento S-1200

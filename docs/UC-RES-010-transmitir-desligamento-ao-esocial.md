# UC-RES-010

## Transmitir Desligamento ao eSocial

### Objetivo

Permitir a transmissao do desligamento ao eSocial com trilha auditavel e reprocessamento.

---

# Atores

## Primarios

* Motor de rescisao

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Rescisao fechada ou elegivel para transmissao.
* Certificado e configuracao disponiveis.

---

# Gatilho

O processo inicia quando o desligamento e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema prepara o evento de desligamento.

### Etapa 2

Sistema envia ao eSocial.

### Etapa 3

Sistema grava o protocolo ou pendencia.

### Etapa 4

Sistema permite reprocessamento quando aplicavel.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Transmissao falha

### Condicao

O governo nao responde ou rejeita o evento.

### Fluxo

* Sistema sinaliza erro e mantém o historico.

---

# Pos-condicoes

* Transmissao registrada ou falha sinalizada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A transmissao deve respeitar o estado da rescisao.
* O reprocessamento precisa ser rastreavel.

---

# Entidades Envolvidas

## RescissionTransmission

```text
id
termination_request_id
status
protocol
sent_at
```

---

# Casos Relacionados

* UC-ESO-009 - Transmitir Evento S-1299
* UC-RES-009 - Fechar Rescisao

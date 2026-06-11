# UC-API-003

## Configurar Webhook

### Objetivo

Permitir a configuracao de webhooks para notificacao de eventos externos.

---

# Atores

## Primarios

* Administrador de integracoes

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Integracao cadastrada.

---

# Gatilho

O processo inicia quando o webhook e configurado.

---

# Fluxo Principal

### Etapa 1

Usuario informa URL e assinatura.

### Etapa 2

Sistema valida o endpoint.

### Etapa 3

Sistema grava a configuracao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Endpoint invalido

### Condicao

O destino nao responde.

### Fluxo

* Sistema bloqueia a ativacao.

---

# Pos-condicoes

* Webhook configurado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O webhook precisa ser idempotente.
* Segredos devem permanecer protegidos.

---

# Entidades Envolvidas

## WebhookConfig

```text
id
integration_id
target_url
secret_status
status
```

---

# Casos Relacionados

* UC-API-002 - Configurar API REST
* UC-API-004 - Publicar Evento

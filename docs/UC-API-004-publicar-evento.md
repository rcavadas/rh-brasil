# UC-API-004

## Publicar Evento

### Objetivo

Permitir a publicacao de eventos para consumidores externos.

---

# Atores

## Primarios

* Sistema produtor

## Secundarios

* Webhook
* Auditoria

---

# Pre-condicoes

* Integracao configurada.
* Evento elegivel.

---

# Gatilho

O processo inicia quando o evento e publicado.

---

# Fluxo Principal

### Etapa 1

Sistema prepara a mensagem.

### Etapa 2

Sistema envia para os consumidores.

### Etapa 3

Sistema grava o estado da publicacao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Falha de entrega

### Condicao

O consumidor nao responde.

### Fluxo

* Sistema sinaliza a falha e preserva o historico.

---

# Pos-condicoes

* Evento publicado ou sinalizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A publicacao deve ser auditavel.
* O payload precisa ser protegido.

---

# Entidades Envolvidas

## EventPublication

```text
id
integration_id
event_type
status
published_at
```

---

# Casos Relacionados

* UC-API-003 - Configurar Webhook
* UC-API-005 - Consumir Evento

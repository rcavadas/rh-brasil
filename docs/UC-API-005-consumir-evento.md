# UC-API-005

## Consumir Evento

### Objetivo

Permitir a recepcao e processamento de eventos externos.

---

# Atores

## Primarios

* Integracao consumidora

## Secundarios

* Motor de integracoes
* Auditoria

---

# Pre-condicoes

* Evento publicado ou recebido.

---

# Gatilho

O processo inicia quando o evento e consumido.

---

# Fluxo Principal

### Etapa 1

Sistema recebe o evento.

### Etapa 2

Sistema valida assinatura e schema.

### Etapa 3

Sistema processa a mensagem.

### Etapa 4

Sistema grava o resultado.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Evento invalido

### Condicao

O payload nao e valido.

### Fluxo

* Sistema rejeita o consumo.

---

# Pos-condicoes

* Evento consumido ou rejeitado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O consumo precisa ser idempotente.
* A origem do evento deve ser preservada.

---

# Entidades Envolvidas

## EventConsumption

```text
id
integration_id
event_type
status
consumed_at
```

---

# Casos Relacionados

* UC-API-004 - Publicar Evento
* UC-API-010 - Monitorar Integracoes

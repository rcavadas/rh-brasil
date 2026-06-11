# UC-API-006

## Integrar com ERP

### Objetivo

Permitir a integracao com ERP para sincronizacao de dados e eventos.

---

# Atores

## Primarios

* Motor de integracoes

## Secundarios

* ERP externo
* Auditoria

---

# Pre-condicoes

* Contrato de integracao configurado.

---

# Gatilho

O processo inicia quando a integracao com ERP e executada.

---

# Fluxo Principal

### Etapa 1

Sistema monta o payload.

### Etapa 2

Sistema envia ao ERP.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - ERP indisponivel

### Condicao

O destino nao responde.

### Fluxo

* Sistema sinaliza a falha e preserva o historico.

---

# Pos-condicoes

* Integracao executada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A integracao precisa ser conciliavel.
* O contrato tecnico deve ser preservado.

---

# Entidades Envolvidas

## ExternalIntegrationRequest

```text
id
integration_id
target_type
status
executed_at
```

---

# Casos Relacionados

* UC-API-004 - Publicar Evento
* UC-API-010 - Monitorar Integracoes

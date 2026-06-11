# UC-API-002

## Configurar API REST

### Objetivo

Permitir a configuracao de contrato REST, autenticacao e escopo por integracao.

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

O processo inicia quando a API REST e configurada.

---

# Fluxo Principal

### Etapa 1

Usuario informa base URL e autenticacao.

### Etapa 2

Sistema valida o contrato.

### Etapa 3

Sistema grava a configuracao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Contrato invalido

### Condicao

O contrato nao e consistente.

### Fluxo

* Sistema bloqueia a configuracao.

---

# Pos-condicoes

* API REST configurada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O contrato deve ser idempotente e versionado.
* Segredos nao podem ser expostos.

---

# Entidades Envolvidas

## RestApiConfig

```text
id
integration_id
base_url
auth_type
status
```

---

# Casos Relacionados

* UC-API-001 - Cadastrar Integracao
* UC-API-003 - Configurar Webhook

# UC-API-009

## Integrar com Provedor de Identidade

### Objetivo

Permitir a integracao com provedor de identidade para autenticacao e provisionamento.

---

# Atores

## Primarios

* Motor de integracoes

## Secundarios

* IdP externo
* Auditoria

---

# Pre-condicoes

* Contrato de integracao configurado.

---

# Gatilho

O processo inicia quando a integracao com IdP e executada.

---

# Fluxo Principal

### Etapa 1

Sistema monta o payload.

### Etapa 2

Sistema envia ao IdP.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - IdP indisponivel

### Condicao

O provedor nao responde.

### Fluxo

* Sistema sinaliza a falha e preserva o historico.

---

# Pos-condicoes

* Integracao executada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A alteracao do contrato afeta autenticacao e acessos.
* O uso precisa ser rastreavel.

---

# Entidades Envolvidas

## IdentityProviderIntegration

```text
id
integration_id
status
executed_at
```

---

# Casos Relacionados

* UC-SEC-004 - Configurar SSO
* UC-API-010 - Monitorar Integracoes

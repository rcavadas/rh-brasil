# UC-API-008

## Integrar com Operadora de Beneficios

### Objetivo

Permitir a integracao com operadora de beneficios para concessao e conciliacao.

---

# Atores

## Primarios

* Motor de integracoes

## Secundarios

* Operadora externa
* Auditoria

---

# Pre-condicoes

* Contrato de integracao configurado.

---

# Gatilho

O processo inicia quando a integracao com a operadora e executada.

---

# Fluxo Principal

### Etapa 1

Sistema monta o payload.

### Etapa 2

Sistema envia a operadora.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Operadora indisponivel

### Condicao

A operadora nao responde.

### Fluxo

* Sistema sinaliza a falha e preserva o historico.

---

# Pos-condicoes

* Integracao executada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A conciliacao precisa ser rastreavel.
* Dados sensiveis devem ser protegidos.

---

# Entidades Envolvidas

## BenefitProviderIntegration

```text
id
integration_id
status
executed_at
```

---

# Casos Relacionados

* UC-API-007 - Integrar com Banco
* UC-API-010 - Monitorar Integracoes

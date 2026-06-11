# UC-API-001

## Cadastrar Integracao

### Objetivo

Permitir o cadastro de uma integracao externa com finalidade, escopo e protocolo de auditabilidade.

---

# Atores

## Primarios

* Administrador de integracoes

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de integracoes habilitada.

---

# Gatilho

O processo inicia quando uma integracao e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome, finalidade e destino.

### Etapa 2

Sistema valida duplicidade.

### Etapa 3

Sistema grava o cadastro.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Integracao duplicada

### Condicao

Ja existe integracao equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Integracao criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A integracao pertence ao tenant.
* A finalidade precisa ser declarada.

---

# Entidades Envolvidas

## IntegrationDefinition

```text
id
tenant_id
name
purpose
status
```

---

# Casos Relacionados

* UC-API-002 - Configurar API REST
* UC-API-010 - Monitorar Integracoes

# UC-CAR-001

## Cadastrar Estrutura Organizacional

### Objetivo

Permitir o cadastro da estrutura organizacional com niveis, relacoes e unidades.

---

# Atores

## Primarios

* Gestor de estrutura

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de gestao estrutural habilitada.

---

# Gatilho

O processo inicia quando a estrutura organizacional e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa niveis e relacoes.

### Etapa 2

Sistema valida hierarquia.

### Etapa 3

Sistema grava a estrutura.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Estrutura inconsistente

### Condicao

A hierarquia nao e valida.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Estrutura criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A estrutura pertence ao tenant.
* Relacoes precisam ser consistentes.

---

# Entidades Envolvidas

## OrganizationStructure

```text
id
tenant_id
name
level
status
```

---

# Casos Relacionados

* UC-CAR-002 - Cadastrar Cargo
* UC-CAR-010 - Gerenciar Sucessao

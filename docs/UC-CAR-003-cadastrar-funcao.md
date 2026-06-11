# UC-CAR-003

## Cadastrar Funcao

### Objetivo

Permitir o cadastro de funcoes relacionadas a cargos e atribuicoes.

---

# Atores

## Primarios

* Gestor de estrutura

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Cargo existente.
* Permissao de gestao habilitada.

---

# Gatilho

O processo inicia quando uma funcao e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome e escopo.

### Etapa 2

Sistema valida duplicidade.

### Etapa 3

Sistema grava a funcao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Funcao duplicada

### Condicao

Ja existe funcao equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Funcao criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A funcao complementa o cargo.
* O cadastro precisa ser rastreavel.

---

# Entidades Envolvidas

## JobFunction

```text
id
tenant_id
name
scope
status
```

---

# Casos Relacionados

* UC-CAR-002 - Cadastrar Cargo
* UC-CAR-006 - Registrar Promocao

# UC-CAR-002

## Cadastrar Cargo

### Objetivo

Permitir o cadastro de cargos com descricao, nivel e referencia de carreira.

---

# Atores

## Primarios

* Gestor de estrutura

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Estrutura organizacional cadastrada.
* Permissao de gestao de cargos habilitada.

---

# Gatilho

O processo inicia quando um cargo e cadastrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome e descricao do cargo.

### Etapa 2

Sistema valida duplicidade.

### Etapa 3

Sistema grava o cargo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Cargo duplicado

### Condicao

Ja existe cargo equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Cargo criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O cargo deve ser reutilizavel por unidade ou empresa.
* A definicao precisa ser rastreavel.

---

# Entidades Envolvidas

## Position

```text
id
tenant_id
name
description
status
```

---

# Casos Relacionados

* UC-CAR-003 - Cadastrar Funcao
* UC-CAR-004 - Cadastrar Faixa Salarial

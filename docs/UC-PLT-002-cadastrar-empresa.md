# UC-PLT-002

## Cadastrar Empresa

### Objetivo

Permitir o cadastro de empresa vinculada ao tenant.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Tenant cadastrado.

---

# Gatilho

O processo inicia quando a empresa e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa dados da empresa.

### Etapa 2

Sistema valida integridade.

### Etapa 3

Sistema grava a empresa.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Empresa duplicada

### Condicao

Ja existe empresa equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Empresa criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A empresa pertence a um tenant.
* O cadastro precisa ser rastreavel.

---

# Entidades Envolvidas

## Company

```text
id
tenant_id
name
status
created_at
```

---

# Casos Relacionados

* UC-PLT-001 - Cadastrar Tenant
* UC-PLT-003 - Cadastrar Filial

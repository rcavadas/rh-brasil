# UC-PLT-003

## Cadastrar Filial

### Objetivo

Permitir o cadastro de filial vinculada a empresa e tenant.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Empresa cadastrada.

---

# Gatilho

O processo inicia quando a filial e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa dados da filial.

### Etapa 2

Sistema valida duplicidade e relacao.

### Etapa 3

Sistema grava a filial.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Filial duplicada

### Condicao

Ja existe filial equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Filial criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A filial deve pertencer a uma empresa.
* O cadastro precisa ser rastreavel.

---

# Entidades Envolvidas

## Branch

```text
id
company_id
name
status
created_at
```

---

# Casos Relacionados

* UC-PLT-002 - Cadastrar Empresa
* UC-PLT-004 - Configurar Isolamento de Dados

# UC-BEN-001

## Cadastrar Beneficio

### Objetivo

Permitir o cadastro do catalogo de beneficios corporativos por tenant.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de gestao de beneficios habilitada.

---

# Gatilho

O processo inicia quando um beneficio e cadastrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome, tipo e finalidade.

### Etapa 2

Sistema valida duplicidade e escopo.

### Etapa 3

Sistema salva o catalogo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Beneficio duplicado

### Condicao

Ja existe beneficio equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Beneficio criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O beneficio pertence ao tenant.
* A finalidade precisa ser declarada.

---

# Entidades Envolvidas

## BenefitCatalog

```text
id
tenant_id
name
purpose
status
```

---

# Casos Relacionados

* UC-BEN-002 - Configurar Elegibilidade de Beneficio
* UC-BEN-003 - Conceder Beneficio ao Colaborador

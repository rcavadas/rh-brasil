# UC-SEC-001

## Gerenciar Perfis de Acesso

### Objetivo

Permitir o cadastro e manutenção de perfis de acesso por tenant.

---

# Atores

## Primarios

* Administrador de seguranca

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao administrativa habilitada.

---

# Gatilho

O processo inicia quando um perfil de acesso e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome e escopo do perfil.

### Etapa 2

Sistema valida duplicidade.

### Etapa 3

Sistema grava o perfil.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Perfil duplicado

### Condicao

Ja existe perfil equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Perfil criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Perfis devem ser versionados por tenant.
* A alteracao precisa ser rastreavel.

---

# Entidades Envolvidas

## AccessRole

```text
id
tenant_id
name
status
created_at
```

---

# Casos Relacionados

* UC-SEC-002 - Gerenciar Permissoes
* UC-SEC-010 - Auditar Acessos e Operacoes

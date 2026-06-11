# UC-PLT-001

## Cadastrar Tenant

### Objetivo

Permitir o cadastro de um tenant como fronteira primária da plataforma SaaS.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Permissao de plataforma habilitada.

---

# Gatilho

O processo inicia quando um tenant e cadastrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome e identificador.

### Etapa 2

Sistema valida duplicidade.

### Etapa 3

Sistema grava o tenant.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Tenant duplicado

### Condicao

Ja existe tenant equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Tenant criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O tenant e a fronteira principal de dados.
* O cadastro precisa ser rastreavel.

---

# Entidades Envolvidas

## Tenant

```text
id
name
status
created_at
```

---

# Casos Relacionados

* UC-PLT-002 - Cadastrar Empresa
* UC-PLT-004 - Configurar Isolamento de Dados

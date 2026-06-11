# UC-SST-001

## Cadastrar Ambiente de Trabalho

### Objetivo

Permitir o cadastro de ambientes de trabalho com contexto ocupacional, lotacao e vigencia.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de SST habilitada.

---

# Gatilho

O processo inicia quando um ambiente de trabalho e cadastrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome, local e contexto.

### Etapa 2

Sistema valida duplicidade e vigencia.

### Etapa 3

Sistema salva o ambiente.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Ambiente duplicado

### Condicao

Ja existe ambiente equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Ambiente criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O ambiente deve ser versionado por tenant.
* A vigencia precisa ser rastreavel.

---

# Entidades Envolvidas

## WorkEnvironment

```text
id
tenant_id
name
location
status
```

---

# Casos Relacionados

* UC-SST-002 - Cadastrar Riscos Ocupacionais
* UC-SST-003 - Gerenciar PGR

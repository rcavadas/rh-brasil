# UC-WFL-001

## Criar Fluxo de Aprovacao

### Objetivo

Permitir o cadastro de um fluxo de aprovacao com nome, finalidade, contexto de uso e estado inicial auditavel.

---

# Atores

## Primarios

* Administrador de processo

## Secundarios

* Portal administrativo
* Motor de workflow
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de configuracao de workflow habilitada.

---

# Gatilho

O processo inicia quando o usuario cria um novo fluxo de aprovacao.

---

# Fluxo Principal

### Etapa 1

Usuario acessa a area de workflow.

### Etapa 2

Sistema apresenta a opcao de criar fluxo.

### Etapa 3

Usuario informa nome, contexto e finalidade.

### Etapa 4

Sistema valida duplicidade e permissao.

### Etapa 5

Sistema grava o fluxo com estado inicial.

### Etapa 6

Sistema registra auditoria da criacao.

---

# Fluxos Alternativos

## FA-01 - Nome duplicado

### Condicao

Ja existe fluxo com a mesma chave funcional.

### Fluxo

* Sistema bloqueia a criacao.

## FA-02 - Tenant revogado

### Condicao

O tenant ativo nao esta mais autorizado.

### Fluxo

* Sistema limpa o contexto e interrompe a operacao.

---

# Pos-condicoes

* Fluxo criado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Todo fluxo pertence a um tenant.
* A criacao precisa ser rastreavel.
* Fluxos devem suportar evolucao sem perder historico.

---

# Entidades Envolvidas

## WorkflowDefinition

```text
id
tenant_id
name
purpose
status
created_at
```

## AuditEvent

```text
id
actor_subject
tenant_id
action
resource_type
resource_id
created_at
```

---

# Casos Relacionados

* UC-WFL-002 - Configurar Etapas do Fluxo
* UC-WFL-010 - Auditar Historico do Workflow

# UC-GST-001

## Visualizar Equipe

### Objetivo

Permitir que o gestor visualize a equipe sob sua responsabilidade, incluindo estrutura, status e vínculos relevantes, com acesso controlado e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* BFF do portal
* API de cadastro
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Gestor associado a uma ou mais equipes.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa a visao da equipe no portal.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Equipe
```

### Etapa 2

Sistema valida a sessao e o tenant ativo.

### Etapa 3

Sistema recupera os colaboradores sob gestao do usuario autenticado.

### Etapa 4

Sistema apresenta a estrutura da equipe, cargos, vinculos, situacoes e indicadores basicos.

### Etapa 5

Sistema permite filtrar por filial, departamento, cargo ou status.

### Etapa 6

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Gestor sem equipe

### Condicao

O gestor autenticado nao possui equipe atribuida.

### Fluxo

* Sistema exibe mensagem informativa.
* Sistema oferece acesso a areas permitidas sem hierarquia.

## FA-02 - Tenant revogado

### Condicao

O tenant ativo deixou de estar autorizado.

### Fluxo

* Sistema limpa o contexto.
* Sistema solicita nova autenticacao ou selecao de contexto.

## FA-03 - Falha de consulta

### Condicao

A API de cadastro nao responde.

### Fluxo

* Sistema informa indisponibilidade temporaria.
* Sistema registra a falha.

---

# Pos-condicoes

* Visao da equipe exibida ou negada.
* Historico de acesso registrado.

---

# Regras de Negocio Relacionadas

* O gestor pode ver apenas sua base autorizada.
* A consulta deve respeitar segregacao por tenant e hierarquia.
* Dados sensiveis seguem a politica de exibicao.

---

# Entidades Envolvidas

## Employee

```text
id
person_id
company_id
department_id
position_id
manager_id
status
```

## TeamSummary

```text
id
manager_id
total_employees
active_employees
on_leave_employees
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

* UC-GST-005 - Acompanhar Admissoes
* UC-GST-007 - Consultar Indicadores da Equipe
* UC-SEC-010 - Auditar Acessos e Operacoes


# UC-COL-003

## Solicitar Atualizacao Cadastral

### Objetivo

Permitir que o colaborador solicite alteracoes em seus dados cadastrais e funcionais por meio do portal, com registro de pendencia, validacao e trilha de auditoria.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* RH
* Workflow e Aprovacoes
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado no portal.
* Tenant ativo validado.
* Dados cadastrais existentes para consulta inicial.
* Permissao de solicitacao habilitada no contexto corrente.

---

# Gatilho

O processo inicia quando o colaborador escolhe a opcao de solicitar atualizacao cadastral.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Solicitacoes
→ Atualizacao Cadastral
```

### Etapa 2

Sistema apresenta os campos permitidos para solicitacao.

### Etapa 3

Colaborador informa os dados que deseja atualizar.

### Etapa 4

Sistema valida formato, obrigatoriedade e escopo dos campos.

### Etapa 5

Sistema cria uma solicitacao de atualizacao cadastral com status pendente.

### Etapa 6

Sistema encaminha a solicitacao para analise do RH quando houver impacto operacional ou documental.

### Etapa 7

Sistema registra historico da solicitacao e trilha de auditoria.

### Etapa 8

Sistema notifica o colaborador sobre o protocolo gerado.

---

# Fluxos Alternativos

## FA-01 - Campo nao permitido

### Condicao

O colaborador tenta alterar um campo fora da politica de autosservico.

### Fluxo

* Sistema bloqueia a alteracao.
* Sistema orienta o colaborador a acionar o RH.

## FA-02 - Dados invalidos

### Condicao

Os dados informados nao atendem aos criterios de formato ou consistencia.

### Fluxo

* Sistema informa os erros.
* Sistema nao cria a solicitacao.

## FA-03 - Tenant revogado

### Condicao

O tenant ativo deixa de estar autorizado.

### Fluxo

* Sistema limpa o contexto.
* Sistema interrompe a solicitacao.

## FA-04 - Falha de persistencia

### Condicao

A solicitacao nao pode ser gravada.

### Fluxo

* Sistema informa indisponibilidade temporaria.
* Sistema registra a falha operacional.

---

# Pos-condicoes

* Solicitacao de atualizacao cadastral criada ou recusada.
* Historico e auditoria registrados.
* RH recebe a pendencia quando aplicavel.

---

# Regras de Negocio Relacionadas

* Apenas campos permitidos podem ser solicitados pelo colaborador.
* Alteracoes cadastrais sensiveis podem exigir analise do RH.
* A solicitacao nao altera o dado original ate a aprovacao.
* Toda solicitacao deve gerar protocolo e historico.

---

# Entidades Envolvidas

## EmployeeUpdateRequest

```text
id
employee_id
status
requested_at
reviewed_at
reviewed_by
```

## EmployeeUpdateItem

```text
id
request_id
field_name
old_value
new_value
status
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

* UC-COL-001 - Acessar Portal do Colaborador
* UC-COL-002 - Consultar Dados Cadastrais
* UC-WFL-001 - Criar Fluxo de Aprovacao
* UC-SEC-010 - Auditar Acessos e Operacoes


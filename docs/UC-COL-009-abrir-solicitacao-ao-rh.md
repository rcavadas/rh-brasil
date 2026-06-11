# UC-COL-009

## Abrir Solicitacao ao RH

### Objetivo

Permitir que o colaborador abra solicitacoes e chamados internos para o RH, com categorizacao, priorizacao e trilha de acompanhamento.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* Workflow e Aprovacoes
* RH
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado.
* Tenant ativo validado.
* Categoria de solicitacao disponivel.
* Permissao de abertura habilitada.

---

# Gatilho

O processo inicia quando o colaborador escolhe abrir uma solicitacao ao RH.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Solicitações ao RH
→ Nova Solicitação
```

### Etapa 2

Sistema apresenta categorias e assuntos disponiveis.

### Etapa 3

Colaborador informa o assunto, a descricao e os anexos quando necessario.

### Etapa 4

Sistema valida os dados basicos e cria o protocolo.

### Etapa 5

Sistema encaminha a solicitacao para a fila ou workflow apropriado.

### Etapa 6

Sistema exibe status inicial e numero de protocolo.

### Etapa 7

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Categoria invalida

### Condicao

A categoria selecionada nao existe ou nao esta habilitada.

### Fluxo

* Sistema bloqueia o envio.
* Sistema orienta a selecao de outra categoria.

## FA-02 - Anexo invalido

### Condicao

O arquivo anexado nao atende a politica.

### Fluxo

* Sistema rejeita o anexo.
* Sistema permite reenviar o chamado.

## FA-03 - Tenant revogado

### Condicao

O tenant ativo foi revogado.

### Fluxo

* Sistema limpa o contexto.
* Sistema interrompe a abertura.

---

# Pos-condicoes

* Solicitacao registrada com protocolo.
* Workflow iniciado quando aplicavel.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Toda solicitacao deve ter um protocolo unico.
* O colaborador deve conseguir acompanhar o status.
* A classificacao da solicitacao direciona o fluxo interno.

---

# Entidades Envolvidas

## HRRequest

```text
id
employee_id
category
subject
description
status
protocol
created_at
```

## HRRequestAttachment

```text
id
request_id
file_name
content_type
status
```

## WorkflowRequest

```text
id
request_type
resource_id
status
current_step
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
* UC-WFL-001 - Criar Fluxo de Aprovacao
* UC-WFL-010 - Auditar Historico do Workflow
* UC-GED-002 - Anexar Documento ao Colaborador


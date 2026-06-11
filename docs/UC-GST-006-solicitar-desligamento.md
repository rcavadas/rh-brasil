# UC-GST-006

## Solicitar Desligamento

### Objetivo

Permitir que o gestor solicite o desligamento de um colaborador sob sua responsabilidade, com encaminhamento ao RH e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* Workflow e Aprovacoes
* RH
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Colaborador sob responsabilidade do gestor.
* Permissao de solicitacao habilitada.

---

# Gatilho

O processo inicia quando o gestor solicita desligamento.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Desligamentos
→ Solicitar
```

### Etapa 2

Sistema apresenta o colaborador e os campos da solicitacao.

### Etapa 3

Gestor informa justificativa, data estimada e observacoes.

### Etapa 4

Sistema valida escopo e cria a solicitacao.

### Etapa 5

Sistema encaminha a solicitacao ao RH para analise.

### Etapa 6

Sistema registra protocolo e auditoria.

---

# Fluxos Alternativos

## FA-01 - Colaborador fora da equipe

### Condicao

O colaborador nao pertence a equipe do gestor.

### Fluxo

* Sistema bloqueia a solicitacao.
* Sistema registra tentativa indevida.

## FA-02 - Justificativa obrigatoria

### Condicao

A politica exige justificativa mais detalhada.

### Fluxo

* Sistema solicita complemento.
* Sistema impede o envio ate completude.

---

# Pos-condicoes

* Solicitacao de desligamento criada.
* RH notificado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor somente pode solicitar desligamento de pessoas sob sua gestao.
* A solicitacao nao efetiva desligamento.
* O RH conduz a etapa formal subsequente.

---

# Entidades Envolvidas

## TerminationRequest

```text
id
employee_id
status
reason
requested_by
requested_at
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

* UC-GST-001 - Visualizar Equipe
* UC-RES-001 - Registrar Desligamento
* UC-WFL-001 - Criar Fluxo de Aprovacao


# UC-GST-002

## Aprovar Ferias

### Objetivo

Permitir que o gestor aprove ou reprove solicitacoes de ferias da sua equipe, com rastreabilidade, justificativa e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* Workflow e Aprovacoes
* API de ferias
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Solicitacao de ferias pendente para a equipe do gestor.
* Permissao de aprovacao habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa a fila de ferias pendentes.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Ferias Pendentes
```

### Etapa 2

Sistema apresenta as solicitacoes pendentes da equipe.

### Etapa 3

Gestor seleciona uma solicitacao.

### Etapa 4

Sistema exibe periodo, saldo, abono e informacoes relevantes.

### Etapa 5

Gestor aprova ou reprova a solicitacao.

### Etapa 6

Sistema registra a decisao, a justificativa e atualiza o status.

### Etapa 7

Sistema encaminha a solicitacao para a proxima etapa quando aplicavel.

### Etapa 8

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Decisao com justificativa obrigatoria

### Condicao

A reprova requer justificativa.

### Fluxo

* Sistema solicita justificativa.
* Sistema persiste a decisao com motivo.

## FA-02 - Solicitacao fora da equipe

### Condicao

O colaborador nao pertence a equipe do gestor.

### Fluxo

* Sistema bloqueia a aprovacao.
* Sistema registra tentativa indevida.

## FA-03 - Tenant revogado

### Condicao

O tenant ativo foi revogado.

### Fluxo

* Sistema limpa o contexto.
* Sistema interrompe a operacao.

---

# Pos-condicoes

* Ferias aprovadas ou reprovadas.
* Workflow atualizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor aprova apenas membros da sua equipe.
* A justificativa de reprova deve ser armazenada.
* A decisao deve respeitar a politica de ferias.

---

# Entidades Envolvidas

## VacationRequest

```text
id
employee_id
status
approver_subject
decision_reason
decided_at
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
* UC-FER-005 - Aprovar Ferias
* UC-WFL-005 - Executar Aprovacao Sequencial


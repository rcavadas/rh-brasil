# UC-GST-003

## Aprovar Ajuste de Ponto

### Objetivo

Permitir que o gestor aprove ou reprova ajustes de ponto solicitados pela equipe, com verificacao de justificativa e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* API de jornada e ponto
* Workflow e Aprovacoes
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Ajuste de ponto pendente da equipe.
* Permissao de aprovacao habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa ajustes pendentes.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Ajustes de Ponto
```

### Etapa 2

Sistema lista os ajustes pendentes.

### Etapa 3

Gestor seleciona um ajuste.

### Etapa 4

Sistema apresenta marcacoes, justificativa e contexto.

### Etapa 5

Gestor aprova ou reprova o ajuste.

### Etapa 6

Sistema registra a decisao e atualiza o status.

### Etapa 7

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Ajuste sem justificativa suficiente

### Condicao

O ajuste nao apresenta embasamento valido.

### Fluxo

* Sistema permite reprova.
* Sistema exige justificativa do gestor.

## FA-02 - Ajuste fora da equipe

### Condicao

O colaborador nao pertence a equipe do gestor.

### Fluxo

* Sistema bloqueia a decisao.
* Sistema registra o evento.

---

# Pos-condicoes

* Ajuste aprovado ou reprovado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor aprova apenas ajustes da sua equipe.
* A justificativa deve permanecer rastreavel.
* A decisao deve impactar o ponto somente apos a aprovacao.

---

# Entidades Envolvidas

## TimeAdjustmentRequest

```text
id
employee_id
status
reason
approver_subject
decided_at
```

## TimeMark

```text
id
employee_id
occurred_at
source
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

* UC-GST-001 - Visualizar Equipe
* UC-JOR-006 - Solicitar Ajuste de Ponto
* UC-JOR-007 - Aprovar Ajuste de Ponto


# UC-GST-004

## Aprovar Horas Extras

### Objetivo

Permitir que o gestor avalie e aprove solicitações ou apontamentos de horas extras da equipe, com trilha de auditoria e integração com a apuracao de jornada.

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
* Horas extras pendentes para a equipe.
* Permissao de aprovacao habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa horas extras pendentes.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Horas Extras Pendentes
```

### Etapa 2

Sistema lista os registros ou solicitações pendentes.

### Etapa 3

Gestor seleciona o item a analisar.

### Etapa 4

Sistema apresenta periodo, carga, justificativa e impacto potencial.

### Etapa 5

Gestor aprova ou reprova.

### Etapa 6

Sistema registra a decisao e atualiza a situacao.

### Etapa 7

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Excedente fora da politica

### Condicao

O periodo excede a politica de horas extras permitida.

### Fluxo

* Sistema bloqueia a aprovacao.
* Sistema orienta revisão com RH.

## FA-02 - Item fora da equipe

### Condicao

O colaborador nao pertence a equipe do gestor.

### Fluxo

* Sistema bloqueia a decisao.
* Sistema registra tentativa indevida.

---

# Pos-condicoes

* Horas extras aprovadas ou rejeitadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A aprovação deve considerar a política de jornada.
* O gestor atua apenas na sua equipe.
* A decisão deve ser auditável.

---

# Entidades Envolvidas

## OvertimeApproval

```text
id
employee_id
period
status
approver_subject
decided_at
```

## TimeSummary

```text
id
employee_id
period
overtime_minutes
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
* UC-JOR-008 - Calcular Horas Extras
* UC-JOR-019 - Consolidar Eventos de Ponto para Folha


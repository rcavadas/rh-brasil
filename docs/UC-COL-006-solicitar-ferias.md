# UC-COL-006

## Solicitar Ferias

### Objetivo

Permitir que o colaborador solicite ferias pelo portal, com verificacao de saldo, janela concessiva, conflito de datas e encaminhamento para aprovacao.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* API de ferias
* Workflow e Aprovacoes
* Gestor
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado.
* Tenant ativo validado.
* Saldo de ferias disponivel.
* Janela concessiva valida.
* Permissao de solicitacao habilitada.

---

# Gatilho

O processo inicia quando o colaborador escolhe solicitar ferias.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Ferias
→ Solicitar
```

### Etapa 2

Sistema apresenta saldo, periodos e regras aplicaveis.

### Etapa 3

Colaborador informa periodo desejado, fracionamento e opcao de abono quando aplicavel.

### Etapa 4

Sistema valida saldo, janela concessiva e conflito de datas.

### Etapa 5

Sistema cria a solicitacao com status pendente.

### Etapa 6

Sistema encaminha a solicitacao ao fluxo de aprovacao.

### Etapa 7

Sistema registra auditoria e notifica o colaborador.

---

# Fluxos Alternativos

## FA-01 - Saldo insuficiente

### Condicao

O saldo disponivel nao cobre o periodo solicitado.

### Fluxo

* Sistema bloqueia a solicitacao.
* Sistema informa o saldo disponivel.

## FA-02 - Conflito de datas

### Condicao

O periodo solicitado conflita com outra ausencia ou ferias ja aprovadas.

### Fluxo

* Sistema bloqueia a solicitacao.
* Sistema orienta ajuste do periodo.

## FA-03 - Janela concessiva invalida

### Condicao

O periodo solicitado esta fora da janela concessiva.

### Fluxo

* Sistema impede o envio.
* Sistema informa a restricao.

## FA-04 - Tenant revogado

### Condicao

O tenant ativo nao esta mais autorizado.

### Fluxo

* Sistema limpa o contexto.
* Sistema interrompe o processo.

---

# Pos-condicoes

* Solicitacao de ferias criada ou recusada.
* Workflow de aprovacao iniciado quando aplicavel.
* Trilha de auditoria registrada.

---

# Regras de Negocio Relacionadas

* A solicitacao depende de saldo e janela concessiva validos.
* O colaborador nao pode solicitar ferias em periodo conflitivo.
* O fluxo de aprovacao pode envolver gestor e RH.
* Toda solicitacao deve manter historico.

---

# Entidades Envolvidas

## VacationRequest

```text
id
employee_id
start_date
end_date
status
abono_requested
split_count
requested_at
```

## VacationBalance

```text
id
employee_id
period
available_days
due_date
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
* UC-FER-004 - Solicitar Ferias
* UC-FER-005 - Aprovar Ferias
* UC-WFL-005 - Executar Aprovacao Sequencial


# UC-FER-005

## Aprovar Ferias

### Objetivo

Permitir a aprovacao, rejeicao ou ajuste de uma solicitacao de ferias.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Motor de ferias
* Workflow e aprovacoes
* Auditoria

---

# Pre-condicoes

* Solicitacao de ferias pendente.
* Permissao de aprovacao habilitada.

---

# Gatilho

O processo inicia quando a solicitacao entra em aprovacao.

---

# Fluxo Principal

### Etapa 1

Gestor analisa a solicitacao.

### Etapa 2

Sistema apresenta saldo, janela e impactos.

### Etapa 3

Gestor aprova, rejeita ou ajusta.

### Etapa 4

Sistema atualiza o status.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Reprovacao com justificativa

### Condicao

A solicitacao e rejeitada.

### Fluxo

* Sistema exige justificativa.

---

# Pos-condicoes

* Ferias aprovadas, rejeitadas ou ajustadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A decisao deve respeitar a politica de ferias.
* A justificativa precisa ser armazenada quando aplicavel.

---

# Entidades Envolvidas

## VacationApproval

```text
id
vacation_request_id
approver_subject
decision
reason
decided_at
```

---

# Casos Relacionados

* UC-FER-004 - Solicitar Ferias
* UC-GST-002 - Aprovar Ferias

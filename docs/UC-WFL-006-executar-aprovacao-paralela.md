# UC-WFL-006

## Executar Aprovacao Paralela

### Objetivo

Permitir a aprovacao paralela por multiplos aprovadores, com consolidacao do resultado final.

---

# Atores

## Primarios

* Aprovador

## Secundarios

* Portal operacional
* Motor de workflow
* Auditoria

---

# Pre-condicoes

* Solicitacao ativa.
* Fluxo configurado para aprovacao paralela.
* Aprovadores autenticados.

---

# Gatilho

O processo inicia quando a solicitacao entra em uma etapa paralela.

---

# Fluxo Principal

### Etapa 1

Sistema disponibiliza a solicitacao a todos os aprovadores definidos.

### Etapa 2

Cada aprovador registra sua decisao.

### Etapa 3

Sistema consolida as respostas.

### Etapa 4

Sistema determina o resultado final conforme a regra.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Resposta pendente

### Condicao

Nem todos os aprovadores responderam.

### Fluxo

* Sistema mantem a etapa em aberto.

---

# Pos-condicoes

* Aprovacao consolidada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A consolidacao deve obedecer a politica do fluxo.
* Cada aprovador tem decisao individual rastreavel.

---

# Entidades Envolvidas

## WorkflowParallelVote

```text
id
workflow_request_id
approver_subject
decision
decided_at
```

---

# Casos Relacionados

* UC-WFL-005 - Executar Aprovacao Sequencial
* UC-WFL-010 - Auditar Historico do Workflow

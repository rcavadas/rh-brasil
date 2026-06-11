# UC-WFL-007

## Escalonar Solicitacao

### Objetivo

Permitir escalonar uma solicitacao quando o SLA e ultrapassado.

---

# Atores

## Primarios

* Sistema de workflow

## Secundarios

* Gestor substituto
* Auditoria

---

# Pre-condicoes

* Solicitacao com SLA configurado.
* Prazo expirado ou em risco.

---

# Gatilho

O processo inicia quando o SLA da solicitacao e violado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica a violacao de prazo.

### Etapa 2

Sistema determina o alvo do escalonamento.

### Etapa 3

Sistema reencaminha a solicitacao.

### Etapa 4

Sistema notifica o novo responsavel.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Sem alvo de escalonamento

### Condicao

Nao existe responsavel substituto configurado.

### Fluxo

* Sistema registra o evento e mantem a fila.

---

# Pos-condicoes

* Solicitacao escalonada ou sinalizada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O escalonamento deve respeitar a hierarquia definida.
* O evento deve ser auditavel.

---

# Entidades Envolvidas

## WorkflowEscalation

```text
id
workflow_request_id
target_subject
reason
created_at
```

---

# Casos Relacionados

* UC-WFL-004 - Configurar SLA
* UC-WFL-010 - Auditar Historico do Workflow

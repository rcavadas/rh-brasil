# UC-WFL-005

## Executar Aprovacao Sequencial

### Objetivo

Permitir a execucao de aprovacao em sequencia, respeitando a ordem definida no fluxo.

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
* Fluxo com etapas sequenciais.
* Aprovador autenticado.

---

# Gatilho

O processo inicia quando uma solicitacao entra na primeira etapa de aprovacao.

---

# Fluxo Principal

### Etapa 1

Sistema posiciona a solicitacao na primeira etapa.

### Etapa 2

Aprovador analisa a solicitacao.

### Etapa 3

Aprovador aprova ou reprova.

### Etapa 4

Sistema avanca para a proxima etapa ou conclui o fluxo.

### Etapa 5

Sistema registra auditoria da decisao.

---

# Fluxos Alternativos

## FA-01 - Reprovacao

### Condicao

Uma etapa e reprovada.

### Fluxo

* Sistema encerra o fluxo conforme a regra.

---

# Pos-condicoes

* Aprovacao concluida ou encerrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A ordem das etapas deve ser respeitada.
* A decisao deve ser rastreavel.

---

# Entidades Envolvidas

## WorkflowRequest

```text
id
workflow_definition_id
status
current_step
approved_by
```

---

# Casos Relacionados

* UC-WFL-002 - Configurar Etapas do Fluxo
* UC-WFL-010 - Auditar Historico do Workflow

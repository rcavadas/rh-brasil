# UC-WFL-002

## Configurar Etapas do Fluxo

### Objetivo

Permitir a definicao das etapas, transicoes e validacoes de um fluxo de aprovacao.

---

# Atores

## Primarios

* Administrador de processo

## Secundarios

* Motor de workflow
* Auditoria

---

# Pre-condicoes

* Fluxo existente.
* Usuario autenticado.
* Permissao de configuracao habilitada.

---

# Gatilho

O processo inicia quando o usuario edita as etapas de um fluxo.

---

# Fluxo Principal

### Etapa 1

Usuario abre o fluxo desejado.

### Etapa 2

Sistema exibe a lista de etapas.

### Etapa 3

Usuario adiciona, remove ou reordena etapas.

### Etapa 4

Sistema valida transicoes e consistencia.

### Etapa 5

Sistema salva a configuracao.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Etapa invalida

### Condicao

A etapa nao atende as regras do fluxo.

### Fluxo

* Sistema bloqueia a alteracao.

---

# Pos-condicoes

* Etapas atualizadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A ordem das etapas deve ser consistente.
* Uma transicao so pode existir se a origem e destino forem validos.

---

# Entidades Envolvidas

## WorkflowStep

```text
id
workflow_definition_id
name
position
required
```

## WorkflowTransition

```text
id
workflow_step_from_id
workflow_step_to_id
condition
```

---

# Casos Relacionados

* UC-WFL-001 - Criar Fluxo de Aprovacao
* UC-WFL-005 - Executar Aprovacao Sequencial

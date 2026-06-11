# UC-CAR-008

## Criar Plano de Carreira

### Objetivo

Permitir a criacao de um plano de carreira com trilhas e requisitos de evolucao.

---

# Atores

## Primarios

* Gestor de carreira

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Estrutura de cargos e faixas disponivel.
* Permissao de gestao de carreira habilitada.

---

# Gatilho

O processo inicia quando o plano de carreira e criado.

---

# Fluxo Principal

### Etapa 1

Usuario define a trilha de evolucao.

### Etapa 2

Sistema valida cargos e faixas.

### Etapa 3

Sistema grava o plano.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Trilha inconsistente

### Condicao

Os passos da trilha nao sao coerentes.

### Fluxo

* Sistema bloqueia a criacao.

---

# Pos-condicoes

* Plano criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O plano deve ser versionado.
* A trilha precisa ser clara para sucessao e desenvolvimento.

---

# Entidades Envolvidas

## CareerPlan

```text
id
tenant_id
name
status
created_at
```

---

# Casos Relacionados

* UC-CAR-010 - Gerenciar Sucessao
* UC-PER-008 - Criar PDI

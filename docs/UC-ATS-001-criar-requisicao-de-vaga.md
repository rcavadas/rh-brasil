# UC-ATS-001

## Criar Requisicao de Vaga

### Objetivo

Permitir a abertura de uma requisicao de vaga com justificativa, perfil e contexto da necessidade.

---

# Atores

## Primarios

* Requisitante

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao para requisitar vaga habilitada.

---

# Gatilho

O processo inicia quando o usuario cria uma requisicao de vaga.

---

# Fluxo Principal

### Etapa 1

Usuario informa necessidade, perfil e motivo.

### Etapa 2

Sistema valida campos obrigatorios.

### Etapa 3

Sistema grava a requisicao em estado inicial.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Requisicao incompleta

### Condicao

Dados obrigatorios faltando.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Requisicao criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A requisicao pertence ao tenant.
* O motivo precisa ser rastreavel.

---

# Entidades Envolvidas

## VacancyRequest

```text
id
tenant_id
title
justification
status
created_at
```

---

# Casos Relacionados

* UC-ATS-002 - Aprovar Vaga
* UC-ATS-003 - Publicar Vaga

# UC-COL-005

## Consultar Informe de Rendimentos

### Objetivo

Permitir que o colaborador consulte o informe anual de rendimentos disponivel no portal, com controle de acesso e trilha de auditoria.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* API de folha
* Gestão Documental
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado.
* Tenant ativo validado.
* Informe de rendimentos gerado para o ano-base.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o colaborador acessa a area de informe de rendimentos.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Informe de Rendimentos
```

### Etapa 2

Sistema apresenta os anos-base disponiveis.

### Etapa 3

Colaborador seleciona o ano desejado.

### Etapa 4

Sistema consulta o informe correspondente.

### Etapa 5

Sistema exibe os dados consolidados de rendimentos e retencoes.

### Etapa 6

Sistema oferece download conforme politica documental.

### Etapa 7

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Ano-base indisponivel

### Condicao

Nao ha informe gerado para o ano solicitado.

### Fluxo

* Sistema informa indisponibilidade.
* Sistema sugere anos-base disponiveis.

## FA-02 - Documento retido

### Condicao

O informe ainda nao foi liberado para visualizacao.

### Fluxo

* Sistema bloqueia a exibicao.
* Sistema informa que o documento esta em processamento.

## FA-03 - Tenant revogado

### Condicao

O tenant ativo nao esta autorizado.

### Fluxo

* Sistema limpa o contexto.
* Sistema encerra a consulta.

---

# Pos-condicoes

* Informe consultado ou consulta negada.
* Historico de acesso registrado.

---

# Regras de Negocio Relacionadas

* O informe contem dados tributarios e deve ser tratado como dado sensivel.
* Apenas o colaborador autorizado pode acessar seu proprio informe.
* A consulta deve gerar trilha de auditoria.

---

# Entidades Envolvidas

## IncomeStatement

```text
id
employee_id
year_base
status
document_id
```

## IncomeStatementItem

```text
id
statement_id
description
amount
```

## Document

```text
id
document_type
version
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

* UC-COL-001 - Acessar Portal do Colaborador
* UC-FOL-009 - Gerar Holerite
* UC-GED-007 - Consultar Prontuario Eletronico
* UC-SEC-010 - Auditar Acessos e Operacoes


# UC-COL-004

## Consultar Holerite

### Objetivo

Permitir que o colaborador consulte seus holerites por competencia, com acesso controlado, visualizacao em modo leitura e trilha de auditoria.

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

* Colaborador autenticado no portal.
* Tenant ativo validado.
* Holerite disponivel para a competencia consultada.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o colaborador acessa a area de holerites.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Holerite
```

### Etapa 2

Sistema apresenta a lista de competencias disponiveis.

### Etapa 3

Colaborador seleciona a competencia desejada.

### Etapa 4

Sistema consulta o holerite correspondente.

### Etapa 5

Sistema apresenta proventos, descontos, bases e liquido da competencia.

### Etapa 6

Sistema disponibiliza visualizacao ou download conforme politica de exportacao.

### Etapa 7

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Competencia indisponivel

### Condicao

Nao ha holerite gerado para a competencia solicitada.

### Fluxo

* Sistema informa indisponibilidade.
* Sistema oferece outras competencias disponiveis.

## FA-02 - Consulta bloqueada

### Condicao

A competencia ainda nao foi liberada para visualizacao.

### Fluxo

* Sistema impede o acesso.
* Sistema informa que o documento ainda nao esta disponivel.

## FA-03 - Tenant revogado

### Condicao

O tenant ativo foi revogado.

### Fluxo

* Sistema limpa o contexto.
* Sistema interrompe a consulta.

## FA-04 - Falha de recuperacao

### Condicao

A API de folha ou o repositório documental nao responde.

### Fluxo

* Sistema informa indisponibilidade temporaria.
* Sistema registra a falha.

---

# Pos-condicoes

* Holerite exibido ou consulta negada.
* Trilha de acesso registrada.
* Dados remuneratorios tratados conforme politica de seguranca.

---

# Regras de Negocio Relacionadas

* O colaborador pode acessar apenas seus proprios holerites.
* Holerites sao sensiveis e precisam de controle de acesso.
* Exportacao segue a politica de documentos e LGPD.
* Toda consulta deve gerar historico.

---

# Entidades Envolvidas

## PayrollReceipt

```text
id
employee_id
competence
gross_amount
net_amount
status
document_id
```

## PayrollItem

```text
id
receipt_id
description
type
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


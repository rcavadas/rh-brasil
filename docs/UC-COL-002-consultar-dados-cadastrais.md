# UC-COL-002

## Consultar Dados Cadastrais

### Objetivo

Permitir que o colaborador consulte, em modo somente leitura, seus dados cadastrais pessoais, funcionais e historicos disponiveis no portal, com protecao de dados sensiveis e trilha de auditoria.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* API de cadastro
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado no portal.
* Tenant ativo validado para o subject autenticado.
* Colaborador vinculado a um registro de pessoa e a pelo menos um registro funcional.
* Permissao de consulta habilitada para o contexto corrente.

---

# Gatilho

O processo inicia quando o colaborador seleciona a area de dados cadastrais no portal.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Dados Cadastrais
```

### Etapa 2

Sistema valida a sessao, o tenant ativo e o escopo de acesso.

### Etapa 3

Sistema solicita os dados cadastrais do colaborador na API correspondente.

### Etapa 4

Sistema consolida as informacoes disponiveis para exibicao, incluindo:

* Nome completo
* Documento de identificacao
* Dados de contato
* Endereco
* Data de nascimento
* Situacao funcional
* Empresa, filial e lotacao
* Cargo e funcao
* Gestor imediato
* Jornada e escala vigentes
* Status do vinculo
* Historico resumido de alteracoes cadastrais

### Etapa 5

Sistema mascara ou restringe campos sensiveis conforme politica de exibicao.

### Etapa 6

Sistema exibe os dados ao colaborador em modo de leitura.

### Etapa 7

Sistema registra trilha de auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Sem vinculo funcional ativo

### Condicao

O colaborador autenticado nao possui registro funcional valido no tenant ativo.

### Fluxo

* Sistema informa indisponibilidade do cadastro funcional.
* Sistema orienta o retorno ao contexto correto ou ao RH.

## FA-02 - Dados incompletos

### Condicao

Alguns dados cadastrais ainda nao estao preenchidos ou estao pendentes de validacao.

### Fluxo

* Sistema exibe os dados disponiveis.
* Sistema sinaliza campos pendentes ou em validacao.

## FA-03 - Tenant revogado

### Condicao

O tenant ativo nao esta mais autorizado para o subject.

### Fluxo

* Sistema limpa o contexto ativo.
* Sistema solicita nova autenticacao ou selecao de contexto.

## FA-04 - Falha de consulta

### Condicao

A API de cadastro nao responde ou retorna erro.

### Fluxo

* Sistema exibe mensagem de indisponibilidade temporaria.
* Sistema registra a falha operacional.

---

# Pos-condicoes

* Consulta realizada em modo somente leitura.
* Historico de acesso registrado.
* Dados sensiveis expostos apenas no nivel permitido pela politica de exibicao.

---

# Regras de Negocio Relacionadas

* O colaborador pode consultar apenas seus proprios dados.
* Campos sensiveis devem ser mascarados ou omitidos conforme politica de acesso.
* Historico cadastral nao pode ser alterado por esta funcionalidade.
* Toda consulta a dados pessoais deve gerar trilha de auditoria.
* O tenant ativo deve ser revalidado antes da exibicao dos dados.

---

# Entidades Envolvidas

## Person

```text
id
name
document
birth_date
email
phone
address
```

## Employee

```text
id
person_id
company_id
tenant_id
department_id
position_id
manager_id
work_schedule_id
status
```

## EmployeeHistory

```text
id
employee_id
change_type
changed_at
summary
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
* UC-COL-003 - Solicitar Atualizacao Cadastral
* UC-ADM-001 - Cadastrar Colaborador
* UC-SEC-010 - Auditar Acessos e Operacoes

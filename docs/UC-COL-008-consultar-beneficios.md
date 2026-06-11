# UC-COL-008

## Consultar Beneficios

### Objetivo

Permitir que o colaborador visualize seus beneficios ativos, suas regras de uso e eventuais pendencias no portal.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* API de beneficios
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado.
* Tenant ativo validado.
* Beneficios ativos ou historicos disponiveis.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o colaborador acessa a area de beneficios.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa:

```text
Portal do Colaborador
→ Beneficios
```

### Etapa 2

Sistema recupera os beneficios associados ao colaborador.

### Etapa 3

Sistema apresenta nome, status, vigencia, cobertura e observacoes relevantes.

### Etapa 4

Sistema destaca pendencias, suspensoes ou cancelamentos quando existirem.

### Etapa 5

Sistema disponibiliza eventuais links ou instrucoes de uso conforme politica.

### Etapa 6

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Sem beneficios ativos

### Condicao

Nao ha beneficios vigentes para o colaborador.

### Fluxo

* Sistema exibe lista vazia com orientacao do RH.

## FA-02 - Beneficio suspenso

### Condicao

Algum beneficio esta suspenso ou cancelado.

### Fluxo

* Sistema informa o status e a justificativa disponivel.

## FA-03 - Falha de consulta

### Condicao

A API de beneficios nao responde.

### Fluxo

* Sistema informa indisponibilidade temporaria.
* Sistema registra a falha operacional.

---

# Pos-condicoes

* Beneficios consultados em modo leitura.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O colaborador consulta apenas seus proprios beneficios.
* Informacoes de cobertura e uso seguem a politica do contrato externo.
* A consulta deve respeitar LGPD e auditoria.

---

# Entidades Envolvidas

## BenefitAssignment

```text
id
employee_id
benefit_id
status
valid_from
valid_to
```

## BenefitCatalog

```text
id
tenant_id
name
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
* UC-BEN-003 - Conceder Beneficio ao Colaborador
* UC-BEN-004 - Suspender Beneficio
* UC-BEN-005 - Cancelar Beneficio


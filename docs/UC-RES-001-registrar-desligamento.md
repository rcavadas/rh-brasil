# UC-RES-001

## Registrar Desligamento

### Objetivo

Permitir o registro formal do desligamento do colaborador como ponto de partida da rescisao.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Portal administrativo
* Motor de rescisao
* Auditoria

---

# Pre-condicoes

* Colaborador ativo ou em encerramento.
* Permissao de desligamento habilitada.

---

# Gatilho

O processo inicia quando o desligamento e registrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa os dados do desligamento.

### Etapa 2

Sistema valida elegibilidade e contexto contratual.

### Etapa 3

Sistema grava o desligamento.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Contrato ja encerrado

### Condicao

O vinculo nao esta mais ativo.

### Fluxo

* Sistema bloqueia o registro.

---

# Pos-condicoes

* Desligamento registrado ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O desligamento precisa manter a origem e o historico.
* A rescisao depende do estado real do contrato.

---

# Entidades Envolvidas

## TerminationRequest

```text
id
employee_id
status
terminated_at
created_at
```

---

# Casos Relacionados

* UC-RES-002 - Definir Motivo de Desligamento
* UC-ADM-010 - Desligamento Administrativo

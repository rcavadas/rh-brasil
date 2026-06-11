# UC-PER-001

## Criar Ciclo de Avaliacao

### Objetivo

Permitir a criacao de um ciclo avaliativo com periodo, publico e regras basicas.

---

# Atores

## Primarios

* Gestor de desempenho

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de gestao de desempenho habilitada.

---

# Gatilho

O processo inicia quando um ciclo de avaliacao e criado.

---

# Fluxo Principal

### Etapa 1

Usuario informa periodo e publico alvo.

### Etapa 2

Sistema valida sobreposicao.

### Etapa 3

Sistema grava o ciclo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Ciclo sobreposto

### Condicao

Ja existe ciclo para o mesmo periodo.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Ciclo criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O ciclo deve ter vigencia.
* A avaliacao precisa ser rastreavel.

---

# Entidades Envolvidas

## PerformanceCycle

```text
id
tenant_id
name
starts_at
ends_at
status
```

---

# Casos Relacionados

* UC-PER-002 - Executar Avaliacao 90
* UC-PER-009 - Calibrar Resultados

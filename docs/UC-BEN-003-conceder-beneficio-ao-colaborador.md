# UC-BEN-003

## Conceder Beneficio ao Colaborador

### Objetivo

Permitir a concessao operacional do beneficio a um colaborador elegivel.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Portal administrativo
* Motor de beneficios
* Auditoria

---

# Pre-condicoes

* Beneficio cadastrado.
* Elegibilidade configurada.
* Colaborador elegivel.

---

# Gatilho

O processo inicia quando o beneficio e concedido.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o colaborador e beneficio.

### Etapa 2

Sistema valida a elegibilidade.

### Etapa 3

Sistema grava a concessao.

### Etapa 4

Sistema registra o historico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Colaborador inelegivel

### Condicao

O colaborador nao atende os criterios.

### Fluxo

* Sistema bloqueia a concessao.

---

# Pos-condicoes

* Beneficio concedido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A concessao precisa manter historico.
* A elegibilidade deve ser revalidada no ato.

---

# Entidades Envolvidas

## BenefitGrant

```text
id
employee_id
benefit_id
status
granted_at
```

---

# Casos Relacionados

* UC-BEN-004 - Suspender Beneficio
* UC-BEN-010 - Integrar Beneficios com Folha

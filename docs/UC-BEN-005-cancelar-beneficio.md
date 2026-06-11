# UC-BEN-005

## Cancelar Beneficio

### Objetivo

Permitir o cancelamento do beneficio com preservacao de historico e efeitos posteriores.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Motor de beneficios
* Auditoria

---

# Pre-condicoes

* Beneficio concedido ou suspenso.

---

# Gatilho

O processo inicia quando o beneficio e cancelado.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o beneficio.

### Etapa 2

Sistema solicita motivo e data de efeito.

### Etapa 3

Sistema atualiza o status para cancelado.

### Etapa 4

Sistema preserva o historico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Beneficio ja cancelado

### Condicao

O beneficio nao esta ativo.

### Fluxo

* Sistema bloqueia o cancelamento.

---

# Pos-condicoes

* Beneficio cancelado ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O cancelamento nao pode remover historico.
* Os efeitos posteriores precisam ser previsiveis.

---

# Entidades Envolvidas

## BenefitCancellation

```text
id
benefit_grant_id
reason
cancelled_at
```

---

# Casos Relacionados

* UC-BEN-004 - Suspender Beneficio
* UC-BEN-010 - Integrar Beneficios com Folha

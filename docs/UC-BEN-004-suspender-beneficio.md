# UC-BEN-004

## Suspender Beneficio

### Objetivo

Permitir a suspensao temporaria de um beneficio com rastreabilidade.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Motor de beneficios
* Auditoria

---

# Pre-condicoes

* Beneficio concedido.

---

# Gatilho

O processo inicia quando o beneficio e suspenso.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o beneficio ativo.

### Etapa 2

Sistema solicita motivo e vigencia.

### Etapa 3

Sistema atualiza o status.

### Etapa 4

Sistema preserva o historico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Suspensao invalida

### Condicao

Nao ha beneficio ativo para suspender.

### Fluxo

* Sistema bloqueia a operacao.

---

# Pos-condicoes

* Beneficio suspenso ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A suspensao deve ser temporaria e rastreavel.
* O historico nao pode ser apagado.

---

# Entidades Envolvidas

## BenefitSuspension

```text
id
benefit_grant_id
reason
starts_at
ends_at
```

---

# Casos Relacionados

* UC-BEN-005 - Cancelar Beneficio
* UC-BEN-010 - Integrar Beneficios com Folha

# UC-DEC-009

## Fechar Folha de Decimo Terceiro

### Objetivo

Permitir o fechamento da competencia de 13o salario.

---

# Atores

## Primarios

* Gestor de folha

## Secundarios

* Motor de 13o
* Auditoria

---

# Pre-condicoes

* Calculos e demonstrativos concluidos.

---

# Gatilho

O processo inicia quando a folha de 13o e fechada.

---

# Fluxo Principal

### Etapa 1

Sistema valida pendencias.

### Etapa 2

Usuario confirma o fechamento.

### Etapa 3

Sistema grava o estado fechado.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Pendencia aberta

### Condicao

Ainda ha calculo ou demonstrativo pendente.

### Fluxo

* Sistema bloqueia o fechamento.

---

# Pos-condicoes

* Folha de 13o fechada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O fechamento nao pode apagar historico.
* A competencia precisa ser preservada.

---

# Entidades Envolvidas

## ThirteenthSalaryClose

```text
id
tenant_id
status
closed_at
```

---

# Casos Relacionados

* UC-DEC-008 - Gerar Demonstrativo de Decimo Terceiro
* UC-DEC-010 - Integrar Decimo Terceiro ao eSocial

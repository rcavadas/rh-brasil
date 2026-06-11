# UC-SEC-008

## Aplicar Politica de Retencao

### Objetivo

Permitir a aplicacao de politicas de retencao por classe documental e finalidade.

---

# Atores

## Primarios

* Compliance

## Secundarios

* Auditoria

---

# Pre-condicoes

* Politica definida.

---

# Gatilho

O processo inicia quando a politica de retencao e aplicada.

---

# Fluxo Principal

### Etapa 1

Sistema identifica os itens elegiveis.

### Etapa 2

Sistema aplica retenção, anonimização ou descarte autorizado.

### Etapa 3

Sistema registra a decisao.

### Etapa 4

Sistema preserva a trilha minima.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Legal hold ativo

### Condicao

O item esta sob preservacao obrigatoria.

### Fluxo

* Sistema suspende a acao.

---

# Pos-condicoes

* Politica aplicada ou suspensa.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A retencao precisa ser versionada.
* A politica deve respeitar base legal e finalidade.

---

# Entidades Envolvidas

## RetentionRule

```text
id
subject_type
purpose
rule_expression
status
```

---

# Casos Relacionados

* UC-SEC-007 - Anonimizar Dados
* UC-GED-008 - Aplicar Politica de Retencao

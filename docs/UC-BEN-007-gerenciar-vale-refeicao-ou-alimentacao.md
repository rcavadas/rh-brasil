# UC-BEN-007

## Gerenciar Vale-Refeicao ou Alimentacao

### Objetivo

Permitir a gestao de VR ou VA com fornecedores, concessao e ajustes.

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

* Beneficio de VR ou VA cadastrado.
* Colaborador elegivel.

---

# Gatilho

O processo inicia quando o beneficio de refeicao ou alimentacao e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario define o modelo e o valor.

### Etapa 2

Sistema valida a elegibilidade.

### Etapa 3

Sistema grava a concessao ou ajuste.

### Etapa 4

Sistema registra eventuais descontos.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Fornecedor indisponivel

### Condicao

O fornecedor nao esta cadastrado.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* VR/VA gerenciado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O beneficio pode ser repassado por competencia.
* A politica de desconto deve ser rastreavel.

---

# Entidades Envolvidas

## MealBenefit

```text
id
employee_id
mode
amount
status
```

---

# Casos Relacionados

* UC-BEN-003 - Conceder Beneficio ao Colaborador
* UC-BEN-010 - Integrar Beneficios com Folha

# UC-BEN-002

## Configurar Elegibilidade de Beneficio

### Objetivo

Permitir a definicao das regras de elegibilidade por perfil, contrato e tenant.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Motor de beneficios
* Auditoria

---

# Pre-condicoes

* Beneficio cadastrado.

---

# Gatilho

O processo inicia quando a elegibilidade e configurada.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o beneficio.

### Etapa 2

Sistema apresenta criterios e excecoes.

### Etapa 3

Usuario define as regras.

### Etapa 4

Sistema salva a politica.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Regra inconsistente

### Condicao

A regra conflita com outra politica.

### Fluxo

* Sistema bloqueia a configuracao.

---

# Pos-condicoes

* Elegibilidade configurada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A elegibilidade precisa ser versionada.
* As excecoes devem ser rastreaveis.

---

# Entidades Envolvidas

## BenefitEligibilityRule

```text
id
benefit_id
rule_expression
status
updated_at
```

---

# Casos Relacionados

* UC-BEN-001 - Cadastrar Beneficio
* UC-BEN-003 - Conceder Beneficio ao Colaborador

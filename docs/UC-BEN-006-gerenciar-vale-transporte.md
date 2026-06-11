# UC-BEN-006

## Gerenciar Vale-Transporte

### Objetivo

Permitir a gestao operacional do vale-transporte, incluindo rotas, concessao e desconto.

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

* Beneficio de VT cadastrado.
* Colaborador elegivel.

---

# Gatilho

O processo inicia quando o vale-transporte e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario define origem, destino e quantidade.

### Etapa 2

Sistema valida elegibilidade.

### Etapa 3

Sistema grava a concessao ou atualizacao.

### Etapa 4

Sistema registra o desconto aplicavel.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Rota invalida

### Condicao

A rota informada nao e valida.

### Fluxo

* Sistema bloqueia a concessao.

---

# Pos-condicoes

* VT gerenciado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O desconto deve ser previsivel na folha.
* A rota precisa ser rastreavel.

---

# Entidades Envolvidas

## TransportationBenefit

```text
id
employee_id
origin
destination
status
```

---

# Casos Relacionados

* UC-BEN-003 - Conceder Beneficio ao Colaborador
* UC-BEN-010 - Integrar Beneficios com Folha

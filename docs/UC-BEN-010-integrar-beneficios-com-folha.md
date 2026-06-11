# UC-BEN-010

## Integrar Beneficios com Folha

### Objetivo

Permitir o reflexo de beneficios e descontos na folha de pagamento.

---

# Atores

## Primarios

* Motor de beneficios

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Beneficios concedidos ou importados.
* Competencia de folha disponivel.

---

# Gatilho

O processo inicia quando os beneficios sao integrados a folha.

---

# Fluxo Principal

### Etapa 1

Sistema consolida os beneficios elegiveis.

### Etapa 2

Sistema aplica os descontos ou creditos.

### Etapa 3

Sistema grava o reflexo por competencia.

### Etapa 4

Sistema registra o recibo sintetico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados conflitantes

### Condicao

O beneficio conflita com outra regra da folha.

### Fluxo

* Sistema sinaliza a divergencia.

---

# Pos-condicoes

* Integração de beneficios realizada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A integração precisa evitar duplicidade de descontos.
* Dados sensiveis devem ser protegidos.

---

# Entidades Envolvidas

## BenefitPayrollIntegration

```text
id
benefit_id
competency
status
integrated_at
```

---

# Casos Relacionados

* UC-BEN-003 - Conceder Beneficio ao Colaborador
* UC-FOL-005 - Processar Adiantamento Salarial

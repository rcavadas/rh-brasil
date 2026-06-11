# UC-RES-004

## Calcular Saldo de Salario

### Objetivo

Permitir o calculo do saldo salarial proporcional da competencia.

---

# Atores

## Primarios

* Motor de rescisao

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Desligamento registrado.
* Competencia disponivel.

---

# Gatilho

O processo inicia quando o saldo de salario e calculado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica os dias trabalhados.

### Etapa 2

Sistema apura o valor proporcional.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base de salario ausente

### Condicao

Nao ha salario valido no historico.

### Fluxo

* Sistema bloqueia o calculo.

---

# Pos-condicoes

* Saldo salarial calculado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O saldo deve refletir a competencia corrente.
* O historico salarial nao pode ser perdido.

---

# Entidades Envolvidas

## SalaryBalance

```text
id
termination_request_id
base_salary
days_worked
amount
```

---

# Casos Relacionados

* UC-RES-003 - Calcular Aviso Previo
* UC-RES-005 - Calcular Ferias Rescisorias

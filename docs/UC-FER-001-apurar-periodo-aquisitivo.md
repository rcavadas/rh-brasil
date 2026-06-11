# UC-FER-001

## Apurar Periodo Aquisitivo

### Objetivo

Permitir o calculo e controle do periodo aquisitivo de ferias por colaborador.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Portal administrativo
* Motor de ferias
* Auditoria

---

# Pre-condicoes

* Colaborador ativo.
* Historico contratual disponivel.
* Tenant ativo validado.

---

# Gatilho

O processo inicia quando o periodo aquisitivo precisa ser apurado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica o vinculo e a data de admissao.

### Etapa 2

Sistema calcula o inicio e o fim do periodo aquisitivo.

### Etapa 3

Sistema grava o resultado apurado.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Historico insuficiente

### Condicao

Nao ha dados suficientes para apuracao.

### Fluxo

* Sistema sinaliza pendencia de historico.

---

# Pos-condicoes

* Periodo aquisitivo apurado ou sinalizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O periodo aquisitivo deve ser calculado por colaborador.
* A apuracao precisa ser rastreavel por competencia.

---

# Entidades Envolvidas

## VacationAccrualPeriod

```text
id
employee_id
starts_at
ends_at
status
```

---

# Casos Relacionados

* UC-FER-002 - Controlar Periodo Concessivo
* UC-FER-003 - Consultar Saldo de Ferias

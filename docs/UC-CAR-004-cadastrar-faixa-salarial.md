# UC-CAR-004

## Cadastrar Faixa Salarial

### Objetivo

Permitir a definicao de faixas salariais com limites minimo, medio e maximo.

---

# Atores

## Primarios

* Gestor de remuneracao

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Estrutura ou cargo existente.
* Permissao de remuneracao habilitada.

---

# Gatilho

O processo inicia quando a faixa salarial e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa os limites da faixa.

### Etapa 2

Sistema valida consistencia.

### Etapa 3

Sistema grava a faixa salarial.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Faixa invalida

### Condicao

Os limites nao sao coerentes.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Faixa criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* As faixas devem respeitar politica interna.
* Os limites precisam ser consistentes.

---

# Entidades Envolvidas

## SalaryRange

```text
id
tenant_id
min_value
target_value
max_value
status
```

---

# Casos Relacionados

* UC-CAR-005 - Cadastrar Tabela Salarial
* UC-CAR-009 - Monitorar Equidade Salarial

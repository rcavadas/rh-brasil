# UC-CAR-005

## Cadastrar Tabela Salarial

### Objetivo

Permitir o cadastro de tabelas salariais por nivel, cargo ou faixa.

---

# Atores

## Primarios

* Gestor de remuneracao

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Faixas ou cargos disponiveis.
* Permissao de remuneracao habilitada.

---

# Gatilho

O processo inicia quando a tabela salarial e cadastrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa os niveis e valores.

### Etapa 2

Sistema valida consistencia entre faixas.

### Etapa 3

Sistema grava a tabela.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Sobreposicao indevida

### Condicao

A tabela conflita com outra vigente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Tabela criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A tabela deve ser versionada por vigencia.
* Os valores precisam ser consistentes.

---

# Entidades Envolvidas

## SalaryTable

```text
id
tenant_id
name
effective_from
status
```

---

# Casos Relacionados

* UC-CAR-004 - Cadastrar Faixa Salarial
* UC-CAR-009 - Monitorar Equidade Salarial

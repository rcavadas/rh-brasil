# UC-FER-004

## Solicitar Ferias

### Objetivo

Permitir a solicitacao de ferias pelo colaborador ou gestor com validacao de saldo e janela concessiva.

---

# Atores

## Primarios

* Colaborador
* Gestor

## Secundarios

* Portal administrativo
* Motor de ferias
* Auditoria

---

# Pre-condicoes

* Colaborador elegivel.
* Saldo e janela concessiva disponiveis.

---

# Gatilho

O processo inicia quando a solicitacao de ferias e criada.

---

# Fluxo Principal

### Etapa 1

Usuario escolhe periodo e fracionamento.

### Etapa 2

Sistema valida saldo, janela e conflitos.

### Etapa 3

Sistema grava a solicitacao.

### Etapa 4

Sistema atualiza o estado de aprovacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Conflito de datas

### Condicao

O periodo conflita com outro afastamento.

### Fluxo

* Sistema bloqueia a solicitacao.

---

# Pos-condicoes

* Solicitacao criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A solicitacao deve respeitar saldo e janela concessiva.
* O fracionamento precisa seguir a politica aplicavel.

---

# Entidades Envolvidas

## VacationRequest

```text
id
employee_id
starts_at
ends_at
status
created_at
```

---

# Casos Relacionados

* UC-FER-005 - Aprovar Ferias
* UC-GST-002 - Aprovar Ferias

# UC-CAR-010

## Gerenciar Sucessao

### Objetivo

Permitir o gerenciamento de sucessao com reserva, potencial e trilhas de substituicao.

---

# Atores

## Primarios

* Gestor de carreira

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Plano de carreira ou estrutura disponivel.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando a sucessao e gerenciada.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona posicao critica.

### Etapa 2

Sistema permite indicar reservas e substitutos.

### Etapa 3

Sistema grava a estrategia de sucessao.

### Etapa 4

Sistema atualiza o historico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Reserva inelegivel

### Condicao

O substituto nao cumpre os requisitos.

### Fluxo

* Sistema bloqueia a indicacao.

---

# Pos-condicoes

* Sucessao definida ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A sucessao deve estar alinhada ao plano de carreira.
* O historico precisa ser preservado.

---

# Entidades Envolvidas

## SuccessionPlan

```text
id
position_id
successor_employee_id
status
updated_at
```

---

# Casos Relacionados

* UC-CAR-008 - Criar Plano de Carreira
* UC-PER-010 - Gerar Matriz Desempenho-Potencial

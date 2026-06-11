# UC-CAR-006

## Registrar Promocao

### Objetivo

Permitir o registro de promocao vertical do colaborador.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Colaborador ativo.
* Estrutura de cargos disponivel.

---

# Gatilho

O processo inicia quando a promocao e registrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa cargo atual e destino.

### Etapa 2

Sistema valida elegibilidade.

### Etapa 3

Sistema grava a promocao.

### Etapa 4

Sistema atualiza o historico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Ineligibilidade

### Condicao

O colaborador nao atende os requisitos.

### Fluxo

* Sistema bloqueia a promocao.

---

# Pos-condicoes

* Promocao criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A promocao precisa manter historico.
* A mudanca pode impactar salario e carreira.

---

# Entidades Envolvidas

## Promotion

```text
id
employee_id
from_position_id
to_position_id
promoted_at
```

---

# Casos Relacionados

* UC-CAR-007 - Registrar Progressao
* UC-PER-008 - Criar PDI

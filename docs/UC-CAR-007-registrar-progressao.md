# UC-CAR-007

## Registrar Progressao

### Objetivo

Permitir a progressao horizontal ou de faixa do colaborador.

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
* Faixa salarial disponivel.

---

# Gatilho

O processo inicia quando a progressao e registrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa a progressao pretendida.

### Etapa 2

Sistema valida faixa e elegibilidade.

### Etapa 3

Sistema grava a progressao.

### Etapa 4

Sistema atualiza o historico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Faixa indisponivel

### Condicao

Nao existe faixa compativel.

### Fluxo

* Sistema bloqueia a progressao.

---

# Pos-condicoes

* Progressao criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A progressao pode impactar a tabela salarial.
* O historico deve ser preservado.

---

# Entidades Envolvidas

## Progression

```text
id
employee_id
current_band
target_band
progressed_at
```

---

# Casos Relacionados

* UC-CAR-006 - Registrar Promocao
* UC-CAR-009 - Monitorar Equidade Salarial

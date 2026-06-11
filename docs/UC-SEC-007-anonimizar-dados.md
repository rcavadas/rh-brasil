# UC-SEC-007

## Anonimizar Dados

### Objetivo

Permitir a anonimização de dados quando aplicavel por finalidade ou obrigacao.

---

# Atores

## Primarios

* Compliance

## Secundarios

* Auditoria

---

# Pre-condicoes

* Regra de anonimização definida.

---

# Gatilho

O processo inicia quando os dados sao anonimizado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica o conjunto elegivel.

### Etapa 2

Sistema aplica o mascaramento ou anonimização.

### Etapa 3

Sistema registra a alteracao.

### Etapa 4

Sistema preserva a trilha minima.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados fora de escopo

### Condicao

O conjunto nao pode ser anonimizado.

### Fluxo

* Sistema bloqueia a operacao.

---

# Pos-condicoes

* Dados anonimizado ou bloqueados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A anonimização deve respeitar a finalidade.
* A trilha minima precisa ser preservada.

---

# Entidades Envolvidas

## AnonymizationJob

```text
id
dataset_name
status
executed_at
```

---

# Casos Relacionados

* UC-SEC-006 - Atender Solicitacao do Titular
* UC-SEC-008 - Aplicar Politica de Retencao

# UC-PER-005

## Avaliar Competencias

### Objetivo

Permitir a avaliacao de competencias e comportamentos com base em uma matriz definida.

---

# Atores

## Primarios

* Avaliador

## Secundarios

* Performance
* Auditoria

---

# Pre-condicoes

* Ciclo ativo.
* Matriz de competencias disponivel.

---

# Gatilho

O processo inicia quando as competencias sao avaliadas.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta as competencias.

### Etapa 2

Avaliador atribui notas e comentarios.

### Etapa 3

Sistema grava a avaliacao.

### Etapa 4

Sistema consolida os resultados.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Competencia nao prevista

### Condicao

A competencia nao pertence a matriz.

### Fluxo

* Sistema bloqueia o registro.

---

# Pos-condicoes

* Competencias avaliadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A matriz deve ser consistente com o papel.
* Os resultados precisam ser rastreaveis.

---

# Entidades Envolvidas

## CompetencyAssessment

```text
id
review_id
competency
score
comment
```

---

# Casos Relacionados

* UC-PER-006 - Avaliar Metas
* UC-PER-008 - Criar PDI

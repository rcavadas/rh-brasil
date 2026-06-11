# UC-LMS-008

## Vincular Curso a Competencia

### Objetivo

Permitir o vinculo entre curso e competencia para suporte a trilhas e desenvolvimento.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Curso existente.
* Competencia cadastrada.

---

# Gatilho

O processo inicia quando o curso e vinculado a uma competencia.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona curso e competencia.

### Etapa 2

Sistema valida consistencia.

### Etapa 3

Sistema grava o vinculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Competencia ausente

### Condicao

A competencia nao existe.

### Fluxo

* Sistema bloqueia o vinculo.

---

# Pos-condicoes

* Vinculo criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O vinculo suporta trilhas e PDI.
* A associacao precisa ser rastreavel.

---

# Entidades Envolvidas

## CourseCompetency

```text
id
course_id
competency_id
created_at
```

---

# Casos Relacionados

* UC-LMS-002 - Criar Trilha de Aprendizagem
* UC-PER-008 - Criar PDI

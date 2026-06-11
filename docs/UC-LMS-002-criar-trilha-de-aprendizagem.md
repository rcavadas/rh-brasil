# UC-LMS-002

## Criar Trilha de Aprendizagem

### Objetivo

Permitir a criacao de trilhas por cargo, competencia, perfil ou publico.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Cursos disponiveis.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando a trilha e criada.

---

# Fluxo Principal

### Etapa 1

Usuario define a finalidade da trilha.

### Etapa 2

Sistema permite a selecao de cursos.

### Etapa 3

Sistema valida ordem e dependencias.

### Etapa 4

Sistema grava a trilha.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Curso ausente

### Condicao

Um curso necessario nao esta disponivel.

### Fluxo

* Sistema bloqueia a trilha ou a deixa incompleta.

---

# Pos-condicoes

* Trilha criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A trilha pode depender de competencia ou cargo.
* A ordem dos cursos precisa ser consistente.

---

# Entidades Envolvidas

## LearningPath

```text
id
tenant_id
name
purpose
status
```

---

# Casos Relacionados

* UC-LMS-001 - Cadastrar Curso
* UC-LMS-008 - Vincular Curso a Competencia

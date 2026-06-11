# UC-LMS-003

## Matricular Colaborador

### Objetivo

Permitir a matricula de um colaborador em um curso ou trilha.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Colaborador existente.
* Curso ou trilha disponivel.

---

# Gatilho

O processo inicia quando a matricula e criada.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona colaborador e curso.

### Etapa 2

Sistema valida elegibilidade.

### Etapa 3

Sistema cria a matricula.

### Etapa 4

Sistema atualiza o status.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Colaborador inelegivel

### Condicao

O colaborador nao pode ser matriculado.

### Fluxo

* Sistema bloqueia a acao.

---

# Pos-condicoes

* Matricula criada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A matricula deve respeitar prerequisitos.
* O status precisa ser rastreavel.

---

# Entidades Envolvidas

## Enrollment

```text
id
employee_id
course_id
status
enrolled_at
```

---

# Casos Relacionados

* UC-LMS-004 - Executar Treinamento
* UC-LMS-007 - Controlar Reciclagem Obrigatoria

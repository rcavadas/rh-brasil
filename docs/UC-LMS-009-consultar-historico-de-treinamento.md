# UC-LMS-009

## Consultar Historico de Treinamento

### Objetivo

Permitir a consulta do historico individual e gerencial de treinamentos.

---

# Atores

## Primarios

* Gestor

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Historico disponivel.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando o historico e consultado.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona colaborador ou grupo.

### Etapa 2

Sistema apresenta cursos, status e certificados.

### Etapa 3

Usuario filtra o recorte.

### Etapa 4

Sistema exibe o historico consolidado.

### Etapa 5

Sistema registra a consulta quando exigido.

---

# Fluxos Alternativos

## FA-01 - Registro inexistente

### Condicao

Nao ha historico para o recorte.

### Fluxo

* Sistema sinaliza ausencia de dados.

---

# Pos-condicoes

* Historico consultado.
* Consulta registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A consulta deve respeitar permissao.
* Dados sensiveis podem exigir mascaramento.

---

# Entidades Envolvidas

## TrainingHistory

```text
id
employee_id
course_id
status
updated_at
```

---

# Casos Relacionados

* UC-LMS-007 - Controlar Reciclagem Obrigatoria
* UC-LMS-010 - Gerar Indicadores de Aprendizagem

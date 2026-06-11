# UC-ONB-009

## Atribuir Treinamentos Iniciais

### Objetivo

Permitir a atribuicao de treinamentos iniciais obrigatorios ao novo colaborador.

---

# Atores

## Primarios

* Onboarding

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Processo de onboarding ativo.
* Catalogo de treinamentos disponivel.

---

# Gatilho

O processo inicia quando os treinamentos sao atribuidores.

---

# Fluxo Principal

### Etapa 1

Sistema identifica os treinamentos obrigatorios.

### Etapa 2

Usuario confirma a atribuicao.

### Etapa 3

Sistema cria as matriculas iniciais.

### Etapa 4

Sistema atualiza o onboarding.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Curso inexistente

### Condicao

O treinamento exigido nao esta catalogado.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* Treinamentos atribuídos ou sinalizados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Treinamentos obrigatorios devem ficar rastreaveis.
* O onboarding pode depender da conclusao de itens criticos.

---

# Entidades Envolvidas

## TrainingAssignment

```text
id
onboarding_process_id
course_id
status
assigned_at
```

---

# Casos Relacionados

* UC-LMS-003 - Matricular Colaborador
* UC-ONB-010 - Acompanhar Periodo de Experiencia

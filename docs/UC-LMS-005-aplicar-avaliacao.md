# UC-LMS-005

## Aplicar Avaliacao

### Objetivo

Permitir a avaliacao do aprendizado apos a execucao do treinamento.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Treinamento executado.
* Instrumento de avaliacao disponivel.

---

# Gatilho

O processo inicia quando a avaliacao e respondida.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta a avaliacao.

### Etapa 2

Usuario responde as questoes.

### Etapa 3

Sistema calcula o resultado.

### Etapa 4

Sistema grava a avaliacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Avaliacao incompleta

### Condicao

Nem todas as respostas foram preenchidas.

### Fluxo

* Sistema bloqueia a finalizacao.

---

# Pos-condicoes

* Avaliacao registrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A avaliacao deve ser associada ao curso.
* O resultado deve ser rastreavel.

---

# Entidades Envolvidas

## TrainingAssessment

```text
id
session_id
score
status
assessed_at
```

---

# Casos Relacionados

* UC-LMS-004 - Executar Treinamento
* UC-LMS-006 - Emitir Certificado

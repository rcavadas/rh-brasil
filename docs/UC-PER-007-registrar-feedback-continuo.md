# UC-PER-007

## Registrar Feedback Continuo

### Objetivo

Permitir o registro de feedbacks ao longo do ciclo avaliativo.

---

# Atores

## Primarios

* Gestor ou colega

## Secundarios

* Performance
* Auditoria

---

# Pre-condicoes

* Ciclo ativo.
* Avaliado identificado.

---

# Gatilho

O processo inicia quando um feedback e registrado.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o destinatario.

### Etapa 2

Usuario informa o feedback.

### Etapa 3

Sistema grava a anotacao.

### Etapa 4

Sistema associa ao ciclo.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Conteudo improprio

### Condicao

O texto viola a politica.

### Fluxo

* Sistema bloqueia o envio.

---

# Pos-condicoes

* Feedback registrado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O feedback deve ser rastreavel.
* Pode haver controle de visibilidade.

---

# Entidades Envolvidas

## FeedbackEntry

```text
id
review_cycle_id
author_subject
target_subject
content
created_at
```

---

# Casos Relacionados

* UC-PER-008 - Criar PDI
* UC-PER-010 - Gerar Matriz Desempenho-Potencial

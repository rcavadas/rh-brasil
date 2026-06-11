# UC-ATS-007

## Agendar Entrevista

### Objetivo

Permitir o agendamento de entrevistas com candidatos, entrevistadores e data definida.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* Entrevistador
* ATS
* Auditoria

---

# Pre-condicoes

* Candidato em etapa elegivel.
* Agenda disponivel.

---

# Gatilho

O processo inicia quando uma entrevista e agendada.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona candidato e entrevistadores.

### Etapa 2

Sistema apresenta opcoes de data e horario.

### Etapa 3

Usuario confirma o agendamento.

### Etapa 4

Sistema grava a entrevista.

### Etapa 5

Sistema notifica os participantes.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Conflito de agenda

### Condicao

Nao ha horario disponivel.

### Fluxo

* Sistema solicita nova escolha.

---

# Pos-condicoes

* Entrevista agendada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A entrevista deve ser atribuida a uma vaga ou processo.
* O agendamento precisa ser rastreavel.

---

# Entidades Envolvidas

## Interview

```text
id
candidate_id
scheduled_at
interviewer_subject
status
```

---

# Casos Relacionados

* UC-ATS-008 - Registrar Avaliacao do Candidato
* UC-ATS-010 - Converter Candidato em Pre-Admissao

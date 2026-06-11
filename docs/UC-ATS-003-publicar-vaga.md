# UC-ATS-003

## Publicar Vaga

### Objetivo

Permitir a publicacao de uma vaga aprovada em canais permitidos.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Vaga aprovada.
* Usuario autenticado.
* Canal de publicacao habilitado.

---

# Gatilho

O processo inicia quando a vaga e publicada.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona a vaga aprovada.

### Etapa 2

Sistema apresenta os canais permitidos.

### Etapa 3

Usuario confirma a publicacao.

### Etapa 4

Sistema altera o status para publicada.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Canal invalido

### Condicao

O canal escolhido nao e permitido.

### Fluxo

* Sistema bloqueia a publicacao.

---

# Pos-condicoes

* Vaga publicada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Apenas vagas aprovadas podem ser publicadas.
* A publicacao deve ser rastreavel.

---

# Entidades Envolvidas

## VacancyPublication

```text
id
vacancy_request_id
channel
status
published_at
```

---

# Casos Relacionados

* UC-ATS-002 - Aprovar Vaga
* UC-ATS-004 - Cadastrar Candidato

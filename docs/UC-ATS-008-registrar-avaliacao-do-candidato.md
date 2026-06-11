# UC-ATS-008

## Registrar Avaliacao do Candidato

### Objetivo

Permitir o registro de avaliacao por criterio, com consolidacao por entrevista ou etapa.

---

# Atores

## Primarios

* Entrevistador

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Entrevista ou etapa concluida.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando a avaliacao e registrada.

---

# Fluxo Principal

### Etapa 1

Entrevistador abre a avaliacao.

### Etapa 2

Sistema apresenta os criterios.

### Etapa 3

Usuario informa nota e observacoes.

### Etapa 4

Sistema grava a avaliacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Avaliacao incompleta

### Condicao

Algum criterio nao foi preenchido.

### Fluxo

* Sistema bloqueia o envio final.

---

# Pos-condicoes

* Avaliacao registrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A avaliacao deve ser associada ao contexto correto.
* Observacoes podem ser sensiveis e devem ser protegidas.

---

# Entidades Envolvidas

## CandidateEvaluation

```text
id
candidate_id
criterion
score
notes
evaluated_at
```

---

# Casos Relacionados

* UC-ATS-007 - Agendar Entrevista
* UC-ATS-009 - Emitir Proposta

# UC-ATS-006

## Movimentar Candidato no Pipeline

### Objetivo

Permitir a movimentacao do candidato entre etapas do funil seletivo.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Candidato cadastrado.
* Pipeline configurado.

---

# Gatilho

O processo inicia quando o candidato muda de etapa.

---

# Fluxo Principal

### Etapa 1

Recrutador seleciona a etapa atual e destino.

### Etapa 2

Sistema valida a transicao.

### Etapa 3

Sistema atualiza o estado do candidato.

### Etapa 4

Sistema registra historico e auditoria.

---

# Fluxos Alternativos

## FA-01 - Transicao invalida

### Condicao

A etapa destino nao e permitida.

### Fluxo

* Sistema bloqueia a movimentacao.

---

# Pos-condicoes

* Candidato movido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O pipeline deve respeitar a ordem permitida.
* Cada movimentacao precisa ser auditavel.

---

# Entidades Envolvidas

## CandidatePipelineStep

```text
id
candidate_id
from_stage
to_stage
moved_at
```

---

# Casos Relacionados

* UC-ATS-005 - Triar Curriculo
* UC-ATS-007 - Agendar Entrevista

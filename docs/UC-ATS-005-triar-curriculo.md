# UC-ATS-005

## Triar Curriculo

### Objetivo

Permitir triagem automatizada ou manual de curriculos conforme perfil da vaga.

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
* Perfil de vaga disponivel.

---

# Gatilho

O processo inicia quando o curriculo entra em triagem.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta o curriculo.

### Etapa 2

Recrutador avalia aderencia ao perfil.

### Etapa 3

Sistema registra o resultado da triagem.

### Etapa 4

Sistema altera a classificacao do candidato.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Reprovado na triagem

### Condicao

O curriculo nao atende ao perfil.

### Fluxo

* Sistema encerra ou arquiva o candidato.

---

# Pos-condicoes

* Triagem concluida.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A triagem deve ser justificavel.
* A decisão precisa preservar rastreabilidade.

---

# Entidades Envolvidas

## CandidateScreening

```text
id
candidate_id
result
reason
screened_at
```

---

# Casos Relacionados

* UC-ATS-004 - Cadastrar Candidato
* UC-ATS-006 - Movimentar Candidato no Pipeline

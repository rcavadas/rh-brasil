# UC-ATS-010

## Converter Candidato em Pre-Admissao

### Objetivo

Permitir a conversao de candidato aprovado em pre-admissao rastreavel para onboarding.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* ATS
* Onboarding
* Auditoria

---

# Pre-condicoes

* Candidato aprovado.
* Proposta aceita ou elegivel.
* Dados basicos validos.

---

# Gatilho

O processo inicia quando o candidato e convertido em pre-admissao.

---

# Fluxo Principal

### Etapa 1

Sistema valida elegibilidade da conversao.

### Etapa 2

Sistema cria o rascunho de pre-admissao.

### Etapa 3

Sistema vincula a origem ATS.

### Etapa 4

Sistema encaminha para onboarding.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Conversao negada

### Condicao

O candidato nao cumpre os requisitos.

### Fluxo

* Sistema bloqueia a transicao.

---

# Pos-condicoes

* Pre-admissao criada ou negada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A origem ATS deve ser preservada.
* A conversao precisa ser rastreavel.

---

# Entidades Envolvidas

## PreAdmission

```text
id
candidate_id
source
status
created_at
```

---

# Casos Relacionados

* UC-ATS-009 - Emitir Proposta
* UC-ONB-001 - Criar Processo de Pre-Admissao

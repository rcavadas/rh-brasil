# UC-ONB-001

## Criar Processo de Pre-Admissao

### Objetivo

Permitir a abertura do processo de onboarding a partir de uma pre-admissao rastreavel.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* Onboarding
* ATS
* Auditoria

---

# Pre-condicoes

* Pre-admissao disponivel.
* Usuario autenticado.
* Tenant ativo validado.

---

# Gatilho

O processo inicia quando o onboarding e criado.

---

# Fluxo Principal

### Etapa 1

Usuario abre a pre-admissao.

### Etapa 2

Sistema cria o processo de onboarding.

### Etapa 3

Sistema registra o vinculo com a origem ATS.

### Etapa 4

Sistema marca o estado inicial.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Pre-admissao ausente

### Condicao

Nao existe pre-admissao disponivel.

### Fluxo

* Sistema bloqueia a abertura.

---

# Pos-condicoes

* Processo criado ou negado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A origem ATS deve ser preservada.
* O processo precisa ser rastreavel.

---

# Entidades Envolvidas

## OnboardingProcess

```text
id
pre_admission_id
status
source
created_at
```

---

# Casos Relacionados

* UC-ONB-002 - Enviar Convite ao Candidato
* UC-ATS-010 - Converter Candidato em Pre-Admissao

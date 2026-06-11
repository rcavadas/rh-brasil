# UC-ATS-009

## Emitir Proposta

### Objetivo

Permitir a emissao de proposta de emprego vinculada ao candidato selecionado.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Candidato aprovado.
* Dados da proposta definidos.

---

# Gatilho

O processo inicia quando a proposta e emitida.

---

# Fluxo Principal

### Etapa 1

Usuario define cargos, salario e inicio previsto.

### Etapa 2

Sistema valida a proposta.

### Etapa 3

Sistema grava a proposta.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Proposta inconsistentes

### Condicao

Algum dado obrigatorio esta ausente ou invalido.

### Fluxo

* Sistema bloqueia o envio.

---

# Pos-condicoes

* Proposta emitida ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A proposta deve ser rastreavel.
* Valores e condicoes devem ser protegidos.

---

# Entidades Envolvidas

## JobOffer

```text
id
candidate_id
position
salary
status
sent_at
```

---

# Casos Relacionados

* UC-ATS-008 - Registrar Avaliacao do Candidato
* UC-ATS-010 - Converter Candidato em Pre-Admissao

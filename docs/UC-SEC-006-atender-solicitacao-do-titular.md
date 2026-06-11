# UC-SEC-006

## Atender Solicitacao do Titular

### Objetivo

Permitir o atendimento de solicitacoes do titular de dados.

---

# Atores

## Primarios

* Titular de dados

## Secundarios

* Compliance
* Auditoria

---

# Pre-condicoes

* Solicitacao validada.

---

# Gatilho

O processo inicia quando a solicitacao do titular e atendida.

---

# Fluxo Principal

### Etapa 1

Sistema recebe a solicitacao.

### Etapa 2

Compliance valida a legitimidade.

### Etapa 3

Sistema executa a resposta adequada.

### Etapa 4

Sistema registra a conclusao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Solicitacao invalida

### Condicao

Nao ha base legal para atendimento.

### Fluxo

* Sistema encerra com sinalizacao.

---

# Pos-condicoes

* Solicitacao atendida ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O atendimento precisa ser rastreavel.
* A resposta deve respeitar a finalidade.

---

# Entidades Envolvidas

## DataSubjectRequest

```text
id
subject_id
request_type
status
created_at
```

---

# Casos Relacionados

* UC-SEC-005 - Registrar Consentimento
* UC-SEC-007 - Anonimizar Dados

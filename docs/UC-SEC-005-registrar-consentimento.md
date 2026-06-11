# UC-SEC-005

## Registrar Consentimento

### Objetivo

Permitir o registro de consentimento com finalidade, escopo e vigencia.

---

# Atores

## Primarios

* Titular de dados

## Secundarios

* Portal
* Auditoria

---

# Pre-condicoes

* Politica de privacidade apresentada.

---

# Gatilho

O processo inicia quando o consentimento e registrado.

---

# Fluxo Principal

### Etapa 1

Usuario recebe a solicitacao.

### Etapa 2

Usuario aceita ou recusa.

### Etapa 3

Sistema grava a decisao.

### Etapa 4

Sistema registra a finalidade e a vigencia.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Consentimento revogado

### Condicao

O titular cancela o consentimento.

### Fluxo

* Sistema registra a revogacao.

---

# Pos-condicoes

* Consentimento registrado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O consentimento precisa ser rastreavel.
* A finalidade deve ser declarada.

---

# Entidades Envolvidas

## ConsentRecord

```text
id
data_subject_id
purpose
status
created_at
```

---

# Casos Relacionados

* UC-SEC-006 - Atender Solicitacao do Titular
* UC-SEC-008 - Aplicar Politica de Retencao

# UC-ONB-006

## Assinar Contrato de Trabalho

### Objetivo

Permitir a assinatura digital do contrato de trabalho dentro do fluxo de onboarding.

---

# Atores

## Primarios

* Candidato

## Secundarios

* GED
* Onboarding
* Auditoria

---

# Pre-condicoes

* Contrato disponivel.
* Checklist minimo concluido.

---

# Gatilho

O processo inicia quando o contrato e apresentado para assinatura.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta o contrato.

### Etapa 2

Candidato confere e assina.

### Etapa 3

Sistema valida a evidencia.

### Etapa 4

Sistema grava o status assinado.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Recusa de assinatura

### Condicao

O candidato nao conclui a assinatura.

### Fluxo

* Sistema mantem o contrato pendente.

---

# Pos-condicoes

* Contrato assinado ou pendente.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O contrato deve manter evidencias.
* A assinatura precisa ser rastreavel.

---

# Entidades Envolvidas

## EmploymentContractSignature

```text
id
onboarding_process_id
method
status
signed_at
```

---

# Casos Relacionados

* UC-GED-005 - Assinar Documento Eletronicamente
* UC-ONB-010 - Acompanhar Periodo de Experiencia

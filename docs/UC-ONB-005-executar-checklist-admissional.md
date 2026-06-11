# UC-ONB-005

## Executar Checklist Admissional

### Objetivo

Permitir a verificacao das pendencias admissionais antes da formalizacao final.

---

# Atores

## Primarios

* Onboarding

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Processo de pre-admissao ativo.
* Documentos basicos coletados.

---

# Gatilho

O processo inicia quando o checklist e executado.

---

# Fluxo Principal

### Etapa 1

Sistema lista os itens obrigatorios.

### Etapa 2

Sistema verifica cada pendencia.

### Etapa 3

Sistema marca pendencias abertas e completas.

### Etapa 4

Sistema atualiza o estado do processo.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Pendencia critica

### Condicao

Um item obrigatorio nao foi entregue.

### Fluxo

* Sistema impede a conclusao do checklist.

---

# Pos-condicoes

* Checklist executado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Itens obrigatorios nao podem ser ignorados.
* O status do checklist precisa ser rastreavel.

---

# Entidades Envolvidas

## AdmissionChecklistItem

```text
id
onboarding_process_id
item_name
status
updated_at
```

---

# Casos Relacionados

* UC-ONB-004 - Coletar Documentos Admissionais
* UC-ONB-006 - Assinar Contrato de Trabalho

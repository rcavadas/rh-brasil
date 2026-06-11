# UC-GED-005

## Assinar Documento Eletronicamente

### Objetivo

Permitir assinatura eletrônica simples de documentos com registro de consentimento e trilha.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* GED
* Provedor de assinatura
* Auditoria

---

# Pre-condicoes

* Documento disponivel para assinatura.
* Usuario autenticado.
* Metodo de assinatura permitido.

---

# Gatilho

O processo inicia quando o usuario aceita assinar um documento.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta o documento.

### Etapa 2

Usuario confirma a assinatura.

### Etapa 3

Sistema aplica a assinatura eletrônica.

### Etapa 4

Sistema grava a evidencia.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Assinatura recusada

### Condicao

O usuario nao confirma a assinatura.

### Fluxo

* Sistema mantém o documento pendente.

---

# Pos-condicoes

* Documento assinado ou pendente.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A assinatura deve ser rastreavel.
* O documento nao pode ser alterado apos assinatura sem nova versao.

---

# Entidades Envolvidas

## DocumentSignature

```text
id
document_id
signer_subject
method
signed_at
```

---

# Casos Relacionados

* UC-GED-006 - Assinar Documento com ICP-Brasil
* UC-ONB-006 - Assinar Contrato de Trabalho

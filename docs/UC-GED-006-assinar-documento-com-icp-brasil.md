# UC-GED-006

## Assinar Documento com ICP-Brasil

### Objetivo

Permitir assinatura qualificada com ICP-Brasil em documentos que exigem nivel superior de confianca.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Provedor ICP-Brasil
* GED
* Auditoria

---

# Pre-condicoes

* Documento elegivel.
* Certificado disponivel.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando o usuario escolhe assinatura qualificada.

---

# Fluxo Principal

### Etapa 1

Sistema solicita o certificado.

### Etapa 2

Usuario autentica o certificado.

### Etapa 3

Sistema aplica a assinatura ICP-Brasil.

### Etapa 4

Sistema valida a evidência.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Certificado invalido

### Condicao

O certificado nao e aceito.

### Fluxo

* Sistema bloqueia a assinatura.

---

# Pos-condicoes

* Documento assinado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A assinatura qualificada deve ser preservada como evidencia forte.
* O metodo deve ser armazenado no historico.

---

# Entidades Envolvidas

## DocumentSignature

```text
id
document_id
signer_subject
method
certificate_serial
signed_at
```

---

# Casos Relacionados

* UC-GED-005 - Assinar Documento Eletronicamente
* UC-SEC-004 - Configurar SSO

# UC-ESO-002

## Gerenciar Certificado Digital

### Objetivo

Permitir o cadastro, controle de validade e uso do certificado digital do eSocial.

---

# Atores

## Primarios

* Gestor de eSocial

## Secundarios

* Auditoria

---

# Pre-condicoes

* Ambiente eSocial configurado.

---

# Gatilho

O processo inicia quando o certificado e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario cadastra o certificado.

### Etapa 2

Sistema valida validade e permissao.

### Etapa 3

Sistema grava o certificado.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Certificado expirado

### Condicao

O certificado nao esta valido.

### Fluxo

* Sistema bloqueia o uso.

---

# Pos-condicoes

* Certificado controlado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O certificado precisa de vigencia e rotacao.
* O uso deve ser rastreavel.

---

# Entidades Envolvidas

## DigitalCertificate

```text
id
tenant_id
serial_number
expires_at
status
```

---

# Casos Relacionados

* UC-ESO-001 - Configurar Ambiente eSocial
* UC-ESO-003 - Transmitir Evento S-1000

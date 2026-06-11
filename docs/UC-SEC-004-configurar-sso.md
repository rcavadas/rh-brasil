# UC-SEC-004

## Configurar SSO

### Objetivo

Permitir a configuracao de Single Sign-On com provedor externo.

---

# Atores

## Primarios

* Administrador de seguranca

## Secundarios

* IdP
* Auditoria

---

# Pre-condicoes

* Provedor de identidade disponivel.

---

# Gatilho

O processo inicia quando o SSO e configurado.

---

# Fluxo Principal

### Etapa 1

Usuario informa os dados do provedor.

### Etapa 2

Sistema valida endpoints e certificados.

### Etapa 3

Sistema grava a configuracao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Provedor indisponivel

### Condicao

O IdP nao responde.

### Fluxo

* Sistema bloqueia a ativacao.

---

# Pos-condicoes

* SSO configurado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A alteracao afeta autenticacao e acessos.
* O contrato deve ser versionado.

---

# Entidades Envolvidas

## SingleSignOnConfig

```text
id
tenant_id
issuer
status
updated_at
```

---

# Casos Relacionados

* UC-SEC-003 - Configurar MFA
* UC-API-009 - Integrar com Provedor de Identidade

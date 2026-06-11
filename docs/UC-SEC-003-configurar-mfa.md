# UC-SEC-003

## Configurar MFA

### Objetivo

Permitir a configuracao de autenticação multifator para usuarios ou grupos.

---

# Atores

## Primarios

* Administrador de seguranca

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Perfil ou grupo definido.

---

# Gatilho

O processo inicia quando o MFA e configurado.

---

# Fluxo Principal

### Etapa 1

Usuario define a politica.

### Etapa 2

Sistema valida o escopo.

### Etapa 3

Sistema grava a configuracao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Escopo invalido

### Condicao

O grupo nao existe.

### Fluxo

* Sistema bloqueia a configuracao.

---

# Pos-condicoes

* MFA configurado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O MFA deve ser coerente com o portal e o BFF.
* A politica precisa ser rastreavel.

---

# Entidades Envolvidas

## MultiFactorPolicy

```text
id
tenant_id
scope
status
updated_at
```

---

# Casos Relacionados

* UC-SEC-001 - Gerenciar Perfis de Acesso
* UC-SEC-004 - Configurar SSO

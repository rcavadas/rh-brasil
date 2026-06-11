# UC-SEC-002

## Gerenciar Permissoes

### Objetivo

Permitir a configuracao de permissoes granulares por perfil, recurso e acao.

---

# Atores

## Primarios

* Administrador de seguranca

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Perfil de acesso existente.

---

# Gatilho

O processo inicia quando as permissoes sao configuradas.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o perfil.

### Etapa 2

Sistema apresenta recursos e acoes.

### Etapa 3

Usuario define as permissoes.

### Etapa 4

Sistema grava a politica.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Permissao conflitante

### Condicao

A permissao conflita com outra regra.

### Fluxo

* Sistema bloqueia o salvamento.

---

# Pos-condicoes

* Permissoes configuradas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A permissao precisa respeitar tenant e finalidade.
* O historico deve ser preservado.

---

# Entidades Envolvidas

## AccessPermission

```text
id
role_id
resource
action
status
```

---

# Casos Relacionados

* UC-SEC-001 - Gerenciar Perfis de Acesso
* UC-SEC-004 - Configurar SSO

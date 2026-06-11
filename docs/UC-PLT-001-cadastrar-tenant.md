# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-001 - Cadastrar Tenant

### Versao

1.0

---

# Objetivo

Cadastrar um tenant na plataforma SaaS, definindo a unidade base de isolamento multiempresa.

---

# Atores

- Administrador do Sistema
- Gestor de Plataforma

---

# Pre-condicoes

- Usuario autenticado.
- Permissao administrativa.

---

# Gatilho

O processo inicia quando um novo tenant precisa ser criado.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Tenants.
2. Sistema apresenta o formulario.
3. Usuario informa dados do tenant.
4. Sistema valida unicidade.
5. Sistema grava o tenant.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O tenant e a fronteira principal do isolamento.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## PlatformTenant

```text
id
code
name
status
```

---

# Testes

- Cadastrar tenant valido.
- Bloquear codigo duplicado.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre a base do multi-tenant e define a unidade estrutural da plataforma.

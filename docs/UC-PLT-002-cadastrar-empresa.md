# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-002 - Cadastrar Empresa

### Versao

1.0

---

# Objetivo

Cadastrar empresas vinculadas ao tenant para operar o dominio multiempresa.

---

# Atores

- Administrador do Sistema
- Gestor de Plataforma

---

# Pre-condicoes

- Tenant cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando uma empresa precisa ser criada no tenant.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Empresas.
2. Sistema apresenta o formulario.
3. Usuario informa os dados da empresa.
4. Sistema valida vinculo com tenant.
5. Sistema grava a empresa.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A empresa deve pertencer a um tenant.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## PlatformCompany

```text
id
tenant_id
name
document
status
```

---

# Testes

- Cadastrar empresa valida.
- Bloquear sem tenant.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois do tenant e materializa a primeira fronteira empresarial.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-003 - Cadastrar Filial

### Versao

1.0

---

# Objetivo

Cadastrar filiais vinculadas a uma empresa para compor a estrutura organizacional.

---

# Atores

- Administrador do Sistema
- Gestor de Plataforma

---

# Pre-condicoes

- Empresa cadastrada.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando uma filial precisa ser criada.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Filiais.
2. Sistema apresenta o formulario.
3. Usuario informa os dados da filial.
4. Sistema valida o vinculo com a empresa.
5. Sistema grava a filial.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A filial deve pertencer a uma empresa.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## PlatformBranch

```text
id
company_id
name
document
status
```

---

# Testes

- Cadastrar filial valida.
- Bloquear sem empresa.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso completa a hierarquia estrutural da empresa dentro do tenant.

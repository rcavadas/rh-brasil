# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-001 - Gerenciar Perfis de Acesso

### Versao

1.0

---

# Objetivo

Gerenciar perfis de acesso do sistema, definindo conjuntos de permissoes por funcao ou papel.

---

# Atores

- Administrador do Sistema
- Gestor de Seguranca

---

# Pre-condicoes

- Usuario autenticado.
- Permissao administrativa.

---

# Gatilho

O processo inicia quando um perfil de acesso precisa ser criado ou alterado.

---

# Fluxo Principal

1. Usuario acessa Seguranca > Perfis.
2. Sistema apresenta os perfis existentes.
3. Usuario cadastra ou altera o perfil.
4. Sistema valida unicidade e escopo.
5. Sistema grava o perfil.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- Perfis devem ser rastreaveis.
- Alteracoes devem manter historico.

---

# Entidades Envolvidas

## SecurityAccessProfile

```text
id
code
description
status
```

---

# Testes

- Cadastrar perfil valido.
- Bloquear codigo duplicado.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre a camada transversal de seguranca ao definir os perfis base do sistema.

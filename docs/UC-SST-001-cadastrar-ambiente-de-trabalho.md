# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-001 - Cadastrar Ambiente de Trabalho

### Versao

1.0

---

# Objetivo

Cadastrar ambientes de trabalho para contextualizar riscos e obrigações de SST.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para gerir SST.

---

# Gatilho

O processo inicia quando um novo ambiente de trabalho precisa ser cadastrado.

---

# Fluxo Principal

1. Usuario acessa SST > Ambientes.
2. Sistema apresenta o formulario.
3. Usuario informa os dados do ambiente.
4. Sistema valida a consistencia.
5. Sistema grava o ambiente.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O ambiente deve ser rastreavel por tenant.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## OccupationalEnvironment

```text
id
tenant_id
name
status
```

---

# Testes

- Cadastrar ambiente valido.
- Bloquear duplicidade.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre a base ocupacional do produto e contextualiza riscos e exigencias de SST.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-001 - Cadastrar Beneficio

### Versao

1.0

---

# Objetivo

Cadastrar e manter o catalogo de beneficios disponiveis por empresa ou tenant.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Empresa configurada.
- Usuario autenticado.
- Permissao para cadastrar beneficios.

---

# Gatilho

O processo inicia quando a empresa precisa criar ou alterar um beneficio disponivel.

---

# Fluxo Principal

1. Usuario acessa Beneficios > Catalogo.
2. Sistema apresenta o formulario.
3. Usuario informa dados do beneficio.
4. Sistema valida unicidade e classificacao.
5. Sistema grava o beneficio.
6. Sistema registra historico e auditoria.

---

# Regras de Negocio Relacionadas

- O beneficio deve ter identificacao unica por empresa.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## BenefitCatalogItem

```text
id
company_id
code
description
status
```

---

# Testes

- Cadastrar beneficio valido.
- Bloquear codigo duplicado.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre o pacote de beneficios e define o catalogo base que os demais casos consomem.

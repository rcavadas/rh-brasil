# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-001 - Cadastrar Integracao

### Versao

1.0

---

# Objetivo

Cadastrar uma integracao externa com escopo, finalidade e metadados de operacao.

---

# Atores

- Administrador do Sistema
- Analista de Integrações

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para integrar sistemas.

---

# Gatilho

O processo inicia quando uma nova integracao precisa ser cadastrada.

---

# Fluxo Principal

1. Usuario acessa Integracoes > Cadastro.
2. Sistema apresenta o formulario.
3. Usuario informa dados da integracao.
4. Sistema valida contrato e escopo.
5. Sistema grava o cadastro.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- Integracoes devem ser rastreaveis por tenant.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## ExternalIntegration

```text
id
tenant_id
name
integration_type
status
```

---

# Testes

- Cadastrar integracao valida.
- Bloquear contrato inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre o pacote de integracoes ao cadastrar o contrato base de um sistema externo.

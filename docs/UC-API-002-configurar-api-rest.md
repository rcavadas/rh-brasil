# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-002 - Configurar API REST

### Versao

1.0

---

# Objetivo

Configurar contratos de API REST para consumo e exposicao de recursos.

---

# Atores

- Analista de Integrações
- Administrador do Sistema

---

# Pre-condicoes

- Integracao cadastrada.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a API REST precisa ser configurada ou alterada.

---

# Fluxo Principal

1. Usuario acessa Integracoes > API REST.
2. Sistema apresenta a configuracao.
3. Usuario define endpoints e politica.
4. Sistema valida o contrato.
5. Sistema grava a configuracao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O contrato deve ser versionado.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## ApiRestContract

```text
id
integration_id
base_url
status
version
```

---

# Testes

- Configurar API valida.
- Bloquear contrato inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois do cadastro e define a superficie REST da integracao.

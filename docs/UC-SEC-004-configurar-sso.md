# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-004 - Configurar SSO

### Versao

1.0

---

# Objetivo

Configurar SSO para acesso ao sistema com base em identidade centralizada.

---

# Atores

- Gestor de Seguranca
- Administrador do Sistema

---

# Pre-condicoes

- Usuario autenticado.
- Provedor de identidade disponivel.

---

# Gatilho

O processo inicia quando a configuracao de SSO precisa ser alterada ou criada.

---

# Fluxo Principal

1. Usuario acessa Seguranca > SSO.
2. Sistema apresenta os dados do provedor.
3. Usuario informa parametros.
4. Sistema valida o contrato.
5. Sistema grava a configuracao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- SSO deve permanecer rastreavel.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## SecuritySsoConfig

```text
id
provider
issuer
client_id
status
```

---

# Testes

- Configurar SSO valido.
- Bloquear contrato inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a camada de identidade centralizada junto com MFA.

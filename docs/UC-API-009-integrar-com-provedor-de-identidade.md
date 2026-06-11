# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-009 - Integrar com Provedor de Identidade

### Versao

1.0

---

# Objetivo

Integrar com provedor de identidade para autenticacao, autorizacao e provisionamento basicos.

---

# Atores

- Analista de Integrações
- Gestor de Seguranca

---

# Pre-condicoes

- Integracao cadastrada.
- Provedor de identidade disponivel.

---

# Gatilho

O processo inicia quando a integracao com identidade precisa ser configurada ou ajustada.

---

# Fluxo Principal

1. Usuario acessa Integracoes > Identidade.
2. Sistema apresenta a configuracao.
3. Usuario valida os parametros.
4. Sistema grava a integracao.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A integracao deve respeitar SSO e MFA.
- Segredos devem ser protegidos.

---

# Entidades Envolvidas

## IdentityProviderIntegration

```text
id
integration_id
issuer
client_id
status
```

---

# Testes

- Integrar provedor valido.
- Bloquear contrato inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso conecta o pacote de integracoes com a camada de seguranca e SSO.

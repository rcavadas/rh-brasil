# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-003 - Configurar Webhook

### Versao

1.0

---

# Objetivo

Configurar webhooks para publicacao e recebimento de eventos externos.

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

O processo inicia quando um webhook precisa ser criado ou alterado.

---

# Fluxo Principal

1. Usuario acessa Integracoes > Webhooks.
2. Sistema apresenta o formulario.
3. Usuario define URL e assinatura.
4. Sistema valida o contrato.
5. Sistema grava o webhook.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- Webhooks devem ser idempotentes.
- Segredos nao devem ser expostos.

---

# Entidades Envolvidas

## WebhookContract

```text
id
integration_id
url
secret_ref
status
```

---

# Testes

- Configurar webhook valido.
- Bloquear URL inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa a API REST ao definir callbacks e contratos de evento.

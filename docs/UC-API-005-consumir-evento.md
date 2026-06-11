# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-005 - Consumir Evento

### Versao

1.0

---

# Objetivo

Consumir eventos externos com controle de duplicidade, falha e auditoria.

---

# Atores

- Sistema
- Analista de Integrações

---

# Pre-condicoes

- Webhook ou fila disponivel.
- Usuario autenticado quando aplicavel.

---

# Gatilho

O processo inicia quando um evento externo chega para processamento.

---

# Fluxo Principal

1. Sistema recebe o evento.
2. Sistema valida assinatura.
3. Sistema processa o payload.
4. Sistema registra resultado.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O consumo deve ser idempotente.
- O payload deve ser validado.

---

# Entidades Envolvidas

## IntegrationEventConsumption

```text
id
integration_id
event_type
status
received_at
```

---

# Testes

- Consumir evento valido.
- Bloquear assinatura invalida.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha o lado de entrada dos eventos externos.

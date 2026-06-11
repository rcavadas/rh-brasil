# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-004 - Publicar Evento

### Versao

1.0

---

# Objetivo

Publicar eventos para integrações externas com rastreabilidade e controle de status.

---

# Atores

- Sistema
- Analista de Integrações

---

# Pre-condicoes

- Contrato configurado.
- Evento disponivel.

---

# Gatilho

O processo inicia quando um evento precisa ser publicado.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida contrato.
3. Sistema publica o evento.
4. Sistema registra retorno.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O evento deve ser idempotente.
- A publicação deve ser rastreavel.

---

# Entidades Envolvidas

## IntegrationEventPublication

```text
id
integration_id
event_type
status
published_at
```

---

# Testes

- Publicar evento valido.
- Bloquear sem contrato.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso representa a saida de eventos para sistemas externos.

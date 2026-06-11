# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-009 - Transmitir Evento S-1299

### Versao

1.0

---

# Objetivo

Transmitir o fechamento do periodo ao eSocial.

---

# Atores

- Sistema
- Analista de Folha

---

# Pre-condicoes

- Periodo apto para fechamento.
- Ambiente configurado.

---

# Gatilho

O processo inicia quando o periodo precisa ser fechado no eSocial.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida o fechamento.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O evento deve respeitar a ordem do calendario.
- A transmissao deve ser rastreavel.

---

# Entidades Envolvidas

## EsocialEventTransmission

```text
id
event_code
status
protocol
sent_at
```

---

# Testes

- Transmitir S-1299 valido.
- Bloquear periodo inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o periodo antes da conciliacao final.

---

# Estado de Implementacao

O runtime executavel atual ja trata fechamento de periodo em folga e folha, entao o S-1299 deve seguir o mesmo contrato de bloqueio e rastreabilidade.

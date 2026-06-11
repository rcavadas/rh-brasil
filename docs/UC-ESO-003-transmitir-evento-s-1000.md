# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-003 - Transmitir Evento S-1000

### Versao

1.0

---

# Objetivo

Transmitir o evento inicial do empregador ao eSocial.

---

# Atores

- Sistema
- Analista de RH

---

# Pre-condicoes

- Ambiente configurado.
- Certificado valido.

---

# Gatilho

O processo inicia quando o evento S-1000 precisa ser transmitido.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida o ambiente.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O evento deve ser rastreavel.
- A ordem de transmissao deve ser preservada.

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

- Transmitir S-1000 valido.
- Bloquear sem ambiente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre a sequencia de eventos iniciais do eSocial.

---

# Estado de Implementacao

O runtime executavel atual ja possui transmissao minima e reprocessamento para eventos do eSocial, entao o S-1000 deve ser validado como a base do ambiente governamental antes dos demais eventos.

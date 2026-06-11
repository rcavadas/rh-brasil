# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-008 - Transmitir Evento S-1210

### Versao

1.0

---

# Objetivo

Transmitir pagamentos e rendimentos ao eSocial.

---

# Atores

- Sistema
- Analista de Folha

---

# Pre-condicoes

- Pagamentos disponiveis.
- Ambiente configurado.

---

# Gatilho

O processo inicia quando pagamentos precisam ser enviados.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida os pagamentos.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O evento deve ser rastreavel.
- O pagamento deve ser coerente com a folha.

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

- Transmitir S-1210 valido.
- Bloquear pagamento inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso transmite pagamentos e rendimentos como complemento da remuneracao.

---

# Estado de Implementacao

O runtime executavel atual precisa manter coerencia entre pagamentos, folha e transmissao, entao o S-1210 deve refletir o fluxo de pagamentos autorizado.

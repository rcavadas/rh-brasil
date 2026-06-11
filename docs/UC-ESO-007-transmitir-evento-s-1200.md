# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-007 - Transmitir Evento S-1200

### Versao

1.0

---

# Objetivo

Transmitir a remuneracao e os eventos de folha ao eSocial.

---

# Atores

- Sistema
- Analista de Folha

---

# Pre-condicoes

- Folha calculada.
- Ambiente eSocial configurado.

---

# Gatilho

O processo inicia quando a remuneracao precisa ser transmitida.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida a competencia.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O evento deve ser coerente com a folha.
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

- Transmitir S-1200 valido.
- Bloquear folha inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso publica a remuneracao da competencia depois do processamento da folha.

---

# Estado de Implementacao

O runtime executavel atual ja possui o pacote FOL consolidado e a ponte para o eSocial, entao o S-1200 deve ser validado como transmissao da competencia ja calculada e conferida.

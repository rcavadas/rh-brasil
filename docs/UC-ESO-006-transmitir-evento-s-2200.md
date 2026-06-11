# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-006 - Transmitir Evento S-2200

### Versao

1.0

---

# Objetivo

Transmitir a admissao e vinculacao do colaborador ao eSocial.

---

# Atores

- Sistema
- Analista de RH

---

# Pre-condicoes

- Admissao formalizada.
- Ambiente eSocial configurado.

---

# Gatilho

O processo inicia quando a admissao precisa ser transmitida.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida os dados do colaborador.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A transmissao deve ser rastreavel.
- O evento deve respeitar o contrato do vinculo.

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

- Transmitir S-2200 valido.
- Bloquear sem admissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso transmite a admissao e vinculacao apos a formalizacao do colaborador.

---

# Estado de Implementacao

O runtime executavel atual ja possui a etapa 1 de admissao e a formalizacao contratual separada, entao o S-2200 precisa ser tratado como a transmissao governamental dessa base ja formalizada.

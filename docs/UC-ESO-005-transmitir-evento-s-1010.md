# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-005 - Transmitir Evento S-1010

### Versao

1.0

---

# Objetivo

Transmitir a tabela de rubricas ao eSocial.

---

# Atores

- Sistema
- Analista de Folha

---

# Pre-condicoes

- Rubricas cadastradas.
- Ambiente eSocial configurado.

---

# Gatilho

O processo inicia quando a tabela de rubricas precisa ser enviada.

---

# Fluxo Principal

1. Sistema monta a tabela.
2. Sistema valida as rubricas.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- As rubricas devem estar consistentes com a folha.
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

- Transmitir S-1010 valido.
- Bloquear rubrica inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a tabela de rubricas para o eSocial.

---

# Estado de Implementacao

O runtime executavel atual ja possui o pacote FOL com rubricas e incidencias, entao o S-1010 precisa refletir a classificacao local e manter compatibilidade com os calculos de folha.

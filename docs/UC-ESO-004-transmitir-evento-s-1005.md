# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-004 - Transmitir Evento S-1005

### Versao

1.0

---

# Objetivo

Transmitir a tabela de estabelecimentos e lotacoes ao eSocial.

---

# Atores

- Sistema
- Analista de RH

---

# Pre-condicoes

- S-1000 transmitido.
- Dados de lotacao disponiveis.

---

# Gatilho

O processo inicia quando a tabela precisa ser enviada.

---

# Fluxo Principal

1. Sistema monta o evento.
2. Sistema valida os dados.
3. Sistema transmite o evento.
4. Sistema registra protocolo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A transmissao deve respeitar ordem e dependencia.
- O historico deve ser preservado.

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

- Transmitir S-1005 valido.
- Bloquear sem S-1000.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso segue a definicao do empregador e leva a tabela de lotacoes ao governo.

---

# Estado de Implementacao

O runtime executavel atual ja depende da estrutura de tenant, empresa e lotacao para operar admissao, folha e eventos correlatos, entao o S-1005 precisa continuar coerente com a hierarquia local e com o contrato minimo de transmissao.

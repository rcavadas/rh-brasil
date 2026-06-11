# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-010 - Transmitir Desligamento ao eSocial

### Versao

1.0

---

# Objetivo

Transmitir o desligamento ao eSocial com rastreabilidade, controle de status e preservacao do historico.

---

# Atores

- Analista de RH
- Analista de Folha
- Administrador do Sistema

---

# Pre-condicoes

- Rescisao fechada ou apta para transmissao.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o desligamento precisa ser enviado ao eSocial.

---

# Fluxo Principal

1. Usuario acessa Rescisao > eSocial.
2. Sistema apresenta o status da transmissao.
3. Usuario confirma o envio.
4. Sistema transmite o desligamento.
5. Sistema registra protocolo e retorno.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A transmissao deve ser rastreavel.
- O reprocessamento deve preservar o historico.

---

# Entidades Envolvidas

## TerminationEsocialTransmission

```text
id
termination_request_id
status
protocol
sent_at
```

---

# Testes

- Transmitir desligamento valido.
- Bloquear sem rescisao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o pacote de rescisao ao transmitir o desligamento ao eSocial.

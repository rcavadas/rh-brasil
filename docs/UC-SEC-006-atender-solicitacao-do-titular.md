# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-006 - Atender Solicitacao do Titular

### Versao

1.0

---

# Objetivo

Atender solicitacoes do titular de dados de forma auditavel, com rastreabilidade e escopo controlado.

---

# Atores

- Colaborador
- Analista de RH
- Administrador do Sistema
- Auditor

---

# Pre-condicoes

- Solicitacao registrada.
- Politica de atendimento definida.

---

# Gatilho

O titular solicita atendimento de um direito relacionado aos seus dados.

---

# Fluxo Principal

1. Sistema registra a solicitacao.
2. RH valida identidade e escopo.
3. Sistema localiza os dados.
4. RH executa a resposta.
5. Sistema registra evidencia e auditoria.

---

# Regras de Negocio Relacionadas

- Solicitacoes devem ser rastreaveis.
- A resposta deve respeitar prazo e escopo.

---

# Entidades Envolvidas

## PrivacyDataSubjectRequest

```text
id
subject_id
request_type
status
created_at
```

---

# Testes

- Registrar solicitacao valida.
- Bloquear identidade nao verificada.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o consentimento ao operacionalizar os direitos do titular.

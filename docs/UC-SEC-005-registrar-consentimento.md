# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-005 - Registrar Consentimento

### Versao

1.0

---

# Objetivo

Registrar consentimento do titular quando houver base legal apropriada para tratamento de dados.

---

# Atores

- Colaborador
- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Usuario autenticado quando aplicavel.
- Politica de consentimento definida.

---

# Gatilho

O processo inicia quando o consentimento precisa ser registrado ou revogado.

---

# Fluxo Principal

1. Usuario acessa privacidade > consentimento.
2. Sistema apresenta finalidade e escopo.
3. Usuario aceita ou revoga.
4. Sistema registra a decisao.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O consentimento deve ser rastreavel.
- A revogacao deve ser preservada no historico.

---

# Entidades Envolvidas

## PrivacyConsent

```text
id
subject_id
purpose
status
recorded_at
```

---

# Testes

- Registrar consentimento valido.
- Registrar revogacao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso inicia a parte LGPD de base legal e registro de vontade do titular.

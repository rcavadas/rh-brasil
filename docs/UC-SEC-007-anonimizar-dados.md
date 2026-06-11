# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-007 - Anonimizar Dados

### Versao

1.0

---

# Objetivo

Aplicar anonimização ou mascaramento em dados conforme finalidade, base legal e politica de seguranca.

---

# Atores

- Gestor de Seguranca
- Analista de RH

---

# Pre-condicoes

- Dados elegiveis.
- Politica de anonimização definida.

---

# Gatilho

O processo inicia quando dados precisam ser protegidos para uso restrito ou estatistico.

---

# Fluxo Principal

1. Usuario seleciona o escopo.
2. Sistema apresenta a politica.
3. Usuario confirma a anonimização.
4. Sistema aplica mascaramento.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A anonimização deve ser reversivel apenas quando permitido.
- Dados sensiveis devem ser protegidos.

---

# Entidades Envolvidas

## PrivacyAnonymizationJob

```text
id
scope
masking_level
status
created_at
```

---

# Testes

- Anonimizar escopo valido.
- Bloquear escopo proibido.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso aplica mascaramento e protecao sobre dados elegiveis.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-008 - Aplicar Politica de Retencao

### Versao

1.0

---

# Objetivo

Aplicar politicas de retencao por finalidade, tipo de dado e prazo de guarda.

---

# Atores

- Gestor de Seguranca
- Administrador do Sistema

---

# Pre-condicoes

- Politica de retencao definida.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando dados precisam ser mantidos ou expurgados conforme a politica.

---

# Fluxo Principal

1. Usuario acessa retencao.
2. Sistema apresenta regras vigentes.
3. Usuario confirma a aplicacao.
4. Sistema executa a politica.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A retencao deve ser por finalidade.
- O expurgo deve ser rastreavel.

---

# Entidades Envolvidas

## PrivacyRetentionPolicy

```text
id
scope
retention_days
status
```

---

# Testes

- Aplicar politica valida.
- Bloquear regra inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a disciplina de guarda e expurgo por finalidade.

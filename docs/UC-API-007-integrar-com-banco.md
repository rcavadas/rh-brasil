# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-007 - Integrar com Banco

### Versao

1.0

---

# Objetivo

Integrar com banco para rotinas financeiras e operacionais autorizadas.

---

# Atores

- Analista de Integrações
- Administrador do Sistema

---

# Pre-condicoes

- Integracao cadastrada.
- Contrato bancario definido.

---

# Gatilho

O processo inicia quando o banco precisa receber ou enviar dados.

---

# Fluxo Principal

1. Usuario acessa Integracoes > Banco.
2. Sistema apresenta parametros.
3. Usuario confirma o fluxo.
4. Sistema realiza a operacao.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A integracao deve ser rastreavel.
- Segredos devem permanecer protegidos.

---

# Entidades Envolvidas

## BankIntegrationRequest

```text
id
integration_id
status
sent_at
```

---

# Testes

- Integrar banco valido.
- Bloquear sem contrato.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o fluxo financeiro externo do produto.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-006 - Integrar com ERP

### Versao

1.0

---

# Objetivo

Integrar o produto com sistemas ERP para troca de dados operacionais e financeiros.

---

# Atores

- Analista de Integrações
- Administrador do Sistema

---

# Pre-condicoes

- Integracao cadastrada.
- Contrato ERP definido.

---

# Gatilho

O processo inicia quando o ERP precisa receber ou enviar dados.

---

# Fluxo Principal

1. Usuario acessa Integracoes > ERP.
2. Sistema apresenta a configuracao.
3. Usuario confirma o fluxo.
4. Sistema envia ou recebe dados.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A integracao deve ser rastreavel.
- O fluxo deve suportar reprocessamento controlado.

---

# Entidades Envolvidas

## ErpIntegrationRequest

```text
id
integration_id
direction
status
sent_at
```

---

# Testes

- Integrar ERP valido.
- Bloquear sem contrato.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre as integrações externas prioritarias de negocio.

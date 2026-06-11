# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-008 - Integrar com Operadora de Beneficios

### Versao

1.0

---

# Objetivo

Integrar com operadoras de beneficios para troca de informacoes de adesao, manutencao e cobranca.

---

# Atores

- Analista de Integrações
- Analista de RH

---

# Pre-condicoes

- Integracao cadastrada.
- Contrato da operadora definido.

---

# Gatilho

O processo inicia quando a operadora precisa receber ou enviar dados.

---

# Fluxo Principal

1. Usuario acessa Integracoes > Operadora de Beneficios.
2. Sistema apresenta a configuracao.
3. Usuario confirma a operacao.
4. Sistema troca os dados.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A integracao deve respeitar elegibilidade e coparticipacao.
- O fluxo deve ser rastreavel.

---

# Entidades Envolvidas

## BenefitOperatorIntegrationRequest

```text
id
integration_id
status
sent_at
```

---

# Testes

- Integrar operadora valida.
- Bloquear sem contrato.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a trilha de beneficios externos junto do ERP e do banco.

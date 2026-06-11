# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-010 - Integrar Beneficios com Folha

### Versao

1.0

---

# Objetivo

Permitir o reflexo dos beneficios na folha com consistencia, rastreabilidade e auditoria.

---

# Atores

- Analista de Folha
- Analista de RH

---

# Pre-condicoes

- Beneficios concedidos ou importados.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando os beneficios precisam refletir na folha.

---

# Fluxo Principal

1. Usuario acessa Beneficios > Integracao com Folha.
2. Sistema apresenta as concessoes e importacoes disponiveis.
3. Usuario confirma a integracao.
4. Sistema envia reflexos para a folha.
5. Sistema registra memoria e auditoria.

---

# Regras de Negocio Relacionadas

- A integracao deve refletir apenas beneficios validos.
- O reflexo deve ser rastreavel.

---

# Entidades Envolvidas

## BenefitPayrollIntegration

```text
id
benefit_id
payroll_sheet_id
status
sent_at
```

---

# Testes

- Integrar beneficio valido.
- Bloquear sem concessao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o pacote ao refletir os beneficios na folha e preservar rastreabilidade.

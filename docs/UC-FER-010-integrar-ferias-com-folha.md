# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-010 - Integrar Ferias com Folha

### Versao

1.0

---

# Objetivo

Permitir o reflexo das ferias na folha e nos eventos correlatos, garantindo consistencia entre calculo, pagamento e transmissao.

---

# Atores

- Analista de Folha
- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Ferias calculadas.
- Usuario autenticado.
- Permissao para integrar com folha.

---

# Gatilho

O processo inicia quando as ferias precisam refletir na folha ou em eventos correlatos.

---

# Fluxo Principal

1. Usuario acessa Ferias > Integracao com Folha.
2. Sistema apresenta as ferias disponiveis para integracao.
3. Usuario confirma a integracao.
4. Sistema envia reflexos para folha e eventos correlatos.
5. Sistema registra resultado e memoria de processamento.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Ferias nao calculadas

Sistema bloqueia a integracao.

## FA-02 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Reflexos encaminhados para folha.
- Historico e auditoria preservados.

---

# Regras de Negocio Relacionadas

- A integracao deve refletir apenas ferias calculadas.
- O reflexo deve ser rastreavel.

---

# Entidades Envolvidas

## VacationPayrollIntegration

```text
id
vacation_request_id
payroll_sheet_id
status
sent_at
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/requests/{id}/payroll-integration
```

---

# Testes

- Integrar ferias calculadas.
- Bloquear sem calculo.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra a trilha do dominio de ferias ao refletir o resultado na folha e nos eventos correlatos.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-006 - Gerenciar Vale-Transporte

### Versao

1.0

---

# Objetivo

Gerenciar a concessao e o desconto do vale-transporte por colaborador.

---

# Atores

- Analista de RH
- Analista de Folha

---

# Pre-condicoes

- Colaborador elegivel.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o vale-transporte precisa ser concedido ou atualizado.

---

# Fluxo Principal

1. Usuario acessa o beneficio de VT.
2. Sistema apresenta dados do colaborador.
3. Usuario informa rotas e parametros.
4. Sistema calcula ou atualiza o desconto.
5. Sistema registra a concessao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O VT deve respeitar elegibilidade e desconto.
- A manutencao deve ser rastreavel.

---

# Entidades Envolvidas

## TransportationBenefitAllocation

```text
id
employee_id
benefit_id
route
discount_amount
```

---

# Testes

- Gerenciar VT valido.
- Bloquear colaborador inelegivel.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso materializa um beneficio de uso corrente com impacto direto na folha.

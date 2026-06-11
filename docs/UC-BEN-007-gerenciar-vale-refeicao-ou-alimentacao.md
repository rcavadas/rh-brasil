# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-007 - Gerenciar Vale-Refeicao ou Alimentacao

### Versao

1.0

---

# Objetivo

Gerenciar vale-refeicao ou vale-alimentacao com fornecedores, elegibilidade e manutencao operacional.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Beneficio cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o beneficio de VR ou VA precisa ser concedido ou ajustado.

---

# Fluxo Principal

1. Usuario acessa o beneficio de VR/VA.
2. Sistema apresenta contratos e parametros.
3. Usuario define a manutencao.
4. Sistema aplica as regras.
5. Sistema registra a alteracao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A manutencao deve respeitar elegibilidade e fornecedor.
- A concessao deve ser rastreavel.

---

# Entidades Envolvidas

## MealBenefitAllocation

```text
id
employee_id
benefit_id
provider
amount
```

---

# Testes

- Gerenciar VR/VA valido.
- Bloquear sem elegibilidade.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso segue o mesmo padrao de manutencao operacional do VT, com foco em fornecedores e parametros.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-002 - Configurar Elegibilidade de Beneficio

### Versao

1.0

---

# Objetivo

Definir regras de elegibilidade para concessao de beneficios por perfil, contrato ou tenant.

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

O processo inicia quando as regras de elegibilidade precisam ser definidas ou alteradas.

---

# Fluxo Principal

1. Usuario acessa a configuracao do beneficio.
2. Sistema apresenta regras disponiveis.
3. Usuario define criterios.
4. Sistema valida consistencia.
5. Sistema grava as regras.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A elegibilidade deve ser versionada.
- O criterio deve ser rastreavel por tenant.

---

# Entidades Envolvidas

## BenefitEligibilityRule

```text
id
benefit_id
rule_type
rule_expression
status
```

---

# Testes

- Configurar regra valida.
- Bloquear regra inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois do catalogo, porque define quem pode receber cada beneficio.

# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-004 - Suspender Beneficio

### Versao

1.0

---

# Objetivo

Suspender temporariamente um beneficio com rastreabilidade e preservacao do historico.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Beneficio concedido.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando um beneficio precisa ser suspenso temporariamente.

---

# Fluxo Principal

1. Usuario acessa a concessao ativa.
2. Sistema apresenta opcoes de suspensao.
3. Usuario informa motivo e periodo.
4. Sistema valida impacto.
5. Sistema registra a suspensao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A suspensao deve preservar historico.
- A suspensao deve ser reversivel quando aplicavel.

---

# Entidades Envolvidas

## EmployeeBenefitSuspension

```text
id
grant_id
start_date
end_date
reason
```

---

# Testes

- Suspender beneficio valido.
- Bloquear concessao inexistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso trata a manutencao temporaria de uma concessao ativa.

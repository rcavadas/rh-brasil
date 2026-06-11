# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-005 - Cancelar Beneficio

### Versao

1.0

---

# Objetivo

Cancelar um beneficio e registrar os efeitos posteriores sem apagar o historico.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Beneficio concedido ou suspenso.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o beneficio precisa ser encerrado.

---

# Fluxo Principal

1. Usuario acessa a concessao.
2. Sistema apresenta os dados.
3. Usuario confirma o cancelamento.
4. Sistema registra o encerramento.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O cancelamento deve preservar historico.
- O cancelamento nao deve apagar concessoes anteriores.

---

# Entidades Envolvidas

## EmployeeBenefitCancellation

```text
id
grant_id
cancelled_at
cancelled_by
reason
```

---

# Testes

- Cancelar beneficio valido.
- Bloquear sem concessao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra a concessao sem apagar o historico do beneficio.

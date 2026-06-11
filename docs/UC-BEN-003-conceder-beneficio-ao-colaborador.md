# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-003 - Conceder Beneficio ao Colaborador

### Versao

1.0

---

# Objetivo

Conceder um beneficio a um colaborador elegivel com trilha de auditoria.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Beneficio cadastrado.
- Elegibilidade configurada.
- Colaborador ativo.

---

# Gatilho

O processo inicia quando o beneficio precisa ser concedido ao colaborador.

---

# Fluxo Principal

1. Usuario acessa Beneficios > Concessao.
2. Sistema apresenta elegibilidades.
3. Usuario seleciona o colaborador e o beneficio.
4. Sistema valida elegibilidade.
5. Sistema registra a concessao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A concessao deve respeitar elegibilidade.
- A concessao deve ser auditavel.

---

# Entidades Envolvidas

## EmployeeBenefitGrant

```text
id
employee_id
benefit_id
status
granted_at
```

---

# Testes

- Conceder beneficio valido.
- Bloquear sem elegibilidade.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso aplica a elegibilidade em uma concessao concreta ao colaborador.

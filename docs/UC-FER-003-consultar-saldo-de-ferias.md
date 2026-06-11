# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-003 - Consultar Saldo de Ferias

### Versao

1.0

---

# Objetivo

Permitir a consulta do saldo de ferias disponivel, com vencimentos, periodos e pendencias associadas.

---

# Atores

- Analista de RH
- Gestor autorizado
- Colaborador

---

# Pre-condicoes

- Periodo aquisitivo apurado.
- Usuario autenticado.
- Permissao de consulta.

---

# Gatilho

O processo inicia quando o usuario precisa verificar o saldo de ferias de um colaborador.

---

# Fluxo Principal

1. Usuario acessa Ferias > Saldo.
2. Sistema apresenta saldo disponivel.
3. Sistema apresenta vencimentos e bloqueios.
4. Usuario consulta detalhes.
5. Sistema registra auditoria de consulta quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Saldo indisponivel

Sistema informa pendencia de apuracao.

## FA-02 - Usuario sem permissao

Sistema bloqueia a consulta.

---

# Pos-condicoes

- Saldo consultado.
- Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

- O saldo deve refletir o periodo aquisitivo e concessivo.
- A consulta deve respeitar o nivel de acesso.

---

# Entidades Envolvidas

## VacationBalance

```text
id
employee_id
days_available
days_due
status
```

---

# APIs Sugeridas

```http
GET /api/v1/vacations/balance/{employeeId}
```

---

# Testes

- Consultar saldo valido.
- Bloquear consulta sem permissao.
- Exibir pendencia de apuracao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso depende da apuracao e do controle concessivo para expor o saldo correto ao usuario.

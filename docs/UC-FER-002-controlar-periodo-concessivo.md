# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-002 - Controlar Periodo Concessivo

### Versao

1.0

---

# Objetivo

Controlar o periodo concessivo de ferias, seus vencimentos e alertas, garantindo conformidade operacional.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Periodo aquisitivo apurado.
- Usuario autenticado.
- Permissao para consultar ferias.

---

# Gatilho

O processo inicia quando o RH precisa monitorar prazos concessivos e vencimentos de ferias.

---

# Fluxo Principal

1. Usuario acessa Ferias > Periodo Concessivo.
2. Sistema apresenta periodos e prazos.
3. Usuario consulta alertas e status.
4. Sistema identifica vencimentos proximos ou expirados.
5. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Periodo vencido

Sistema sinaliza alerta operacional.

## FA-02 - Periodo sem apuracao

Sistema bloqueia a consulta ou marca pendencia.

---

# Pos-condicoes

- Periodo concessivo monitorado.
- Alertas disponiveis.

---

# Regras de Negocio Relacionadas

- O periodo concessivo deve respeitar o periodo aquisitivo.
- Vencimentos devem ser alertados antes do limite operacional.

---

# Entidades Envolvidas

## VacationConcessionPeriod

```text
id
employee_id
acquisition_period_id
valid_from
valid_to
status
```

---

# APIs Sugeridas

```http
GET /api/v1/vacations/concession-periods
```

---

# Testes

- Consultar prazo valido.
- Sinalizar vencimento.
- Bloquear consulta sem apuracao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois da apuracao do periodo aquisitivo e fecha o controle de prazo do dominio de ferias.

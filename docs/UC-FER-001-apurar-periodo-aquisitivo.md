# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-001 - Apurar Periodo Aquisitivo

### Versao

1.0

---

# Objetivo

Apurar e manter o periodo aquisitivo de ferias por colaborador, com historico, vigencia e consistencia para os demais casos do dominio.

---

# Atores

- Analista de RH
- Analista de Folha
- Administrador do Sistema

---

# Pre-condicoes

- Colaborador cadastrado e vinculo ativo.
- Usuario autenticado.
- Usuario com permissao para consultar ou manter ferias.

---

# Gatilho

O processo inicia quando o RH precisa registrar ou recalcular o periodo aquisitivo de ferias.

---

# Fluxo Principal

1. Usuario acessa Ferias > Periodo Aquisitivo.
2. Sistema apresenta periodos existentes.
3. Usuario consulta ou registra o periodo.
4. Sistema valida datas e consistencia com o historico do colaborador.
5. Sistema grava ou atualiza o periodo.
6. Sistema registra historico e auditoria.

---

# Fluxos Alternativos

## FA-01 - Periodo inconsistente

Sistema bloqueia o cadastro ou a atualizacao.

## FA-02 - Colaborador inexistente

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Periodo aquisitivo registrado ou atualizado.
- Historico preservado.

---

# Regras de Negocio Relacionadas

- O periodo aquisitivo deve manter historico.
- O periodo deve ser coerente com o vinculo ativo.
- Alteracoes nao podem sobrescrever registros anteriores.

---

# Entidades Envolvidas

## VacationAcquisitionPeriod

```text
id
employee_id
period_start
period_end
status
```

## VacationAcquisitionPeriodHistory

```text
id
acquisition_period_id
change_type
changed_by
changed_at
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/acquisition-periods
```

```http
GET /api/v1/vacations/acquisition-periods/{id}
```

---

# Testes

- Apurar periodo valido.
- Bloquear periodo inconsistente.
- Preservar historico.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre o pacote de ferias e estabelece a base temporal que os demais casos consomem.

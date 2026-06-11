# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-006 - Consultar Indicadores de Recrutamento

### Versao

1.0

---

# Objetivo

Permitir a consulta de indicadores de recrutamento, como tempo de fechamento, taxa de conversao, funil e origem de candidaturas, com visao agregada.

---

# Atores

- Analista de BI
- Gestor de RH
- Diretor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de recrutamento.
- Eventos do ATS consolidados.

---

# Gatilho

O usuario solicita a consulta de indicadores de recrutamento.

---

# Fluxo Principal

1. Usuario acessa a area de recrutamento em BI.
2. Sistema apresenta filtros por periodo, vaga e origem.
3. Usuario seleciona os filtros.
4. Sistema agrega os indicadores autorizados.
5. Sistema exibe funil, taxa de conversao e tempo medio.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base incompleta

Sistema sinaliza dados pendentes.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita ajuste.

---

# Regras de Negocio

- Indicadores devem ser consolidados por periodo e empresa.
- Dados pessoais de candidatos devem ser agregados quando possivel.
- A consulta deve respeitar finalidade e escopo.

---

# Entidades

- BIKpiSnapshot
- BIKpiDefinition
- BIQueryExecution

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Consulta total |
| RH BI | Consulta total |
| Gestor | Consulta restrita |
| Colaborador | Nao |
| Auditor | Consulta |

---

# APIs

```http
GET /api/v1/bi/recruitment-indicators
```

---

# Eventos

```text
BIRecruitmentIndicatorsViewed
BIQueryExecuted
```

---

# Integracoes

- ATS
- Auditoria
- Data warehouse / analytics

---

# Testes

- Consultar indicadores validos.
- Consultar sem permissao.
- Consultar sem dados.

---

# Metricas

- Indicadores de recrutamento por periodo
- Tempo de resposta
- Consultas sem dados


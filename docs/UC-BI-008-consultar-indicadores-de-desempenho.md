# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-008 - Consultar Indicadores de Desempenho

### Versao

1.0

---

# Objetivo

Permitir a consulta de indicadores de desempenho e processos avaliativos em forma agregada, respeitando permissao e necessidade de conhecimento.

---

# Atores

- Analista de BI
- Gestor de RH
- Diretor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de desempenho.
- Eventos de avaliacao consolidados.

---

# Gatilho

O usuario solicita a consulta de indicadores de desempenho.

---

# Fluxo Principal

1. Usuario acessa a area de desempenho em BI.
2. Sistema apresenta filtros de periodo, ciclo e unidade.
3. Usuario seleciona os filtros.
4. Sistema agrega os indicadores autorizados.
5. Sistema exibe medias, distribuicao e evolucao.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base incompleta

Sistema informa consolidacao pendente.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita ajuste.

---

# Regras de Negocio

- Indicadores devem ser agregados por ciclo e escopo.
- Dados pessoais e feedbacks devem ser protegidos.
- A visualizacao deve ser restrita ao perfil autorizado.

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
GET /api/v1/bi/performance-indicators
```

---

# Eventos

```text
BIPerformanceIndicatorsViewed
BIQueryExecuted
```

---

# Integracoes

- Avaliacao de desempenho
- Auditoria
- Data warehouse / analytics

---

# Testes

- Consultar indicadores validos.
- Consultar sem permissao.
- Consultar com dados pendentes.

---

# Metricas

- Indicadores de desempenho por ciclo
- Tempo de resposta
- Consultas sem dados


# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-007 - Consultar Indicadores de Treinamento

### Versao

1.0

---

# Objetivo

Permitir a consulta de indicadores de treinamento, como participacao, conclusao, compliance e recorrencia, por periodo e escopo autorizado.

---

# Atores

- Analista de BI
- Gestor de RH
- Diretor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de treinamento.
- Eventos do LMS consolidados.

---

# Gatilho

O usuario solicita a consulta de indicadores de treinamento.

---

# Fluxo Principal

1. Usuario acessa a area de treinamento em BI.
2. Sistema apresenta filtros de periodo, curso e unidade.
3. Usuario seleciona os filtros.
4. Sistema agrega os indicadores autorizados.
5. Sistema exibe graficos e totais.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base incompleta

Sistema sinaliza consolidacao pendente.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita ajuste.

---

# Regras de Negocio

- Indicadores devem respeitar competencia e escopo.
- Dados individuais devem ser agregados quando possivel.
- A consulta deve ser auditavel.

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
GET /api/v1/bi/training-indicators
```

---

# Eventos

```text
BITrainingIndicatorsViewed
BIQueryExecuted
```

---

# Integracoes

- LMS
- Auditoria
- Data warehouse / analytics

---

# Testes

- Consultar indicadores validos.
- Consultar sem permissao.
- Consultar sem dados.

---

# Metricas

- Indicadores de treinamento por periodo
- Tempo de resposta
- Consultas sem dados


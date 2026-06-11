# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-009 - Consultar Indicadores de SST

### Versao

1.0

---

# Objetivo

Permitir a consulta de indicadores de SST em forma agregada, incluindo eventos, treinamentos obrigatorios e ocorrencias autorizadas, respeitando privacidade e finalidade.

---

# Atores

- Analista de BI
- Gestor de SST
- Diretor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de SST.
- Eventos de SST consolidados.

---

# Gatilho

O usuario solicita a consulta de indicadores de SST.

---

# Fluxo Principal

1. Usuario acessa a area de SST em BI.
2. Sistema apresenta filtros de periodo, unidade e indicador.
3. Usuario seleciona os filtros.
4. Sistema consolida os dados autorizados.
5. Sistema exibe graficos e alertas.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base incompleta

Sistema indica consolidacao pendente.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita ajuste.

---

# Regras de Negocio

- Indicadores de SST devem ser agregados e restritos por perfil.
- Dados pessoais e dados sensiveis devem ser minimizados.
- A consulta deve respeitar finalidade e necessidade.

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
GET /api/v1/bi/sst-indicators
```

---

# Eventos

```text
BISSTIndicatorsViewed
BIQueryExecuted
```

---

# Integracoes

- SST
- LMS
- Auditoria
- Data warehouse / analytics

---

# Testes

- Consultar indicadores validos.
- Consultar sem permissao.
- Consultar com dados pendentes.

---

# Metricas

- Indicadores de SST por periodo
- Tempo de resposta
- Consultas sem dados

